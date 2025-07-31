const express = require('express');
const { body } = require('express-validator');
const { supabase, handleSupabaseError } = require('../config/database');
const { validateRequest } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Register new user
router.post('/register', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  validateRequest
], asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });

  if (error) {
    handleSupabaseError(error);
  }

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: data.user?.id,
      email: data.user?.email,
      name: data.user?.user_metadata?.name
    }
  });
}));

// Login user
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
], asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    handleSupabaseError(error);
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  // Update last login
  await supabase
    .from('profiles')
    .update({ last_login: new Date().toISOString() })
    .eq('id', data.user.id);

  res.json({
    message: 'Login successful',
    user: {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      avatar: profile.avatar_url,
      permissions: profile.permissions
    },
    token: data.session.access_token
  });
}));

// Logout user
router.post('/logout', authMiddleware, asyncHandler(async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ message: 'Logout successful' });
}));

// Get current user profile
router.get('/me', authMiddleware, asyncHandler(async (req, res) => {
  res.json({
    user: {
      id: req.profile.id,
      email: req.profile.email,
      name: req.profile.name,
      role: req.profile.role,
      avatar: req.profile.avatar_url,
      bio: req.profile.bio,
      createdAt: req.profile.created_at,
      lastLogin: req.profile.last_login,
      permissions: req.profile.permissions
    }
  });
}));

// Update user profile
router.put('/profile', authMiddleware, [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  body('avatarUrl').optional().isURL().withMessage('Avatar URL must be valid'),
  validateRequest
], asyncHandler(async (req, res) => {
  const { name, bio, avatarUrl } = req.body;

  const updates = {};
  if (name) updates.name = name;
  if (bio !== undefined) updates.bio = bio;
  if (avatarUrl) updates.avatar_url = avatarUrl;

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', req.user.id)
    .select()
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  res.json({
    message: 'Profile updated successfully',
    user: {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      avatar: data.avatar_url,
      bio: data.bio,
      permissions: data.permissions
    }
  });
}));

// Change password
router.put('/password', authMiddleware, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
  validateRequest
], asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ message: 'Password updated successfully' });
}));

module.exports = router;