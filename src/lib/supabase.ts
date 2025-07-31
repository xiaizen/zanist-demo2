import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error?.message) {
    throw new Error(error.message);
  }
  
  throw new Error('An unexpected error occurred');
};

// Helper function for authenticated requests
export const getAuthenticatedUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    throw new Error('Authentication required');
  }
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};

// Helper function to check user role
export const checkUserRole = async (requiredRoles: string[]) => {
  const user = await getAuthenticatedUser();
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (error || !profile) {
    throw new Error('Profile not found');
  }
  
  if (!requiredRoles.includes(profile.role)) {
    throw new Error('Insufficient permissions');
  }
  
  return profile;
};