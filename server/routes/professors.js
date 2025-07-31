const express = require('express');
const { supabase, handleSupabaseError } = require('../config/database');
const { authMiddleware, requireModerator } = require('../middleware/auth');
const { validateProfessor, validateRequest } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Get all professors
router.get('/', asyncHandler(async (req, res) => {
  const { university, field, limit = 50, offset = 0 } = req.query;

  let query = supabase
    .from('professors')
    .select(`
      *,
      universities(name, short_name, slug)
    `)
    .eq('is_active', true);

  if (university) {
    query = query.eq('universities.slug', university);
  }

  if (field) {
    query = query.ilike('field', `%${field}%`);
  }

  query = query
    .order('name')
    .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

  const { data, error } = await query;

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ professors: data || [] });
}));

// Get professor by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('professors')
    .select(`
      *,
      universities(name, short_name, slug)
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Professor not found' });
    }
    handleSupabaseError(error);
  }

  res.json({ professor: data });
}));

// Get professor's articles
router.get('/:id/articles', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { limit = 20, offset = 0 } = req.query;

  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories(name, slug),
      universities(short_name, slug),
      professors!inner(name),
      article_tags(tag)
    `)
    .eq('professor_id', id)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ articles: data || [] });
}));

// Search professors
router.get('/search/:query', asyncHandler(async (req, res) => {
  const { query: searchQuery } = req.params;
  const { limit = 20 } = req.query;

  const { data, error } = await supabase
    .from('professors')
    .select(`
      *,
      universities(name, short_name, slug)
    `)
    .or(`name.ilike.%${searchQuery}%,field.ilike.%${searchQuery}%,bio.ilike.%${searchQuery}%`)
    .eq('is_active', true)
    .order('name')
    .limit(parseInt(limit));

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ professors: data || [] });
}));

// Create professor (moderator only)
router.post('/', authMiddleware, requireModerator, validateProfessor, validateRequest, asyncHandler(async (req, res) => {
  const {
    name,
    title,
    universityId,
    department,
    field,
    photoUrl,
    email,
    linkedinUrl,
    personalWebsite,
    bio,
    researchAreas = [],
    stats = {}
  } = req.body;

  const { data, error } = await supabase
    .from('professors')
    .insert({
      name,
      title,
      university_id: universityId,
      department,
      field,
      photo_url: photoUrl,
      email,
      linkedin_url: linkedinUrl,
      personal_website: personalWebsite,
      bio,
      research_areas: researchAreas,
      stats,
      created_by: req.user.id
    })
    .select(`
      *,
      universities(name, short_name, slug)
    `)
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  res.status(201).json({
    message: 'Professor created successfully',
    professor: data
  });
}));

// Update professor (moderator only)
router.put('/:id', authMiddleware, requireModerator, validateProfessor, validateRequest, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  // Transform field names for database
  if (updates.photoUrl) {
    updates.photo_url = updates.photoUrl;
    delete updates.photoUrl;
  }
  if (updates.linkedinUrl) {
    updates.linkedin_url = updates.linkedinUrl;
    delete updates.linkedinUrl;
  }
  if (updates.personalWebsite) {
    updates.personal_website = updates.personalWebsite;
    delete updates.personalWebsite;
  }
  if (updates.universityId) {
    updates.university_id = updates.universityId;
    delete updates.universityId;
  }
  if (updates.researchAreas) {
    updates.research_areas = updates.researchAreas;
    delete updates.researchAreas;
  }

  const { data, error } = await supabase
    .from('professors')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      universities(name, short_name, slug)
    `)
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  res.json({
    message: 'Professor updated successfully',
    professor: data
  });
}));

// Delete professor (admin only)
router.delete('/:id', authMiddleware, requireModerator, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('professors')
    .delete()
    .eq('id', id);

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ message: 'Professor deleted successfully' });
}));

module.exports = router;