export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          role: 'visitor' | 'member' | 'moderator' | 'admin'
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
          last_login: string | null
          permissions: string[]
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: 'visitor' | 'member' | 'moderator' | 'admin'
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          permissions?: string[]
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'visitor' | 'member' | 'moderator' | 'admin'
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          permissions?: string[]
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          color: string
          icon: string
          is_active: boolean
          article_count: number
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          color?: string
          icon?: string
          is_active?: boolean
          article_count?: number
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          color?: string
          icon?: string
          is_active?: boolean
          article_count?: number
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      universities: {
        Row: {
          id: string
          name: string
          short_name: string
          slug: string
          country: string
          city: string
          description: string
          logo_url: string | null
          website: string | null
          founded: number | null
          ranking: number | null
          students: number
          professors_count: number
          nobel_prizes: number
          total_research: number
          recent_research: number
          specialties: string[]
          stats: Json
          contact: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          short_name: string
          slug: string
          country: string
          city: string
          description: string
          logo_url?: string | null
          website?: string | null
          founded?: number | null
          ranking?: number | null
          students?: number
          professors_count?: number
          nobel_prizes?: number
          total_research?: number
          recent_research?: number
          specialties?: string[]
          stats?: Json
          contact?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          short_name?: string
          slug?: string
          country?: string
          city?: string
          description?: string
          logo_url?: string | null
          website?: string | null
          founded?: number | null
          ranking?: number | null
          students?: number
          professors_count?: number
          nobel_prizes?: number
          total_research?: number
          recent_research?: number
          specialties?: string[]
          stats?: Json
          contact?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      professors: {
        Row: {
          id: string
          name: string
          title: string
          university_id: string | null
          department: string
          field: string
          photo_url: string
          email: string
          linkedin_url: string | null
          personal_website: string | null
          bio: string
          research_areas: string[]
          education: Json
          previous_positions: Json
          publications: Json
          awards: Json
          nobel_prizes: Json
          stats: Json
          current_research: string[]
          collaborations: string[]
          funding_grants: Json
          is_active: boolean
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          name: string
          title: string
          university_id?: string | null
          department: string
          field: string
          photo_url: string
          email: string
          linkedin_url?: string | null
          personal_website?: string | null
          bio: string
          research_areas?: string[]
          education?: Json
          previous_positions?: Json
          publications?: Json
          awards?: Json
          nobel_prizes?: Json
          stats?: Json
          current_research?: string[]
          collaborations?: string[]
          funding_grants?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          title?: string
          university_id?: string | null
          department?: string
          field?: string
          photo_url?: string
          email?: string
          linkedin_url?: string | null
          personal_website?: string | null
          bio?: string
          research_areas?: string[]
          education?: Json
          previous_positions?: Json
          publications?: Json
          awards?: Json
          nobel_prizes?: Json
          stats?: Json
          current_research?: string[]
          collaborations?: string[]
          funding_grants?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          summary: string
          content: string
          image_url: string
          category_id: string | null
          university_id: string | null
          professor_id: string | null
          reference_link: string | null
          read_time: number
          is_featured: boolean
          is_published: boolean
          views_count: number
          likes_count: number
          comments_count: number
          published_at: string | null
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          summary: string
          content: string
          image_url: string
          category_id?: string | null
          university_id?: string | null
          professor_id?: string | null
          reference_link?: string | null
          read_time?: number
          is_featured?: boolean
          is_published?: boolean
          views_count?: number
          likes_count?: number
          comments_count?: number
          published_at?: string | null
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          summary?: string
          content?: string
          image_url?: string
          category_id?: string | null
          university_id?: string | null
          professor_id?: string | null
          reference_link?: string | null
          read_time?: number
          is_featured?: boolean
          is_published?: boolean
          views_count?: number
          likes_count?: number
          comments_count?: number
          published_at?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      article_tags: {
        Row: {
          id: string
          article_id: string
          tag: string
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          tag: string
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          tag?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          article_id: string
          user_id: string
          content: string
          is_approved: boolean
          parent_id: string | null
          likes_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          article_id: string
          user_id: string
          content: string
          is_approved?: boolean
          parent_id?: string | null
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          user_id?: string
          content?: string
          is_approved?: boolean
          parent_id?: string | null
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          article_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          article_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          article_id?: string
          created_at?: string
        }
      }
      newsletter_subscriptions: {
        Row: {
          id: string
          email: string
          name: string | null
          is_active: boolean
          subscription_type: 'weekly' | 'alerts' | 'monthly'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          is_active?: boolean
          subscription_type?: 'weekly' | 'alerts' | 'monthly'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          is_active?: boolean
          subscription_type?: 'weekly' | 'alerts' | 'monthly'
          created_at?: string
          updated_at?: string
        }
      }
      access_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          resource: string
          ip_address: string | null
          user_agent: string | null
          success: boolean
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          resource: string
          ip_address?: string | null
          user_agent?: string | null
          success?: boolean
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          resource?: string
          ip_address?: string | null
          user_agent?: string | null
          success?: boolean
          metadata?: Json
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_articles: {
        Args: {
          search_query: string
        }
        Returns: {
          id: string
          title: string
          summary: string
          image_url: string
          category_name: string
          university_name: string
          professor_name: string
          read_time: number
          published_at: string
          rank: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}