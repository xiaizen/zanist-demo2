const { body, param, query, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  
  next();
};

// Article validation rules
const validateArticle = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Title must be between 10 and 200 characters'),
  body('summary')
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage('Summary must be between 50 and 500 characters'),
  body('content')
    .trim()
    .isLength({ min: 200 })
    .withMessage('Content must be at least 200 characters'),
  body('imageUrl')
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  body('categoryId')
    .optional()
    .isUUID()
    .withMessage('Category ID must be a valid UUID'),
  body('universityId')
    .optional()
    .isUUID()
    .withMessage('University ID must be a valid UUID'),
  body('professorId')
    .optional()
    .isUUID()
    .withMessage('Professor ID must be a valid UUID'),
  body('referenceLink')
    .optional()
    .isURL()
    .withMessage('Reference link must be a valid URL'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('readTime')
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage('Read time must be between 1 and 120 minutes'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('Featured flag must be a boolean'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('Published flag must be a boolean')
];

// Category validation rules
const validateCategory = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Color must be a valid hex color'),
  body('icon')
    .optional()
    .isLength({ min: 1, max: 10 })
    .withMessage('Icon must be between 1 and 10 characters'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Active flag must be a boolean')
];

// University validation rules
const validateUniversity = [
  body('name')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('University name must be between 5 and 200 characters'),
  body('shortName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Short name must be between 2 and 50 characters'),
  body('country')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Country must be between 2 and 100 characters'),
  body('city')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('City must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 50, max: 1000 })
    .withMessage('Description must be between 50 and 1000 characters'),
  body('logoUrl')
    .optional()
    .isURL()
    .withMessage('Logo URL must be a valid URL'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Website must be a valid URL'),
  body('founded')
    .optional()
    .isInt({ min: 800, max: new Date().getFullYear() })
    .withMessage('Founded year must be valid'),
  body('ranking')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Ranking must be between 1 and 1000'),
  body('students')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Student count must be a positive number'),
  body('specialties')
    .optional()
    .isArray()
    .withMessage('Specialties must be an array')
];

// Professor validation rules
const validateProfessor = [
  body('name')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Professor name must be between 5 and 100 characters'),
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('department')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Department must be between 5 and 200 characters'),
  body('field')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Field must be between 5 and 100 characters'),
  body('photoUrl')
    .isURL()
    .withMessage('Photo URL must be a valid URL'),
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('linkedinUrl')
    .optional()
    .isURL()
    .withMessage('LinkedIn URL must be valid'),
  body('personalWebsite')
    .optional()
    .isURL()
    .withMessage('Personal website must be valid'),
  body('bio')
    .trim()
    .isLength({ min: 50, max: 2000 })
    .withMessage('Bio must be between 50 and 2000 characters'),
  body('researchAreas')
    .optional()
    .isArray()
    .withMessage('Research areas must be an array')
];

// Newsletter validation rules
const validateNewsletter = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('subscriptionType')
    .optional()
    .isIn(['weekly', 'alerts', 'monthly'])
    .withMessage('Subscription type must be weekly, alerts, or monthly')
];

// Comment validation rules
const validateComment = [
  body('content')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters'),
  body('parentId')
    .optional()
    .isUUID()
    .withMessage('Parent ID must be a valid UUID')
];

// Search validation rules
const validateSearch = [
  query('q')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),
  query('category')
    .optional()
    .isUUID()
    .withMessage('Category must be a valid UUID'),
  query('university')
    .optional()
    .isUUID()
    .withMessage('University must be a valid UUID'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a positive number')
];

module.exports = {
  validateRequest,
  validateArticle,
  validateCategory,
  validateUniversity,
  validateProfessor,
  validateNewsletter,
  validateComment,
  validateSearch
};