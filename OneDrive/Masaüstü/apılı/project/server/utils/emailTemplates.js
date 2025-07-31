const generateWelcomeEmail = (name, subscriptionType) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Zanist Newsletter</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
        .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .features { background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .feature { margin: 10px 0; }
        .feature::before { content: "✓"; color: #10b981; font-weight: bold; margin-right: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Zanist!</h1>
          <p>Your gateway to cutting-edge scientific research</p>
        </div>
        
        <div class="content">
          <h2>Hello ${name || 'Science Enthusiast'}!</h2>
          
          <p>Thank you for subscribing to our <strong>${subscriptionType}</strong> newsletter. You've just joined a community of curious minds passionate about scientific discovery and innovation.</p>
          
          <div class="features">
            <h3>What you'll receive:</h3>
            <div class="feature">Latest research breakthroughs from top universities</div>
            <div class="feature">Expert analysis and insights from leading scientists</div>
            <div class="feature">Exclusive interviews with Nobel Prize winners</div>
            <div class="feature">Early access to groundbreaking discoveries</div>
            <div class="feature">Curated content across all scientific disciplines</div>
          </div>
          
          <p>Our editorial team works tirelessly to bring you the most significant scientific developments from institutions like MIT, Stanford, Harvard, and many more around the world.</p>
          
          <a href="${process.env.FRONTEND_URL || 'https://zanist.com'}" class="button">Explore Zanist</a>
          
          <p>Stay curious and keep exploring!</p>
          
          <p>Best regards,<br>
          <strong>The Zanist Editorial Team</strong></p>
        </div>
        
        <div class="footer">
          <p>You're receiving this because you subscribed to Zanist ${subscriptionType} newsletter.</p>
          <p>© ${new Date().getFullYear()} Zanist. All rights reserved.</p>
          <p><a href="${process.env.FRONTEND_URL}/unsubscribe">Unsubscribe</a> | <a href="${process.env.FRONTEND_URL}/contact">Contact Us</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const generateNewsletterTemplate = (subject, content, subscriptionType) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
        .article { border-left: 4px solid #dc2626; padding-left: 20px; margin: 20px 0; }
        .article h3 { margin: 0 0 10px 0; color: #dc2626; }
        .article p { margin: 0 0 10px 0; color: #6b7280; }
        .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .divider { height: 1px; background: #e5e7eb; margin: 30px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Zanist Newsletter</h1>
          <p>${subject}</p>
        </div>
        
        <div class="content">
          ${content}
          
          <div class="divider"></div>
          
          <p>Thank you for being part of the Zanist community. Together, we're advancing scientific knowledge and discovery.</p>
          
          <a href="${process.env.FRONTEND_URL || 'https://zanist.com'}" class="button">Visit Zanist</a>
        </div>
        
        <div class="footer">
          <p>You're receiving this ${subscriptionType} newsletter because you subscribed to Zanist updates.</p>
          <p>© ${new Date().getFullYear()} Zanist. All rights reserved.</p>
          <p>
            <a href="${process.env.FRONTEND_URL}/unsubscribe">Unsubscribe</a> | 
            <a href="${process.env.FRONTEND_URL}/contact">Contact Us</a> | 
            <a href="${process.env.FRONTEND_URL}/about">About Zanist</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  generateWelcomeEmail,
  generateNewsletterTemplate
};