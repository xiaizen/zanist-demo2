const express = require('express');
const { supabase, handleSupabaseError } = require('../config/database');
const { requireModerator } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Get dashboard analytics (moderator only)
router.get('/dashboard', requireModerator, asyncHandler(async (req, res) => {
  const { timeRange = '30d' } = req.query;

  // Calculate date range
  const now = new Date();
  let startDate;
  
  switch (timeRange) {
    case '7d':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90d':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  // Get basic counts
  const [
    articlesCount,
    usersCount,
    totalViews,
    commentsCount
  ] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('views_count').eq('is_published', true),
    supabase.from('comments').select('*', { count: 'exact', head: true }).eq('is_approved', true)
  ]);

  // Calculate total views
  const totalViewsSum = totalViews.data?.reduce((sum, article) => sum + (article.views_count || 0), 0) || 0;

  // Get top categories
  const { data: topCategories } = await supabase
    .from('categories')
    .select('name, article_count')
    .eq('is_active', true)
    .order('article_count', { ascending: false })
    .limit(5);

  // Get top universities
  const { data: topUniversities } = await supabase
    .from('universities')
    .select('short_name, recent_research')
    .eq('is_active', true)
    .order('recent_research', { ascending: false })
    .limit(5);

  // Get recent activity
  const { data: recentActivity } = await supabase
    .from('access_logs')
    .select(`
      *,
      profiles(name)
    `)
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false })
    .limit(20);

  // Mock time-series data (in production, this would come from proper analytics)
  const viewsOverTime = [];
  const userGrowth = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    viewsOverTime.push({
      date: date.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 1000) + 500
    });
    userGrowth.push({
      date: date.toISOString().split('T')[0],
      users: Math.floor(Math.random() * 50) + 20
    });
  }

  res.json({
    overview: {
      totalArticles: articlesCount.count || 0,
      totalUsers: usersCount.count || 0,
      totalViews: totalViewsSum,
      totalComments: commentsCount.count || 0
    },
    topCategories: topCategories || [],
    topUniversities: topUniversities || [],
    recentActivity: recentActivity?.map(log => ({
      id: log.id,
      action: log.action,
      resource: log.resource,
      userName: log.profiles?.name || 'Anonymous',
      success: log.success,
      createdAt: log.created_at
    })) || [],
    charts: {
      viewsOverTime,
      userGrowth
    }
  });
}));

// Get article analytics
router.get('/articles', requireModerator, asyncHandler(async (req, res) => {
  const { timeRange = '30d' } = req.query;

  // Get article performance metrics
  const { data: articleStats, error } = await supabase
    .from('articles')
    .select(`
      id, title, slug, views_count, likes_count, comments_count, published_at,
      categories(name),
      universities(short_name)
    `)
    .eq('is_published', true)
    .order('views_count', { ascending: false })
    .limit(20);

  if (error) {
    handleSupabaseError(error);
  }

  // Get category performance
  const { data: categoryStats } = await supabase
    .from('categories')
    .select('name, article_count')
    .eq('is_active', true)
    .order('article_count', { ascending: false });

  res.json({
    topArticles: articleStats || [],
    categoryPerformance: categoryStats || []
  });
}));

// Get user analytics
router.get('/users', requireModerator, asyncHandler(async (req, res) => {
  // Get user registration trends
  const { data: userStats, error } = await supabase
    .from('profiles')
    .select('created_at, role')
    .order('created_at', { ascending: false });

  if (error) {
    handleSupabaseError(error);
  }

  // Group by role
  const roleDistribution = userStats?.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {}) || {};

  // Group by month for registration trends
  const registrationTrends = userStats?.reduce((acc, user) => {
    const month = user.created_at.substring(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {}) || {};

  res.json({
    totalUsers: userStats?.length || 0,
    roleDistribution,
    registrationTrends: Object.entries(registrationTrends).map(([month, count]) => ({
      month,
      count
    }))
  });
}));

// Log page view
router.post('/pageview', asyncHandler(async (req, res) => {
  const { resource, userId } = req.body;

  await supabase.from('access_logs').insert({
    user_id: userId || null,
    action: 'page_view',
    resource,
    success: true,
    ip_address: req.ip,
    user_agent: req.get('User-Agent'),
    metadata: { timestamp: new Date().toISOString() }
  });

  res.json({ message: 'Page view logged' });
}));

module.exports = router;