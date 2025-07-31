import { supabase, handleSupabaseError, checkUserRole } from '../lib/supabase';

export interface ProfessorProfile {
  id: string;
  name: string;
  title: string;
  universityId?: string;
  university?: {
    name: string;
    shortName: string;
    slug: string;
  };
  department: string;
  field: string;
  photoUrl: string;
  email: string;
  linkedinUrl?: string;
  personalWebsite?: string;
  bio: string;
  researchAreas: string[];
  education: any[];
  previousPositions: any[];
  publications: any[];
  awards: any[];
  nobelPrizes?: any[];
  stats: {
    totalPublications: number;
    totalCitations: number;
    hIndex: number;
    researchGate?: string;
    orcid?: string;
  };
  currentResearch: string[];
  collaborations: string[];
  fundingGrants: any[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfessorData {
  name: string;
  title: string;
  universityId?: string;
  department: string;
  field: string;
  photoUrl: string;
  email: string;
  linkedinUrl?: string;
  personalWebsite?: string;
  bio: string;
  researchAreas?: string[];
  stats?: {
    totalPublications?: number;
    totalCitations?: number;
    hIndex?: number;
  };
}

class ProfessorsService {
  async getProfessors(includeInactive = false): Promise<ProfessorProfile[]> {
    try {
      let query = supabase
        .from('professors')
        .select(`
          *,
          universities(name, short_name, slug)
        `)
        .order('name');

      if (!includeInactive) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data?.map(this.transformProfessor) || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getProfessorById(id: string): Promise<ProfessorProfile | null> {
    try {
      const { data, error } = await supabase
        .from('professors')
        .select(`
          *,
          universities(name, short_name, slug)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      return this.transformProfessor(data);
    } catch (error) {
      console.error('Error getting professor:', error);
      return null;
    }
  }

  async getProfessorsByUniversity(universityId: string): Promise<ProfessorProfile[]> {
    try {
      const { data, error } = await supabase
        .from('professors')
        .select(`
          *,
          universities(name, short_name, slug)
        `)
        .eq('university_id', universityId)
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      return data?.map(this.transformProfessor) || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async getProfessorsByField(field: string): Promise<ProfessorProfile[]> {
    try {
      const { data, error } = await supabase
        .from('professors')
        .select(`
          *,
          universities(name, short_name, slug)
        `)
        .ilike('field', `%${field}%`)
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      return data?.map(this.transformProfessor) || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  async createProfessor(professorData: CreateProfessorData): Promise<ProfessorProfile> {
    try {
      await checkUserRole(['admin', 'moderator']);

      const { data, error } = await supabase
        .from('professors')
        .insert({
          name: professorData.name,
          title: professorData.title,
          university_id: professorData.universityId,
          department: professorData.department,
          field: professorData.field,
          photo_url: professorData.photoUrl,
          email: professorData.email,
          linkedin_url: professorData.linkedinUrl,
          personal_website: professorData.personalWebsite,
          bio: professorData.bio,
          research_areas: professorData.researchAreas || [],
          stats: professorData.stats || {
            totalPublications: 0,
            totalCitations: 0,
            hIndex: 0
          }
        })
        .select(`
          *,
          universities(name, short_name, slug)
        `)
        .single();

      if (error) throw error;

      return this.transformProfessor(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async updateProfessor(id: string, updates: Partial<CreateProfessorData>): Promise<ProfessorProfile> {
    try {
      await checkUserRole(['admin', 'moderator']);

      const updateData: any = {};
      
      if (updates.name) updateData.name = updates.name;
      if (updates.title) updateData.title = updates.title;
      if (updates.universityId) updateData.university_id = updates.universityId;
      if (updates.department) updateData.department = updates.department;
      if (updates.field) updateData.field = updates.field;
      if (updates.photoUrl) updateData.photo_url = updates.photoUrl;
      if (updates.email) updateData.email = updates.email;
      if (updates.linkedinUrl) updateData.linkedin_url = updates.linkedinUrl;
      if (updates.personalWebsite) updateData.personal_website = updates.personalWebsite;
      if (updates.bio) updateData.bio = updates.bio;
      if (updates.researchAreas) updateData.research_areas = updates.researchAreas;
      if (updates.stats) updateData.stats = updates.stats;

      const { data, error } = await supabase
        .from('professors')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          universities(name, short_name, slug)
        `)
        .single();

      if (error) throw error;

      return this.transformProfessor(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async deleteProfessor(id: string): Promise<void> {
    try {
      await checkUserRole(['admin']);

      const { error } = await supabase
        .from('professors')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async searchProfessors(searchQuery: string): Promise<ProfessorProfile[]> {
    try {
      const { data, error } = await supabase
        .from('professors')
        .select(`
          *,
          universities(name, short_name, slug)
        `)
        .or(`name.ilike.%${searchQuery}%,field.ilike.%${searchQuery}%,bio.ilike.%${searchQuery}%`)
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      return data?.map(this.transformProfessor) || [];
    } catch (error) {
      handleSupabaseError(error);
      return [];
    }
  }

  private transformProfessor(data: any): ProfessorProfile {
    return {
      id: data.id,
      name: data.name,
      title: data.title,
      universityId: data.university_id,
      university: data.universities ? {
        name: data.universities.name,
        shortName: data.universities.short_name,
        slug: data.universities.slug
      } : undefined,
      department: data.department,
      field: data.field,
      photoUrl: data.photo_url,
      email: data.email,
      linkedinUrl: data.linkedin_url,
      personalWebsite: data.personal_website,
      bio: data.bio,
      researchAreas: data.research_areas || [],
      education: data.education || [],
      previousPositions: data.previous_positions || [],
      publications: data.publications || [],
      awards: data.awards || [],
      nobelPrizes: data.nobel_prizes || [],
      stats: data.stats || {
        totalPublications: 0,
        totalCitations: 0,
        hIndex: 0
      },
      currentResearch: data.current_research || [],
      collaborations: data.collaborations || [],
      fundingGrants: data.funding_grants || [],
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

export const professorsService = new ProfessorsService();