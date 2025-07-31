const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper function to handle Supabase errors
const handleSupabaseError = (error) => {
  console.error('Supabase error:', error);
  
  if (error?.message) {
    throw new Error(error.message);
  }
  
  throw new Error('An unexpected database error occurred');
};

// Helper function to verify user authentication
const verifyAuth = async (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header');
  }

  const token = authHeader.substring(7);
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    throw new Error('Invalid or expired token');
  }

  return user;
};

// Helper function to get user profile
const getUserProfile = async (userId) => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !profile) {
    throw new Error('User profile not found');
  }

  return profile;
};

// Helper function to check user permissions
const checkPermission = async (userId, requiredRoles = []) => {
  const profile = await getUserProfile(userId);
  
  if (!requiredRoles.includes(profile.role) && profile.role !== 'admin') {
    throw new Error('Insufficient permissions');
  }

  return profile;
};

module.exports = {
  supabase,
  handleSupabaseError,
  verifyAuth,
  getUserProfile,
  checkPermission
};