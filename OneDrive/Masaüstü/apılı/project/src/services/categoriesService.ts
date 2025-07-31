import { supabase, handleSupabaseError, checkUserRole } from '../lib/supabase';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  isActive: boolean;
  articleCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  description: string;
  color?: string;
  icon?: string;
  isActive?: boolean;
}

class CategoriesService {
  async getCategories(includeInactive = false): Promise<Category[]> {
    try {
      let query = supabase
        .from('categories')
        .select('*')
        .order('name');

      if (!includeInactive) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data?.map(this.transformCategory) || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      return this.transformCategory(data);
    } catch (error) {
      console.error('Error getting category:', error);
      return null;
    }
  }

  async createCategory(categoryData: CreateCategoryData): Promise<Category> {
    try {
      await checkUserRole(['admin', 'moderator']);

      const slug = this.generateSlug(categoryData.name);

      const { data, error } = await supabase
        .from('categories')
        .insert({
          name: categoryData.name,
          slug,
          description: categoryData.description,
          color: categoryData.color || '#3b82f6',
          icon: categoryData.icon || '📚',
          is_active: categoryData.isActive !== false
        })
        .select()
        .single();

      if (error) throw error;

      return this.transformCategory(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async updateCategory(id: string, updates: Partial<CreateCategoryData>): Promise<Category> {
    try {
      await checkUserRole(['admin', 'moderator']);

      const updateData: any = { ...updates };
      
      if (updates.name) {
        updateData.slug = this.generateSlug(updates.name);
      }

      const { data, error } = await supabase
        .from('categories')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return this.transformCategory(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<void> {
    try {
      await checkUserRole(['admin']);

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async toggleCategoryStatus(id: string): Promise<void> {
    try {
      await checkUserRole(['admin', 'moderator']);

      const { data: category } = await supabase
        .from('categories')
        .select('is_active')
        .eq('id', id)
        .single();

      if (!category) throw new Error('Category not found');

      const { error } = await supabase
        .from('categories')
        .update({ is_active: !category.is_active })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  private transformCategory(data: any): Category {
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      color: data.color,
      icon: data.icon,
      isActive: data.is_active,
      articleCount: data.article_count,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

export const categoriesService = new CategoriesService();