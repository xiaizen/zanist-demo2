import { supabase, handleSupabaseError, getAuthenticatedUser, checkUserRole } from '../lib/supabase';
import { Essay } from '../types/Essay';

export interface ArticleFilters {
  category?: string;
  university?: string;
  professor?: string;
  timeFilter?: 'week' | 'month' | 'year' | 'all';
  search?: string;
  featured?: boolean;
  published?: boolean;
}

export interface CreateArticleData {
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  categoryId?: string;
  universityId?: string;
  professorId?: string;
  referenceLink?: string;
  tags: string[];
  readTime: number;
  isFeatured?: boolean;
  isPublished?: boolean;
}

class ArticlesService {
  async getArticles(filters: ArticleFilters = {}): Promise<Essay[]> {
    try {
      let query = supabase
        .from('articles')
        .select(`
          *,
          categories(name, slug),
          universities(short_name, slug),
          professors(name),
          article_tags(tag)
        `)
        .eq('is_published', filters.published !== false);

      // Apply filters
      if (filters.category) {
        query = query.eq('categories.slug', filters.category);
      }

      if (filters.university) {
        query = query.eq('universities.slug', filters.university);
      }

      if (filters.featured !== undefined) {
        query = query.eq('is_featured', filters.featured);
      }

      // Time filter
      if (filters.timeFilter && filters.timeFilter !== 'all') {
        const now = new Date();
        let startDate: Date;

        switch (filters.timeFilter) {
          case 'week':
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case 'month':
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
          case 'year':
            startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            break;
          default:
            startDate = new Date(0);
        }

        query = query.gte('published_at', startDate.toISOString());
      }

      query = query.order('published_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      return data?.map(this.transformArticle) || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getArticleBySlug(slug: string): Promise<Essay | null> {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          categories(name, slug),
          universities(short_name, slug),
          professors(name),
          article_tags(tag)
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;

      // Increment view count
      await supabase
        .from('articles')
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq('id', data.id);

      return this.transformArticle(data);
    } catch (error) {
      console.error('Error getting article:', error);
      return null;
    }
  }

  async searchArticles(searchQuery: string): Promise<Essay[]> {
    try {
      const { data, error } = await supabase
        .rpc('search_articles', { search_query: searchQuery });

      if (error) throw error;

      return data?.map(item => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        content: '', // Not included in search results
        imageUrl: item.image_url,
        category: item.category_name || 'Uncategorized',
        university: item.university_name || 'Unknown',
        professor: item.professor_name || 'Unknown',
        referenceLink: '',
        tags: [],
        publishDate: item.published_at?.split('T')[0] || '',
        readTime: item.read_time,
        isFeatured: false
      })) || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async createArticle(articleData: CreateArticleData): Promise<Essay> {
    try {
      const user = await getAuthenticatedUser();

      // Generate slug from title
      const slug = this.generateSlug(articleData.title);

      const { data, error } = await supabase
        .from('articles')
        .insert({
          title: articleData.title,
          slug,
          summary: articleData.summary,
          content: articleData.content,
          image_url: articleData.imageUrl,
          category_id: articleData.categoryId,
          university_id: articleData.universityId,
          professor_id: articleData.professorId,
          reference_link: articleData.referenceLink,
          read_time: articleData.readTime,
          is_featured: articleData.isFeatured || false,
          is_published: articleData.isPublished !== false,
          published_at: articleData.isPublished !== false ? new Date().toISOString() : null,
          created_by: user.id
        })
        .select(`
          *,
          categories(name, slug),
          universities(short_name, slug),
          professors(name)
        `)
        .single();

      if (error) throw error;

      // Add tags
      if (articleData.tags.length > 0) {
        const tagInserts = articleData.tags.map(tag => ({
          article_id: data.id,
          tag: tag.trim()
        }));

        await supabase.from('article_tags').insert(tagInserts);
      }

      return this.transformArticle(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async updateArticle(id: string, updates: Partial<CreateArticleData>): Promise<Essay> {
    try {
      await checkUserRole(['admin', 'moderator']);

      const updateData: any = {};
      
      if (updates.title) {
        updateData.title = updates.title;
        updateData.slug = this.generateSlug(updates.title);
      }
      
      if (updates.summary) updateData.summary = updates.summary;
      if (updates.content) updateData.content = updates.content;
      if (updates.imageUrl) updateData.image_url = updates.imageUrl;
      if (updates.categoryId) updateData.category_id = updates.categoryId;
      if (updates.universityId) updateData.university_id = updates.universityId;
      if (updates.professorId) updateData.professor_id = updates.professorId;
      if (updates.referenceLink) updateData.reference_link = updates.referenceLink;
      if (updates.readTime) updateData.read_time = updates.readTime;
      if (updates.isFeatured !== undefined) updateData.is_featured = updates.isFeatured;
      if (updates.isPublished !== undefined) {
        updateData.is_published = updates.isPublished;
        if (updates.isPublished) {
          updateData.published_at = new Date().toISOString();
        }
      }

      const { data, error } = await supabase
        .from('articles')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          categories(name, slug),
          universities(short_name, slug),
          professors(name),
          article_tags(tag)
        `)
        .single();

      if (error) throw error;

      // Update tags if provided
      if (updates.tags) {
        // Delete existing tags
        await supabase.from('article_tags').delete().eq('article_id', id);
        
        // Insert new tags
        if (updates.tags.length > 0) {
          const tagInserts = updates.tags.map(tag => ({
            article_id: id,
            tag: tag.trim()
          }));
          await supabase.from('article_tags').insert(tagInserts);
        }
      }

      return this.transformArticle(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async deleteArticle(id: string): Promise<void> {
    try {
      await checkUserRole(['admin']);

      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async toggleFeatured(id: string): Promise<void> {
    try {
      await checkUserRole(['admin', 'moderator']);

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

      await supabase
        .from('articles')
        .update({ is_featured: !currentArticle?.is_featured })
        .eq('id', id);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getUniversities() {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('is_active', true)
        .order('ranking');

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getProfessors() {
    try {
      const { data, error } = await supabase
        .from('professors')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  private transformArticle(data: any): Essay {
    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      imageUrl: data.image_url,
      category: data.categories?.name || 'Uncategorized',
      university: data.universities?.short_name || 'Unknown',
      professor: data.professors?.name || 'Unknown',
      referenceLink: data.reference_link || '',
      tags: data.article_tags?.map((tag: any) => tag.tag) || [],
      publishDate: data.published_at?.split('T')[0] || data.created_at.split('T')[0],
      readTime: data.read_time,
      isFeatured: data.is_featured
    };
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private async logAccess(log: {
    action: string;
    resource: string;
    success: boolean;
    userId?: string;
    metadata?: any;
  }): Promise<void> {
    try {
      await supabase.from('access_logs').insert({
        user_id: log.userId || null,
        action: log.action,
        resource: log.resource,
        success: log.success,
        metadata: log.metadata || {}
      });
    } catch (error) {
      console.error('Failed to log access:', error);
    }
  }
}

export const articlesService = new ArticlesService();