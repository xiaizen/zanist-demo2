import { supabase, handleSupabaseError, checkUserRole } from '../lib/supabase';

export interface AnalyticsData {
  totalArticles: number;
  totalViews: number;
  totalUsers: number;
  totalComments: number;
  monthlyGrowth: number;
  topCategories: { name: string; count: number }[];
  topUniversities: { name: string; count: number }[];
  recentActivity: any[];
  viewsOverTime: { date: string; views: number }[];
  userGrowth: { date: string; users: number }[];
}

class AnalyticsService {
  async getDashboardAnalytics(): Promise<AnalyticsData> {
    try {
      await checkUserRole(['admin', 'moderator']);

      // Get basic counts
      const [
        articlesCount,
        usersCount,
        totalViews,
        commentsCount,
        topCategories,
        topUniversities,
        recentActivity
      ] = await Promise.all([
        this.getArticlesCount(),
        this.getUsersCount(),
        this.getTotalViews(),
        this.getCommentsCount(),
        this.getTopCategories(),
        this.getTopUniversities(),
        this.getRecentActivity()
      ]);

      // Calculate monthly growth (mock for now)
      const monthlyGrowth = 23.1;

      return {
        totalArticles: articlesCount,
        totalViews: totalViews,
        totalUsers: usersCount,
        totalComments: commentsCount,
        monthlyGrowth,
        topCategories,
        topUniversities,
        recentActivity,
        viewsOverTime: await this.getViewsOverTime(),
        userGrowth: await this.getUserGrowth()
      };
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  private async getArticlesCount(): Promise<number> {
    const { count, error } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true);

    if (error) throw error;
    return count || 0;
  }

  private async getUsersCount(): Promise<number> {
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
  }

  private async getTotalViews(): Promise<number> {
    const { data, error } = await supabase
      .from('articles')
      .select('views_count')
      .eq('is_published', true);

    if (error) throw error;
    
    return data?.reduce((sum, article) => sum + (article.views_count || 0), 0) || 0;
  }

  private async getCommentsCount(): Promise<number> {
    const { count, error } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('is_approved', true);

    if (error) throw error;
    return count || 0;
  }

  private async getTopCategories(): Promise<{ name: string; count: number }[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('name, article_count')
      .eq('is_active', true)
      .order('article_count', { ascending: false })
      .limit(5);

    if (error) throw error;

    return data?.map(cat => ({
      name: cat.name,
      count: cat.article_count
    })) || [];
  }

  private async getTopUniversities(): Promise<{ name: string; count: number }[]> {
    const { data, error } = await supabase
      .from('universities')
      .select('short_name, recent_research')
      .eq('is_active', true)
      .order('recent_research', { ascending: false })
      .limit(5);

    if (error) throw error;

    return data?.map(uni => ({
      name: uni.short_name,
      count: uni.recent_research
    })) || [];
  }

  private async getRecentActivity(): Promise<any[]> {
    const { data, error } = await supabase
      .from('access_logs')
      .select(`
        *,
        profiles(name)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    return data?.map(log => ({
      id: log.id,
      action: log.action,
      resource: log.resource,
      userName: log.profiles?.name || 'Anonymous',
      success: log.success,
      createdAt: log.created_at
    })) || [];
  }

  private async getViewsOverTime(): Promise<{ date: string; views: number }[]> {
    // This would be implemented with proper time-series data
    // For now, return mock data
    const mockData = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      mockData.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 1000) + 500
      });
    }

    return mockData;
  }

  private async getUserGrowth(): Promise<{ date: string; users: number }[]> {
    // This would be implemented with proper time-series data
    // For now, return mock data
    const mockData = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      mockData.push({
        date: date.toISOString().split('T')[0],
        users: Math.floor(Math.random() * 50) + 20
      });
    }

    return mockData;
  }

  async logPageView(resource: string, userId?: string): Promise<void> {
    try {
      await supabase.from('access_logs').insert({
        user_id: userId || null,
        action: 'page_view',
        resource,
        success: true,
        metadata: { timestamp: new Date().toISOString() }
      });
    } catch (error) {
      console.error('Failed to log page view:', error);
    }
  }

  async getAccessLogs(limit = 100): Promise<any[]> {
    try {
      await checkUserRole(['admin']);

      const { data, error } = await supabase
        .from('access_logs')
        .select(`
          *,
          profiles(name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }
}

export const analyticsService = new AnalyticsService();