const express = require('express');
const { supabase, handleSupabaseError } = require('../config/database');
const { authMiddleware, requireModerator } = require('../middleware/auth');
const { validateCategory, validateRequest } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Get all active categories
router.get('/', asyncHandler(async (req, res) => {
  const { includeInactive = false } = req.query;

  let query = supabase
    .from('categories')
    .select('*')
    .order('name');

  if (!includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ categories: data || [] });
}));

// Get category by slug
router.get('/:slug', asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Category not found' });
    }
    handleSupabaseError(error);
  }

  res.json({ category: data });
}));

// Create new category (moderator only)
router.post('/', authMiddleware, requireModerator, validateCategory, validateRequest, asyncHandler(async (req, res) => {
  const { name, description, color = '#3b82f6', icon = '📚', isActive = true } = req.body;

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const { data, error } = await supabase
    .from('categories')
    .insert({
      name,
      slug,
      description,
      color,
      icon,
      is_active: isActive,
      created_by: req.user.id
    })
    .select()
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  res.status(201).json({
    message: 'Category created successfully',
    category: data
  });
}));

// Update category (moderator only)
router.put('/:id', authMiddleware, requireModerator, validateCategory, validateRequest, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, color, icon, isActive } = req.body;

  const updates = {};
  if (name) {
    updates.name = name;
    updates.slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  if (description) updates.description = description;
  if (color) updates.color = color;
  if (icon) updates.icon = icon;
  if (isActive !== undefined) updates.is_active = isActive;

  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  res.json({
    message: 'Category updated successfully',
    category: data
  });
}));

// Delete category (admin only)
router.delete('/:id', authMiddleware, requireModerator, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ message: 'Category deleted successfully' });
}));

// Get articles by category
router.get('/:slug/articles', asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { limit = 20, offset = 0 } = req.query;

  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories!inner(name, slug),
      universities(short_name, slug),
      professors(name),
      article_tags(tag)
    `)
    .eq('categories.slug', slug)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ articles: data || [] });
}));

module.exports = router;