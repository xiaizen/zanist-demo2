const express = require('express');
const { supabase, handleSupabaseError } = require('../config/database');
const { authMiddleware, requireModerator } = require('../middleware/auth');
const { validateUniversity, validateRequest } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Get all universities
router.get('/', asyncHandler(async (req, res) => {
  const { country, ranking, limit = 50, offset = 0 } = req.query;

  let query = supabase
    .from('universities')
    .select('*')
    .eq('is_active', true);

  if (country) {
    query = query.eq('country', country);
  }

  if (ranking) {
    const rankingNum = parseInt(ranking);
    if (rankingNum > 0) {
      query = query.lte('ranking', rankingNum);
    }
  }

  query = query
    .order('ranking')
    .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

  const { data, error } = await query;

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ universities: data || [] });
}));

// Get university by slug
router.get('/:slug', asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from('universities')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'University not found' });
    }
    handleSupabaseError(error);
  }

  res.json({ university: data });
}));

// Get universities by country
router.get('/country/:country', asyncHandler(async (req, res) => {
  const { country } = req.params;
  const { limit = 20, offset = 0 } = req.query;

  const { data, error } = await supabase
    .from('universities')
    .select('*')
    .eq('country', country)
    .eq('is_active', true)
    .order('ranking')
    .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ universities: data || [] });
}));

// Get university articles
router.get('/:slug/articles', asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { limit = 20, offset = 0 } = req.query;

  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories(name, slug),
      universities!inner(short_name, slug),
      professors(name),
      article_tags(tag)
    `)
    .eq('universities.slug', slug)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ articles: data || [] });
}));

// Get university professors
router.get('/:slug/professors', asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // First get the university
  const { data: university } = await supabase
    .from('universities')
    .select('id')
    .eq('slug', slug)
    .single();

  if (!university) {
    return res.status(404).json({ error: 'University not found' });
  }

  const { data, error } = await supabase
    .from('professors')
    .select(`
      *,
      universities(name, short_name, slug)
    `)
    .eq('university_id', university.id)
    .eq('is_active', true)
    .order('name');

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ professors: data || [] });
}));

// Create university (moderator only)
router.post('/', authMiddleware, requireModerator, validateUniversity, validateRequest, asyncHandler(async (req, res) => {
  const {
    name,
    shortName,
    country,
    city,
    description,
    logoUrl,
    website,
    founded,
    ranking,
    students = 0,
    specialties = [],
    stats = {},
    contact = {}
  } = req.body;

  const slug = shortName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const { data, error } = await supabase
    .from('universities')
    .insert({
      name,
      short_name: shortName,
      slug,
      country,
      city,
      description,
      logo_url: logoUrl,
      website,
      founded,
      ranking,
      students,
      specialties,
      stats,
      contact
    })
    .select()
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  res.status(201).json({
    message: 'University created successfully',
    university: data
  });
}));

// Update university (moderator only)
router.put('/:id', authMiddleware, requireModerator, validateUniversity, validateRequest, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.shortName) {
    updates.short_name = updates.shortName;
    updates.slug = updates.shortName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    delete updates.shortName;
  }

  if (updates.logoUrl) {
    updates.logo_url = updates.logoUrl;
    delete updates.logoUrl;
  }

  const { data, error } = await supabase
    .from('universities')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  res.json({
    message: 'University updated successfully',
    university: data
  });
}));

// Get countries with university counts
router.get('/meta/countries', asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('universities')
    .select('country')
    .eq('is_active', true);

  if (error) {
    handleSupabaseError(error);
  }

  const countryCounts = data.reduce((acc, uni) => {
    acc[uni.country] = (acc[uni.country] || 0) + 1;
    return acc;
  }, {});

  const countries = Object.entries(countryCounts).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/\s+/g, '-')
  }));

  res.json({ countries });
}));

module.exports = router;