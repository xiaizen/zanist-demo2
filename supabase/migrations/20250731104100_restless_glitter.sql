/*
  # Insert Sample Data for Zanist

  1. Categories
  2. Universities
  3. Professors
  4. Sample Articles
  5. Site Settings
*/

-- Insert categories
INSERT INTO categories (name, slug, description, color, icon) VALUES
('Quantum Physics', 'quantum-physics', 'Explore the fundamental nature of matter and energy at the smallest scales.', '#3b82f6', '⚛️'),
('Biotechnology', 'biotechnology', 'Revolutionary advances in genetic engineering and biological systems.', '#10b981', '🧬'),
('Artificial Intelligence', 'artificial-intelligence', 'Cutting-edge developments in machine learning and cognitive computing.', '#8b5cf6', '🤖'),
('Renewable Energy', 'renewable-energy', 'Sustainable energy solutions for a cleaner future.', '#f59e0b', '🌱'),
('Nuclear Physics', 'nuclear-physics', 'Study of atomic nuclei and nuclear reactions.', '#ef4444', '⚡'),
('Environmental Science', 'environmental-science', 'Research on climate change, conservation, and environmental protection.', '#10b981', '🌍'),
('Nanotechnology', 'nanotechnology', 'Engineering at the molecular and atomic scale.', '#ec4899', '🔬'),
('Space Science', 'space-science', 'Exploration of the cosmos and space technology development.', '#6366f1', '🚀');

-- Insert universities
INSERT INTO universities (name, short_name, slug, country, city, description, logo_url, website, founded, ranking, students, professors_count, nobel_prizes, total_research, recent_research, specialties, stats, contact) VALUES
(
  'Massachusetts Institute of Technology',
  'MIT',
  'mit',
  'United States',
  'Cambridge',
  'A private research university known for its innovation in science and technology.',
  'https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg',
  'mit.edu',
  1861,
  1,
  11520,
  1000,
  97,
  15000,
  450,
  ARRAY['Engineering', 'Computer Science', 'Physics', 'Economics'],
  '{"acceptanceRate": "7%", "studentFacultyRatio": "3:1", "internationalStudents": "33%", "researchFunding": "$800M"}'::jsonb,
  '{"address": "77 Massachusetts Avenue, Cambridge, MA 02139", "phone": "+1 (617) 253-1000", "email": "info@mit.edu"}'::jsonb
),
(
  'Stanford University',
  'Stanford',
  'stanford',
  'United States',
  'Stanford',
  'A leading research university known for its entrepreneurial spirit and innovation.',
  'https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Stanford_University.svg',
  'stanford.edu',
  1885,
  2,
  17000,
  2240,
  84,
  12000,
  380,
  ARRAY['Computer Science', 'Medicine', 'Business', 'Engineering'],
  '{"acceptanceRate": "4%", "studentFacultyRatio": "5:1", "internationalStudents": "23%", "researchFunding": "$1.2B"}'::jsonb,
  '{"address": "450 Serra Mall, Stanford, CA 94305", "phone": "+1 (650) 723-2300", "email": "info@stanford.edu"}'::jsonb
),
(
  'Harvard University',
  'Harvard',
  'harvard',
  'United States',
  'Cambridge',
  'The oldest institution of higher education in the United States.',
  'https://upload.wikimedia.org/wikipedia/commons/c/cc/Harvard_University_coat_of_arms.svg',
  'harvard.edu',
  1636,
  3,
  23000,
  2400,
  161,
  14000,
  420,
  ARRAY['Medicine', 'Law', 'Business', 'Liberal Arts'],
  '{"acceptanceRate": "3%", "studentFacultyRatio": "6:1", "internationalStudents": "25%", "researchFunding": "$1.1B"}'::jsonb,
  '{"address": "Massachusetts Hall, Cambridge, MA 02138", "phone": "+1 (617) 495-1000", "email": "info@harvard.edu"}'::jsonb
),
(
  'California Institute of Technology',
  'Caltech',
  'caltech',
  'United States',
  'Pasadena',
  'A world-renowned science and engineering research university.',
  'https://upload.wikimedia.org/wikipedia/commons/7/75/Caltech_logo.svg',
  'caltech.edu',
  1891,
  4,
  2240,
  300,
  76,
  8000,
  280,
  ARRAY['Physics', 'Engineering', 'Chemistry', 'Biology'],
  '{"acceptanceRate": "6%", "studentFacultyRatio": "3:1", "internationalStudents": "27%", "researchFunding": "$400M"}'::jsonb,
  '{"address": "1200 E California Blvd, Pasadena, CA 91125", "phone": "+1 (626) 395-6811", "email": "info@caltech.edu"}'::jsonb
),
(
  'University of Oxford',
  'Oxford',
  'oxford',
  'United Kingdom',
  'Oxford',
  'The oldest university in the English-speaking world.',
  'https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg',
  'ox.ac.uk',
  1096,
  5,
  24000,
  1800,
  72,
  11000,
  350,
  ARRAY['Humanities', 'Sciences', 'Medicine', 'Social Sciences'],
  '{"acceptanceRate": "17%", "studentFacultyRatio": "11:1", "internationalStudents": "45%", "researchFunding": "£600M"}'::jsonb,
  '{"address": "University Offices, Wellington Square, Oxford OX1 2JD", "phone": "+44 1865 270000", "email": "enquiries@ox.ac.uk"}'::jsonb
);

