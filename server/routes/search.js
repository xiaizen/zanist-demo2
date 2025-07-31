const express = require('express');
const { supabase, handleSupabaseError } = require('../config/database');
const { validateSearch, validateRequest } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Global search across all content
router.get('/', validateSearch, validateRequest, asyncHandler(async (req, res) => {
  const { q: searchQuery, category, university, limit = 20, offset = 0 } = req.query;

  // Search articles using full-text search function
  const { data: articles, error: articlesError } = await supabase
    .rpc('search_articles', { search_query: searchQuery })
    .limit(parseInt(limit));

  if (articlesError) {
    console.error('Articles search error:', articlesError);
  }

  // Search professors
  const { data: professors, error: professorsError } = await supabase
    .from('professors')
    .select(`
      id, name, title, field, photo_url,
      universities(short_name, slug)
    `)
    .or(`name.ilike.%${searchQuery}%,field.ilike.%${searchQuery}%,bio.ilike.%${searchQuery}%`)
    .eq('is_active', true)
    .limit(10);

  if (professorsError) {
    console.error('Professors search error:', professorsError);
  }

  // Search universities
  const { data: universities, error: universitiesError } = await supabase
    .from('universities')
    .select('id, name, short_name, slug, country, city, description')
    .or(`name.ilike.%${searchQuery}%,short_name.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%`)
    .eq('is_active', true)
    .limit(10);

  if (universitiesError) {
    console.error('Universities search error:', universitiesError);
  }

  // Search categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('id, name, slug, description, color, icon')
    .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
    .eq('is_active', true)
    .limit(10);

  if (categoriesError) {
    console.error('Categories search error:', categoriesError);
  }

  res.json({
    query: searchQuery,
    results: {
      articles: articles || [],
      professors: professors || [],
      universities: universities || [],
      categories: categories || []
    },
    totalResults: (articles?.length || 0) + (professors?.length || 0) + (universities?.length || 0) + (categories?.length || 0)
  });
}));

// Search suggestions/autocomplete
router.get('/suggestions', asyncHandler(async (req, res) => {
  const { q: searchQuery, limit = 10 } = req.query;

  if (!searchQuery || searchQuery.length < 2) {
    return res.json({ suggestions: [] });
  }

  // Get suggestions from different sources
  const [articleTitles, professorNames, universityNames, categoryNames] = await Promise.all([
    // Article titles
    supabase
      .from('articles')
      .select('title')
      .ilike('title', `%${searchQuery}%`)
      .eq('is_published', true)
      .limit(5),
    
    // Professor names
    supabase
      .from('professors')
      .select('name')
      .ilike('name', `%${searchQuery}%`)
      .eq('is_active', true)
      .limit(3),
    
    // University names
    supabase
      .from('universities')
      .select('name, short_name')
      .or(`name.ilike.%${searchQuery}%,short_name.ilike.%${searchQuery}%`)
      .eq('is_active', true)
      .limit(3),
    
    // Category names
    supabase
      .from('categories')
      .select('name')
      .ilike('name', `%${searchQuery}%`)
      .eq('is_active', true)
      .limit(3)
  ]);

  const suggestions = [
    ...(articleTitles.data?.map(item => ({ text: item.title, type: 'article' })) || []),
    ...(professorNames.data?.map(item => ({ text: item.name, type: 'professor' })) || []),
    ...(universityNames.data?.map(item => ({ text: item.short_name || item.name, type: 'university' })) || []),
    ...(categoryNames.data?.map(item => ({ text: item.name, type: 'category' })) || [])
  ].slice(0, parseInt(limit));

  res.json({ suggestions });
}));

// Popular search terms
router.get('/popular', asyncHandler(async (req, res) => {
  // This would typically come from analytics data
  // For now, return static popular terms
  const popularTerms = [
    'quantum computing',
    'CRISPR gene editing',
    'artificial intelligence',
    'climate change',
    'renewable energy',
    'space exploration',
    'biotechnology',
    'nanotechnology'
  ];

  res.json({ popularTerms });
}));

module.exports = router;