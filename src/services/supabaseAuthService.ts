import { supabase, handleSupabaseError } from '../lib/supabase';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth';

class SupabaseAuthService {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      // Log access attempt
      await this.logAccess({
        action: 'login_attempt',
        resource: '/auth/login',
        success: false,
        metadata: { email: credentials.email }
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        await this.logAccess({
          action: 'login_failed',
          resource: '/auth/login',
          success: false,
          metadata: { email: credentials.email, error: error.message }
        });
        throw error;
      }

      if (!data.user || !data.session) {
        throw new Error('Login failed');
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profile) {
        throw new Error('Profile not found');
      }

      // Update last login
      await supabase
        .from('profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id);

      // Log successful login
      await this.logAccess({
        action: 'login_success',
        resource: '/auth/login',
        success: true,
        userId: data.user.id
      });

      const user: User = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        avatar: profile.avatar_url,
        createdAt: profile.created_at,
        lastLogin: profile.last_login,
        permissions: profile.permissions
      };

      return { user, token: data.session.access_token };
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
    try {
      // Log registration attempt
      await this.logAccess({
        action: 'register_attempt',
        resource: '/auth/register',
        success: false,
        metadata: { email: credentials.email }
      });

      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.name
          }
        }
      });

      if (error) {
        await this.logAccess({
          action: 'register_failed',
          resource: '/auth/register',
          success: false,
          metadata: { email: credentials.email, error: error.message }
        });
        throw error;
      }

      if (!data.user || !data.session) {
        throw new Error('Registration failed');
      }

      // Get user profile (created by trigger)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profile) {
        throw new Error('Profile creation failed');
      }

      // Log successful registration
      await this.logAccess({
        action: 'register_success',
        resource: '/auth/register',
        success: true,
        userId: data.user.id
      });

      const user: User = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        avatar: profile.avatar_url,
        createdAt: profile.created_at,
        lastLogin: profile.last_login,
        permissions: profile.permissions
      };

      return { user, token: data.session.access_token };
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await this.logAccess({
          action: 'logout',
          resource: '/auth/logout',
          success: true,
          userId: user.id
        });
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        return null;
      }

      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        avatar: profile.avatar_url,
        createdAt: profile.created_at,
        lastLogin: profile.last_login,
        permissions: profile.permissions
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          bio: updates.bio,
          avatar_url: updates.avatar
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        avatar: data.avatar_url,
        createdAt: data.created_at,
        lastLogin: data.last_login,
        permissions: data.permissions
      };
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  }

  async hasPermission(permission: string): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      if (!user) return false;

      // Admin has all permissions
      if (user.role === 'admin') return true;

      return user.permissions?.includes(permission) || false;
    } catch (error) {
      return false;
    }
  }

  async hasRole(roles: string | string[]): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      if (!user) return false;

      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(user.role);
    } catch (error) {
      return false;
    }
  }

  async canAccessAdmin(): Promise<boolean> {
    return this.hasRole(['admin', 'moderator']);
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
        metadata: log.metadata || {},
        ip_address: null, // Would be set by edge function in production
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to log access:', error);
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    });
  }
}

export const supabaseAuthService = new SupabaseAuthService();