-- Get category and university IDs for professors
DO $$
DECLARE
  mit_id uuid;
  stanford_id uuid;
  harvard_id uuid;
  caltech_id uuid;
  oxford_id uuid;
BEGIN
  SELECT id INTO mit_id FROM universities WHERE slug = 'mit';
  SELECT id INTO stanford_id FROM universities WHERE slug = 'stanford';
  SELECT id INTO harvard_id FROM universities WHERE slug = 'harvard';
  SELECT id INTO caltech_id FROM universities WHERE slug = 'caltech';
  SELECT id INTO oxford_id FROM universities WHERE slug = 'oxford';

  -- Insert professors
  INSERT INTO professors (
    name, title, university_id, department, field, photo_url, email, linkedin_url, personal_website, bio,
    research_areas, education, publications, awards, stats, current_research, collaborations, funding_grants
  ) VALUES
  (
    'Dr. Sarah Chen',
    'Professor of Computer Science',
    mit_id,
    'Computer Science and Artificial Intelligence Laboratory (CSAIL)',
    'Quantum Computing',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    's.chen@mit.edu',
    'https://linkedin.com/in/sarah-chen-mit',
    'https://people.csail.mit.edu/schen',
    'Dr. Sarah Chen is a leading researcher in quantum computing and quantum algorithms. Her groundbreaking work on quantum error correction has revolutionized the field.',
    ARRAY['Quantum Error Correction', 'Quantum Algorithms', 'Quantum Machine Learning'],
    '[{"degree": "Ph.D. in Computer Science", "university": "Stanford University", "year": 2010, "field": "Quantum Computing Theory"}]'::jsonb,
    '[{"title": "Quantum Error Correction for Climate Modeling Applications", "journal": "Nature", "year": 2024, "citations": 245, "doi": "10.1038/s41586-024-07123-4"}]'::jsonb,
    '[{"name": "MacArthur Fellowship", "year": 2023, "organization": "MacArthur Foundation"}]'::jsonb,
    '{"totalPublications": 124, "totalCitations": 15420, "hIndex": 68}'::jsonb,
    ARRAY['Quantum algorithms for climate modeling', 'Error-corrected quantum processors'],
    ARRAY['IBM Quantum Network', 'Google Quantum AI'],
    '[{"title": "Quantum Computing for Climate Science", "amount": "$2.5M", "agency": "NSF", "year": 2023}]'::jsonb
  ),
  (
    'Prof. Jennifer Martinez',
    'Professor of Medicine and Genetics',
    stanford_id,
    'School of Medicine',
    'Gene Editing and CRISPR Technology',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    'j.martinez@stanford.edu',
    'https://linkedin.com/in/jennifer-martinez-stanford',
    'https://med.stanford.edu/profiles/jennifer-martinez',
    'Professor Jennifer Martinez is a pioneer in CRISPR gene editing technology. Her laboratory has developed the most precise gene editing tools available today.',
    ARRAY['CRISPR Gene Editing', 'Genetic Disease Treatment', 'Precision Medicine'],
    '[{"degree": "M.D./Ph.D.", "university": "Harvard Medical School", "year": 2008, "field": "Medicine and Molecular Biology"}]'::jsonb,
    '[{"title": "CRISPR 3.0: Unprecedented Precision in Gene Editing", "journal": "Science", "year": 2024, "citations": 567, "doi": "10.1126/science.abcd1234"}]'::jsonb,
    '[{"name": "Breakthrough Prize in Life Sciences", "year": 2024, "organization": "Breakthrough Prize Foundation"}]'::jsonb,
    '{"totalPublications": 89, "totalCitations": 12450, "hIndex": 54}'::jsonb,
    ARRAY['CRISPR 3.0 clinical applications', 'Gene therapy for inherited diseases'],
    ARRAY['Broad Institute', 'Chan Zuckerberg Initiative'],
    '[{"title": "CRISPR Therapeutics for Genetic Diseases", "amount": "$3.2M", "agency": "NIH", "year": 2023}]'::jsonb
  ),
  (
    'Dr. Elena Rodriguez',
    'Professor of Computer Science and Medicine',
    harvard_id,
    'Harvard Medical School & School of Engineering',
    'AI in Drug Discovery',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    'e.rodriguez@harvard.edu',
    'https://linkedin.com/in/elena-rodriguez-harvard',
    'https://hms.harvard.edu/faculty/elena-rodriguez',
    'Dr. Elena Rodriguez is a leading researcher at the intersection of artificial intelligence and drug discovery.',
    ARRAY['AI Drug Discovery', 'Machine Learning in Medicine', 'Antibiotic Development'],
    '[{"degree": "Ph.D. in Computer Science", "university": "MIT", "year": 2009, "field": "Machine Learning and Bioinformatics"}]'::jsonb,
    '[{"title": "AI-Discovered Antibiotic Compounds for Drug-Resistant Bacteria", "journal": "Nature Medicine", "year": 2024, "citations": 678, "doi": "10.1038/s41591-024-02789-1"}]'::jsonb,
    '[{"name": "Turing Award for AI in Medicine", "year": 2024, "organization": "ACM"}]'::jsonb,
    '{"totalPublications": 98, "totalCitations": 14230, "hIndex": 61}'::jsonb,
    ARRAY['AI-driven antibiotic discovery', 'Machine learning for drug safety'],
    ARRAY['Google DeepMind', 'Pfizer Research'],
    '[{"title": "AI for Global Antibiotic Discovery", "amount": "$5.2M", "agency": "NIH", "year": 2023}]'::jsonb
  );
