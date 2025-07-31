import { supabase, handleSupabaseError, checkUserRole } from '../lib/supabase';

export interface University {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  country: string;
  city: string;
  description: string;
  logoUrl?: string;
  website?: string;
  founded?: number;
  ranking?: number;
  students: number;
  professorsCount: number;
  nobelPrizes: number;
  totalResearch: number;
  recentResearch: number;
  specialties: string[];
  stats: any;
  contact: any;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUniversityData {
  name: string;
  shortName: string;
  country: string;
  city: string;
  description: string;
  logoUrl?: string;
  website?: string;
  founded?: number;
  ranking?: number;
  students?: number;
  specialties?: string[];
  stats?: any;
  contact?: any;
}

class UniversitiesService {
  async getUniversities(includeInactive = false): Promise<University[]> {
    try {
      let query = supabase
        .from('universities')
        .select('*')
        .order('ranking');

      if (!includeInactive) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data?.map(this.transformUniversity) || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getUniversityBySlug(slug: string): Promise<University | null> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      return this.transformUniversity(data);
    } catch (error) {
      console.error('Error getting university:', error);
      return null;
    }
  }

  async getUniversitiesByCountry(country: string): Promise<University[]> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('country', country)
        .eq('is_active', true)
        .order('ranking');

      if (error) throw error;

      return data?.map(this.transformUniversity) || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async createUniversity(universityData: CreateUniversityData): Promise<University> {
    try {
      await checkUserRole(['admin', 'moderator']);

      const slug = this.generateSlug(universityData.shortName);

      const { data, error } = await supabase
        .from('universities')
        .insert({
          name: universityData.name,
          short_name: universityData.shortName,
          slug,
          country: universityData.country,
          city: universityData.city,
          description: universityData.description,
          logo_url: universityData.logoUrl,
          website: universityData.website,
          founded: universityData.founded,
          ranking: universityData.ranking,
          students: universityData.students || 0,
          specialties: universityData.specialties || [],
          stats: universityData.stats || {},
          contact: universityData.contact || {}
        })
        .select()
        .single();

      if (error) throw error;

      return this.transformUniversity(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async updateUniversity(id: string, updates: Partial<CreateUniversityData>): Promise<University> {
    try {
      await checkUserRole(['admin', 'moderator']);

      const updateData: any = { ...updates };
      
      if (updates.shortName) {
        updateData.short_name = updates.shortName;
        updateData.slug = this.generateSlug(updates.shortName);
      }

      const { data, error } = await supabase
        .from('universities')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return this.transformUniversity(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async deleteUniversity(id: string): Promise<void> {
    try {
      await checkUserRole(['admin']);

      const { error } = await supabase
        .from('universities')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async getCountries(): Promise<{ name: string; count: number }[]> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('country')
        .eq('is_active', true);

      if (error) throw error;

      const countryCounts = data?.reduce((acc: any, uni) => {
        acc[uni.country] = (acc[uni.country] || 0) + 1;
        return acc;
      }, {}) || {};

      return Object.entries(countryCounts).map(([name, count]) => ({
        name,
        count: count as number
      }));
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  private transformUniversity(data: any): University {
    return {
      id: data.id,
      name: data.name,
      shortName: data.short_name,
      slug: data.slug,
      country: data.country,
      city: data.city,
      description: data.description,
      logoUrl: data.logo_url,
      website: data.website,
      founded: data.founded,
      ranking: data.ranking,
      students: data.students,
      professorsCount: data.professors_count,
      nobelPrizes: data.nobel_prizes,
      totalResearch: data.total_research,
      recentResearch: data.recent_research,
      specialties: data.specialties,
      stats: data.stats,
      contact: data.contact,
      isActive: data.is_active,
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

export const universitiesService = new UniversitiesService();