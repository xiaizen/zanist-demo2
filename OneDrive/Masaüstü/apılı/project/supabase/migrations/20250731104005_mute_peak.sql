/*
  # Initial Zanist Database Schema

  1. New Tables
    - `profiles` - User profiles extending Supabase auth
    - `categories` - Research categories
    - `universities` - University information
    - `professors` - Professor profiles
    - `articles` - Research articles/essays
    - `article_tags` - Tags for articles
    - `comments` - Article comments
    - `bookmarks` - User bookmarks
    - `newsletter_subscriptions` - Newsletter subscribers
    - `access_logs` - User activity tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin-only policies for management tables

  3. Functions
    - Update user profile function
    - Search functions
    - Analytics functions
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'visitor' CHECK (role IN ('visitor', 'member', 'moderator', 'admin')),
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz,
  permissions text[] DEFAULT '{}'::text[]
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  color text NOT NULL DEFAULT '#3b82f6',
  icon text NOT NULL DEFAULT '📚',
  is_active boolean DEFAULT true,
  article_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES profiles(id)
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Universities table
CREATE TABLE IF NOT EXISTS universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_name text NOT NULL,
  slug text UNIQUE NOT NULL,
  country text NOT NULL,
  city text NOT NULL,
  description text NOT NULL,
  logo_url text,
  website text,
  founded integer,
  ranking integer,
  students integer DEFAULT 0,
  professors_count integer DEFAULT 0,
  nobel_prizes integer DEFAULT 0,
  total_research integer DEFAULT 0,
  recent_research integer DEFAULT 0,
  specialties text[] DEFAULT '{}'::text[],
  stats jsonb DEFAULT '{}'::jsonb,
  contact jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

-- Professors table
CREATE TABLE IF NOT EXISTS professors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  university_id uuid REFERENCES universities(id) ON DELETE SET NULL,
  department text NOT NULL,
  field text NOT NULL,
  photo_url text NOT NULL,
  email text NOT NULL,
  linkedin_url text,
  personal_website text,
  bio text NOT NULL,
  research_areas text[] DEFAULT '{}'::text[],
  education jsonb DEFAULT '[]'::jsonb,
  previous_positions jsonb DEFAULT '[]'::jsonb,
  publications jsonb DEFAULT '[]'::jsonb,
  awards jsonb DEFAULT '[]'::jsonb,
  nobel_prizes jsonb DEFAULT '[]'::jsonb,
  stats jsonb DEFAULT '{}'::jsonb,
  current_research text[] DEFAULT '{}'::text[],
  collaborations text[] DEFAULT '{}'::text[],
  funding_grants jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES profiles(id)
);

ALTER TABLE professors ENABLE ROW LEVEL SECURITY;

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  university_id uuid REFERENCES universities(id) ON DELETE SET NULL,
  professor_id uuid REFERENCES professors(id) ON DELETE SET NULL,
  reference_link text,
  read_time integer DEFAULT 5,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  views_count integer DEFAULT 0,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES profiles(id) NOT NULL
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Article tags table
CREATE TABLE IF NOT EXISTS article_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  tag text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_approved boolean DEFAULT false,
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, article_id)
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  is_active boolean DEFAULT true,
  subscription_type text DEFAULT 'weekly' CHECK (subscription_type IN ('weekly', 'alerts', 'monthly')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Access logs table
CREATE TABLE IF NOT EXISTS access_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource text NOT NULL,
  ip_address inet,
  user_agent text,
  success boolean DEFAULT true,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES profiles(id)
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_university ON articles(university_id);
CREATE INDEX IF NOT EXISTS idx_articles_professor ON articles(professor_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(is_featured);
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING gin(to_tsvector('english', title || ' ' || summary || ' ' || content));
CREATE INDEX IF NOT EXISTS idx_professors_university ON professors(university_id);
CREATE INDEX IF NOT EXISTS idx_professors_field ON professors(field);
CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_user ON access_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_created ON access_logs(created_at);

-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Categories policies
CREATE POLICY "Anyone can read active categories"
  ON categories
  FOR SELECT
  USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins and moderators can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Universities policies
CREATE POLICY "Anyone can read active universities"
  ON universities
  FOR SELECT
  USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins and moderators can manage universities"
  ON universities
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Professors policies
CREATE POLICY "Anyone can read active professors"
  ON professors
  FOR SELECT
  USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins and moderators can manage professors"
  ON professors
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Articles policies
CREATE POLICY "Anyone can read published articles"
  ON articles
  FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authors and admins can update articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can delete articles"
  ON articles
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Article tags policies
CREATE POLICY "Anyone can read article tags"
  ON article_tags
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage article tags"
  ON article_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM articles 
      WHERE id = article_id AND (
        created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM profiles 
          WHERE id = auth.uid() AND role IN ('admin', 'moderator')
        )
      )
    )
  );

-- Comments policies
CREATE POLICY "Anyone can read approved comments"
  ON comments
  FOR SELECT
  USING (is_approved = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Moderators can manage all comments"
  ON comments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Bookmarks policies
CREATE POLICY "Users can manage own bookmarks"
  ON bookmarks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Newsletter subscriptions policies
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  USING (true);

CREATE POLICY "Admins can manage newsletter subscriptions"
  ON newsletter_subscriptions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Access logs policies
CREATE POLICY "Users can read own access logs"
  ON access_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert access logs"
  ON access_logs
  FOR INSERT
  USING (true);

CREATE POLICY "Admins can read all access logs"
  ON access_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Site settings policies
CREATE POLICY "Anyone can read site settings"
  ON site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage site settings"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Functions

-- Function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'visitor'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update article counts
CREATE OR REPLACE FUNCTION update_article_counts()
RETURNS trigger AS $$
BEGIN
  -- Update category article count
  IF TG_OP = 'INSERT' THEN
    UPDATE categories 
    SET article_count = article_count + 1 
    WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE categories 
    SET article_count = article_count - 1 
    WHERE id = OLD.category_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.category_id != NEW.category_id THEN
      UPDATE categories 
      SET article_count = article_count - 1 
      WHERE id = OLD.category_id;
      UPDATE categories 
      SET article_count = article_count + 1 
      WHERE id = NEW.category_id;
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for article count updates
DROP TRIGGER IF EXISTS update_article_counts_trigger ON articles;
CREATE TRIGGER update_article_counts_trigger
  AFTER INSERT OR UPDATE OR DELETE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_article_counts();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers to relevant tables
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_universities_updated_at ON universities;
CREATE TRIGGER update_universities_updated_at
  BEFORE UPDATE ON universities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_professors_updated_at ON professors;
CREATE TRIGGER update_professors_updated_at
  BEFORE UPDATE ON professors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function for full-text search
CREATE OR REPLACE FUNCTION search_articles(search_query text)
RETURNS TABLE (
  id uuid,
  title text,
  summary text,
  image_url text,
  category_name text,
  university_name text,
  professor_name text,
  read_time integer,
  published_at timestamptz,
  rank real
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.summary,
    a.image_url,
    c.name as category_name,
    u.short_name as university_name,
    p.name as professor_name,
    a.read_time,
    a.published_at,
    ts_rank(to_tsvector('english', a.title || ' ' || a.summary || ' ' || a.content), plainto_tsquery('english', search_query)) as rank
  FROM articles a
  LEFT JOIN categories c ON a.category_id = c.id
  LEFT JOIN universities u ON a.university_id = u.id
  LEFT JOIN professors p ON a.professor_id = p.id
  WHERE a.is_published = true
    AND to_tsvector('english', a.title || ' ' || a.summary || ' ' || a.content) @@ plainto_tsquery('english', search_query)
  ORDER BY rank DESC, a.published_at DESC;
END;
$$ LANGUAGE plpgsql;