END $$;

-- Insert site settings
INSERT INTO site_settings (key, value, description) VALUES
('site_name', '"Zanist"', 'Website name'),
('site_description', '"AI-Powered STEM News"', 'Website description'),
('site_url', '"https://zanist.com"', 'Website URL'),
('contact_email', '"contact@zanist.com"', 'Contact email'),
('admin_email', '"admin@zanist.com"', 'Admin email'),
('social_media', '{"twitter": "https://twitter.com/zanist", "facebook": "https://facebook.com/zanist", "linkedin": "https://linkedin.com/company/zanist", "instagram": "https://instagram.com/zanist"}'::jsonb, 'Social media links'),
('appearance', '{"primaryColor": "#dc2626", "secondaryColor": "#1f2937", "logoUrl": "", "faviconUrl": ""}'::jsonb, 'Appearance settings'),
('content_settings', '{"articlesPerPage": 12, "enableComments": true, "moderateComments": true, "enableNewsletter": true}'::jsonb, 'Content settings'),
('seo_settings', '{"metaTitle": "Zanist - AI-Powered STEM News", "metaDescription": "Discover the latest scientific research and breakthroughs from leading universities worldwide.", "metaKeywords": "science, research, STEM, universities, Nobel prizes, technology"}'::jsonb, 'SEO settings');