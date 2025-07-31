const express = require('express');
const RSS = require('rss');
const { supabase, handleSupabaseError } = require('../config/database');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Generate RSS feed for all articles
router.get('/articles.xml', asyncHandler(async (req, res) => {
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories(name, slug),
      universities(short_name),
      professors(name)
    `)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(50);

  if (error) {
    handleSupabaseError(error);
  }

  const feed = new RSS({
    title: 'Zanist - Latest Scientific Research',
    description: 'Discover the latest scientific research and breakthroughs from leading universities worldwide.',
    feed_url: `${req.protocol}://${req.get('host')}/api/rss/articles.xml`,
    site_url: process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`,
    image_url: `${req.protocol}://${req.get('host')}/logo.png`,
    managingEditor: 'editorial@zanist.com (Zanist Editorial Team)',
    webMaster: 'admin@zanist.com (Zanist Admin)',
    copyright: `${new Date().getFullYear()} Zanist`,
    language: 'en',
    categories: ['Science', 'Research', 'Technology', 'Academia'],
    pubDate: new Date(),
    ttl: 60
  });

  articles?.forEach(article => {
    feed.item({
      title: article.title,
      description: article.summary,
      url: `${process.env.FRONTEND_URL || req.protocol + '://' + req.get('host')}/article/${article.slug}`,
      guid: article.id,
      categories: [article.categories?.name || 'Research'],
      author: `${article.professors?.name || 'Unknown'} (${article.universities?.short_name || 'Unknown University'})`,
      date: article.published_at || article.created_at,
      enclosure: {
        url: article.image_url,
        type: 'image/jpeg'
      }
    });
  });

  res.set('Content-Type', 'application/rss+xml');
  res.send(feed.xml());
}));

// Generate RSS feed by category
router.get('/category/:slug.xml', asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const { data: articles, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories!inner(name, slug),
      universities(short_name),
      professors(name)
    `)
    .eq('categories.slug', slug)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(50);

  if (error) {
    handleSupabaseError(error);
  }

  const categoryName = articles?.[0]?.categories?.name || 'Research';

  const feed = new RSS({
    title: `Zanist - ${categoryName} Research`,
    description: `Latest research and breakthroughs in ${categoryName}`,
    feed_url: `${req.protocol}://${req.get('host')}/api/rss/category/${slug}.xml`,
    site_url: process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`,
    image_url: `${req.protocol}://${req.get('host')}/logo.png`,
    managingEditor: 'editorial@zanist.com (Zanist Editorial Team)',
    webMaster: 'admin@zanist.com (Zanist Admin)',
    copyright: `${new Date().getFullYear()} Zanist`,
    language: 'en',
    categories: [categoryName],
    pubDate: new Date(),
    ttl: 60
  });

  articles?.forEach(article => {
    feed.item({
      title: article.title,
      description: article.summary,
      url: `${process.env.FRONTEND_URL || req.protocol + '://' + req.get('host')}/article/${article.slug}`,
      guid: article.id,
      categories: [categoryName],
      author: `${article.professors?.name || 'Unknown'} (${article.universities?.short_name || 'Unknown University'})`,
      date: article.published_at || article.created_at,
      enclosure: {
        url: article.image_url,
        type: 'image/jpeg'
      }
    });
  });

  res.set('Content-Type', 'application/rss+xml');
  res.send(feed.xml());
}));

// Generate RSS feed by university
router.get('/university/:slug.xml', asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const { data: articles, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories(name, slug),
      universities!inner(name, short_name, slug),
      professors(name)
    `)
    .eq('universities.slug', slug)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(50);

  if (error) {
    handleSupabaseError(error);
  }

  const universityName = articles?.[0]?.universities?.short_name || 'University';

  const feed = new RSS({
    title: `Zanist - ${universityName} Research`,
    description: `Latest research from ${universityName}`,
    feed_url: `${req.protocol}://${req.get('host')}/api/rss/university/${slug}.xml`,
    site_url: process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`,
    image_url: `${req.protocol}://${req.get('host')}/logo.png`,
    managingEditor: 'editorial@zanist.com (Zanist Editorial Team)',
    webMaster: 'admin@zanist.com (Zanist Admin)',
    copyright: `${new Date().getFullYear()} Zanist`,
    language: 'en',
    categories: ['Research', universityName],
    pubDate: new Date(),
    ttl: 60
  });

  articles?.forEach(article => {
    feed.item({
      title: article.title,
      description: article.summary,
      url: `${process.env.FRONTEND_URL || req.protocol + '://' + req.get('host')}/article/${article.slug}`,
      guid: article.id,
      categories: [article.categories?.name || 'Research'],
      author: `${article.professors?.name || 'Unknown'} (${universityName})`,
      date: article.published_at || article.created_at,
      enclosure: {
        url: article.image_url,
        type: 'image/jpeg'
      }
    });
  });

  res.set('Content-Type', 'application/rss+xml');
  res.send(feed.xml());
}));

module.exports = router;