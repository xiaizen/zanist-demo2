const crypto = require('crypto');

// Generate slug from text
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Generate random string
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Validate URL
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Sanitize HTML content
const sanitizeHtml = (html) => {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// Calculate read time
const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

// Format date for display
const formatDate = (date, locale = 'en-US') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Paginate results
const paginate = (data, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const paginatedData = data.slice(offset, offset + limit);
  
  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(data.length / limit),
      totalItems: data.length,
      itemsPerPage: limit,
      hasNextPage: offset + limit < data.length,
      hasPrevPage: page > 1
    }
  };
};

// Extract text from HTML
const extractTextFromHtml = (html) => {
  return html.replace(/<[^>]*>/g, '').trim();
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate excerpt from content
const generateExcerpt = (content, maxLength = 150) => {
  const text = extractTextFromHtml(content);
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

// Rate limiting helper
const createRateLimiter = (windowMs, max, message) => {
  const { RateLimiterMemory } = require('rate-limiter-flexible');
  
  return new RateLimiterMemory({
    keyGenerator: (req) => req.ip,
    points: max,
    duration: windowMs / 1000,
  });
};

// Log activity
const logActivity = async (supabase, userId, action, resource, metadata = {}) => {
  try {
    await supabase.from('access_logs').insert({
      user_id: userId,
      action,
      resource,
      success: true,
      metadata
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

module.exports = {
  generateSlug,
  generateRandomString,
  isValidUrl,
  sanitizeHtml,
  calculateReadTime,
  formatDate,
  paginate,
  extractTextFromHtml,
  isValidEmail,
  generateExcerpt,
  createRateLimiter,
  logActivity
};