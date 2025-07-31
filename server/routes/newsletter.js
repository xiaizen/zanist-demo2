const express = require('express');
const nodemailer = require('nodemailer');
const { supabase, handleSupabaseError } = require('../config/database');
const { authMiddleware, requireModerator } = require('../middleware/auth');
const { validateNewsletter, validateRequest } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Configure email transporter (you'll need to set up SMTP credentials)
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Subscribe to newsletter
router.post('/subscribe', validateNewsletter, validateRequest, asyncHandler(async (req, res) => {
  const { email, name, subscriptionType = 'weekly' } = req.body;

  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .upsert({
      email,
      name,
      subscription_type: subscriptionType,
      is_active: true
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already subscribed' });
    }
    handleSupabaseError(error);
  }

  // Send welcome email
  if (process.env.SMTP_USER) {
    try {
      await transporter.sendMail({
        from: `"Zanist Newsletter" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Welcome to Zanist Newsletter!',
        html: `
          <h2>Welcome to Zanist!</h2>
          <p>Thank you for subscribing to our ${subscriptionType} newsletter.</p>
          <p>You'll receive the latest scientific discoveries and research breakthroughs directly in your inbox.</p>
          <p>Best regards,<br>The Zanist Team</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }
  }

  res.status(201).json({
    message: 'Successfully subscribed to newsletter',
    subscription: data
  });
}));

// Unsubscribe from newsletter
router.post('/unsubscribe', [
  body('email').isEmail().withMessage('Valid email is required'),
  validateRequest
], asyncHandler(async (req, res) => {
  const { email } = req.body;

  const { error } = await supabase
    .from('newsletter_subscriptions')
    .update({ is_active: false })
    .eq('email', email);

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ message: 'Successfully unsubscribed from newsletter' });
}));

// Get newsletter subscribers (moderator only)
router.get('/subscribers', authMiddleware, requireModerator, asyncHandler(async (req, res) => {
  const { subscriptionType, isActive = true, limit = 100, offset = 0 } = req.query;

  let query = supabase
    .from('newsletter_subscriptions')
    .select('*')
    .order('created_at', { ascending: false });

  if (subscriptionType) {
    query = query.eq('subscription_type', subscriptionType);
  }

  if (isActive !== undefined) {
    query = query.eq('is_active', isActive === 'true');
  }

  query = query.range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

  const { data, error, count } = await query;

  if (error) {
    handleSupabaseError(error);
  }

  res.json({
    subscribers: data || [],
    pagination: {
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    }
  });
}));

// Send newsletter (moderator only)
router.post('/send', authMiddleware, requireModerator, [
  body('subject').trim().isLength({ min: 5 }).withMessage('Subject is required'),
  body('content').trim().isLength({ min: 50 }).withMessage('Content must be at least 50 characters'),
  body('subscriptionType').isIn(['weekly', 'alerts', 'monthly']).withMessage('Invalid subscription type'),
  validateRequest
], asyncHandler(async (req, res) => {
  const { subject, content, subscriptionType } = req.body;

  if (!process.env.SMTP_USER) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  // Get active subscribers for this type
  const { data: subscribers, error } = await supabase
    .from('newsletter_subscriptions')
    .select('email, name')
    .eq('subscription_type', subscriptionType)
    .eq('is_active', true);

  if (error) {
    handleSupabaseError(error);
  }

  if (!subscribers || subscribers.length === 0) {
    return res.status(400).json({ error: 'No active subscribers found' });
  }

  // Send emails in batches to avoid overwhelming the SMTP server
  const batchSize = 50;
  let sentCount = 0;
  let failedCount = 0;

  for (let i = 0; i < subscribers.length; i += batchSize) {
    const batch = subscribers.slice(i, i + batchSize);
    
    const emailPromises = batch.map(async (subscriber) => {
      try {
        await transporter.sendMail({
          from: `"Zanist Newsletter" <${process.env.SMTP_USER}>`,
          to: subscriber.email,
          subject,
          html: `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
              <h1 style="color: #dc2626;">Zanist Newsletter</h1>
              ${content}
              <hr style="margin: 30px 0;">
              <p style="font-size: 12px; color: #666;">
                You're receiving this because you subscribed to Zanist ${subscriptionType} newsletter.
                <a href="${process.env.FRONTEND_URL}/unsubscribe?email=${subscriber.email}">Unsubscribe</a>
              </p>
            </div>
          `
        });
        sentCount++;
      } catch (error) {
        console.error(`Failed to send email to ${subscriber.email}:`, error);
        failedCount++;
      }
    });

    await Promise.all(emailPromises);
    
    // Add delay between batches
    if (i + batchSize < subscribers.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  res.json({
    message: 'Newsletter sent successfully',
    stats: {
      totalSubscribers: subscribers.length,
      sent: sentCount,
      failed: failedCount
    }
  });
}));

// Get newsletter statistics
router.get('/stats', authMiddleware, requireModerator, asyncHandler(async (req, res) => {
  const { data: subscriptions, error } = await supabase
    .from('newsletter_subscriptions')
    .select('subscription_type, is_active, created_at');

  if (error) {
    handleSupabaseError(error);
  }

  const stats = {
    total: subscriptions?.length || 0,
    active: subscriptions?.filter(sub => sub.is_active).length || 0,
    byType: subscriptions?.reduce((acc, sub) => {
      acc[sub.subscription_type] = (acc[sub.subscription_type] || 0) + 1;
      return acc;
    }, {}) || {},
    recentSubscriptions: subscriptions?.filter(sub => {
      const subDate = new Date(sub.created_at);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return subDate > weekAgo;
    }).length || 0
  };

  res.json({ stats });
}));

module.exports = router;