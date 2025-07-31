const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

const seedCategories = async () => {
  const categories = [
    {
      name: 'Quantum Physics',
      slug: 'quantum-physics',
      description: 'Explore the fundamental nature of matter and energy at the smallest scales.',
      color: '#3b82f6',
      icon: '⚛️'
    },
    {
      name: 'Biotechnology',
      slug: 'biotechnology',
      description: 'Revolutionary advances in genetic engineering and biological systems.',
      color: '#10b981',
      icon: '🧬'
    },
    {
      name: 'Artificial Intelligence',
      slug: 'artificial-intelligence',
      description: 'Cutting-edge developments in machine learning and cognitive computing.',
      color: '#8b5cf6',
      icon: '🤖'
    },
    {
      name: 'Renewable Energy',
      slug: 'renewable-energy',
      description: 'Sustainable energy solutions for a cleaner future.',
      color: '#f59e0b',
      icon: '🌱'
    },
    {
      name: 'Space Science',
      slug: 'space-science',
      description: 'Exploration of the cosmos and space technology development.',
      color: '#6366f1',
      icon: '🚀'
    }
  ];

  const { data, error } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'slug' });

  if (error) {
    console.error('Error seeding categories:', error);
  } else {
    console.log('✅ Categories seeded successfully');
  }

  return data;
};

const seedUniversities = async () => {
  const universities = [
    {
      name: 'Massachusetts Institute of Technology',
      short_name: 'MIT',
      slug: 'mit',
      country: 'United States',
      city: 'Cambridge',
      description: 'A private research university known for its innovation in science and technology.',
      website: 'mit.edu',
      founded: 1861,
      ranking: 1,
      students: 11520,
      professors_count: 1000,
      nobel_prizes: 97,
      total_research: 15000,
      recent_research: 450,
      specialties: ['Engineering', 'Computer Science', 'Physics', 'Economics'],
      stats: {
        acceptanceRate: '7%',
        studentFacultyRatio: '3:1',
        internationalStudents: '33%',
        researchFunding: '$800M'
      },
      contact: {
        address: '77 Massachusetts Avenue, Cambridge, MA 02139',
        phone: '+1 (617) 253-1000',
        email: 'info@mit.edu'
      }
    },
    {
      name: 'Stanford University',
      short_name: 'Stanford',
      slug: 'stanford',
      country: 'United States',
      city: 'Stanford',
      description: 'A leading research university known for its entrepreneurial spirit and innovation.',
      website: 'stanford.edu',
      founded: 1885,
      ranking: 2,
      students: 17000,
      professors_count: 2240,
      nobel_prizes: 84,
      total_research: 12000,
      recent_research: 380,
      specialties: ['Computer Science', 'Medicine', 'Business', 'Engineering'],
      stats: {
        acceptanceRate: '4%',
        studentFacultyRatio: '5:1',
        internationalStudents: '23%',
        researchFunding: '$1.2B'
      },
      contact: {
        address: '450 Serra Mall, Stanford, CA 94305',
        phone: '+1 (650) 723-2300',
        email: 'info@stanford.edu'
      }
    }
  ];

  const { data, error } = await supabase
    .from('universities')
    .upsert(universities, { onConflict: 'slug' });

  if (error) {
    console.error('Error seeding universities:', error);
  } else {
    console.log('✅ Universities seeded successfully');
  }

  return data;
};

const seedSiteSettings = async () => {
  const settings = [
    {
      key: 'site_name',
      value: 'Zanist',
      description: 'Website name'
    },
    {
      key: 'site_description',
      value: 'AI-Powered STEM News',
      description: 'Website description'
    },
    {
      key: 'contact_email',
      value: 'contact@zanist.com',
      description: 'Contact email'
    },
    {
      key: 'social_media',
      value: {
        twitter: 'https://twitter.com/zanist',
        facebook: 'https://facebook.com/zanist',
        linkedin: 'https://linkedin.com/company/zanist',
        instagram: 'https://instagram.com/zanist'
      },
      description: 'Social media links'
    },
    {
      key: 'appearance',
      value: {
        primaryColor: '#dc2626',
        secondaryColor: '#1f2937'
      },
      description: 'Appearance settings'
    }
  ];

  for (const setting of settings) {
    const { error } = await supabase
      .from('site_settings')
      .upsert(setting, { onConflict: 'key' });

    if (error) {
      console.error(`Error seeding setting ${setting.key}:`, error);
    }
  }

  console.log('✅ Site settings seeded successfully');
};

const runSeed = async () => {
  console.log('🌱 Starting database seeding...');
  
  try {
    await seedCategories();
    await seedUniversities();
    await seedSiteSettings();
    
    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  runSeed();
}

module.exports = {
  seedCategories,
  seedUniversities,
  seedSiteSettings,
  runSeed
};