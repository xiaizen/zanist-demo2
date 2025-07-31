const express = require('express');
const { supabase, handleSupabaseError, checkPermission } = require('../config/database');
const { authMiddleware, requireModerator } = require('../middleware/auth');
const { validateArticle, validateRequest } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Get all published articles with filters
router.get('/', asyncHandler(async (req, res) => {
  const { 
    category, 
    university, 
    professor, 
    featured, 
    limit = 20, 
    offset = 0,
    search,
    timeFilter 
  } = req.query;

  let query = supabase
    .from('articles')
    .select(`
      *,
      categories(name, slug, color),
      universities(short_name, slug),
      professors(name),
      article_tags(tag)
    `)
    .eq('is_published', true);

  // Apply filters
  if (category) {
    query = query.eq('categories.slug', category);
  }
  if (university) {
    query = query.eq('universities.slug', university);
  }
  if (featured === 'true') {
    query = query.eq('is_featured', true);
  }
  if (search) {
    query = query.textSearch('title,summary,content', search);
  }

  // Time filter
  if (timeFilter && timeFilter !== 'all') {
    const now = new Date();
    let startDate;

    switch (timeFilter) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
    }

    if (startDate) {
      query = query.gte('published_at', startDate.toISOString());
    }
  }

  query = query
    .order('published_at', { ascending: false })
    .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

  const { data, error, count } = await query;

  if (error) {
    handleSupabaseError(error);
  }

  res.json({
    articles: data || [],
    pagination: {
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset),
      hasMore: count > parseInt(offset) + parseInt(limit)
    }
  });
}));

// Get single article by slug
router.get('/:slug', asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories(name, slug, color),
      universities(short_name, slug),
      professors(name),
      article_tags(tag)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Article not found' });
    }
    handleSupabaseError(error);
  }

  // Increment view count
  await supabase
    .from('articles')
    .update({ views_count: (data.views_count || 0) + 1 })
    .eq('id', data.id);

  res.json({ article: data });
}));

// Create new article (authenticated users)
router.post('/', authMiddleware, validateArticle, validateRequest, asyncHandler(async (req, res) => {
  const {
    title,
    summary,
    content,
    imageUrl,
    categoryId,
    universityId,
    professorId,
    referenceLink,
    tags = [],
    readTime,
    isFeatured = false,
    isPublished = false
  } = req.body;

  // Generate slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const { data, error } = await supabase
    .from('articles')
    .insert({
      title,
      slug,
      summary,
      content,
      image_url: imageUrl,
      category_id: categoryId,
      university_id: universityId,
      professor_id: professorId,
      reference_link: referenceLink,
      read_time: readTime,
      is_featured: isFeatured,
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
      created_by: req.user.id
    })
    .select(`
      *,
      categories(name, slug),
      universities(short_name, slug),
      professors(name)
    `)
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  // Add tags
  if (tags.length > 0) {
    const tagInserts = tags.map(tag => ({
      article_id: data.id,
      tag: tag.trim()
    }));

    await supabase.from('article_tags').insert(tagInserts);
  }

  res.status(201).json({
    message: 'Article created successfully',
    article: data
  });
}));

// Update article (author or moderator)
router.put('/:id', authMiddleware, validateArticle, validateRequest, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    summary,
    content,
    imageUrl,
    categoryId,
    universityId,
    professorId,
    referenceLink,
    tags,
    readTime,
    isFeatured,
    isPublished
  } = req.body;

  // Check if user can edit this article
  const { data: article } = await supabase
    .from('articles')
    .select('created_by')
    .eq('id', id)
    .single();

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  if (article.created_by !== req.user.id && !['admin', 'moderator'].includes(req.profile.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const updates = {};
  if (title) {
    updates.title = title;
    updates.slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  if (summary) updates.summary = summary;
  if (content) updates.content = content;
  if (imageUrl) updates.image_url = imageUrl;
  if (categoryId) updates.category_id = categoryId;
  if (universityId) updates.university_id = universityId;
  if (professorId) updates.professor_id = professorId;
  if (referenceLink) updates.reference_link = referenceLink;
  if (readTime) updates.read_time = readTime;
  if (isFeatured !== undefined) updates.is_featured = isFeatured;
  if (isPublished !== undefined) {
    updates.is_published = isPublished;
    if (isPublished && !article.published_at) {
      updates.published_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      categories(name, slug),
      universities(short_name, slug),
      professors(name),
      article_tags(tag)
    `)
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  // Update tags if provided
  if (tags) {
    await supabase.from('article_tags').delete().eq('article_id', id);
    
    if (tags.length > 0) {
      const tagInserts = tags.map(tag => ({
        article_id: id,
        tag: tag.trim()
      }));
      await supabase.from('article_tags').insert(tagInserts);
    }
  }

  res.json({
    message: 'Article updated successfully',
    article: data
  });
}));

// Delete article (admin only)
router.delete('/:id', authMiddleware, requireModerator, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ message: 'Article deleted successfully' });
}));

// Toggle featured status (moderator only)
router.patch('/:id/featured', authMiddleware, requireModerator, asyncHandler(async (req, res) => {
  const { id } = req.params;

  // First, remove featured status from all articles
  await supabase
    .from('articles')
    .update({ is_featured: false })
    .neq('id', id);

  // Then toggle the selected article
  const { data: currentArticle } = await supabase
    .from('articles')
    .select('is_featured')
    .eq('id', id)
    .single();

  if (!currentArticle) {
    return res.status(404).json({ error: 'Article not found' });
  }

  const { data, error } = await supabase
    .from('articles')
    .update({ is_featured: !currentArticle.is_featured })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  res.json({
    message: 'Featured status updated successfully',
    article: data
  });
}));

// Get article comments
router.get('/:id/comments', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profiles(name, avatar_url)
    `)
    .eq('article_id', id)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (error) {
    handleSupabaseError(error);
  }

  res.json({ comments: data || [] });
}));

// Add comment to article
router.post('/:id/comments', authMiddleware, [
  body('content').trim().isLength({ min: 10, max: 1000 }).withMessage('Comment must be between 10 and 1000 characters'),
  body('parentId').optional().isUUID().withMessage('Parent ID must be valid UUID'),
  validateRequest
], asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content, parentId } = req.body;

  const { data, error } = await supabase
    .from('comments')
    .insert({
      article_id: id,
      user_id: req.user.id,
      content,
      parent_id: parentId,
      is_approved: req.profile.role === 'admin' || req.profile.role === 'moderator'
    })
    .select(`
      *,
      profiles(name, avatar_url)
    `)
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  res.status(201).json({
    message: 'Comment added successfully',
    comment: data
  });
}));

module.exports = router;