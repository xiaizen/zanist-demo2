export interface University {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  country: string;
  city: string;
  ranking: number;
  nobelPrizes: number;
  totalResearch: number;
  recentResearch: number;
  professors: number;
  students: number;
  founded: number;
  website: string;
  logo: string;
  description: string;
  specialties: string[];
  latestResearch: string[];
  stats: {
    acceptanceRate: string;
    studentFacultyRatio: string;
    internationalStudents: string;
    researchFunding: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
  };
}

export const top50Universities: University[] = [
  {
    id: '1',
    name: 'Massachusetts Institute of Technology',
    shortName: 'MIT',
    slug: 'mit',
    country: 'United States',
    city: 'Cambridge, MA',
    ranking: 1,
    nobelPrizes: 97,
    totalResearch: 1250,
    recentResearch: 45,
    professors: 680,
    students: 11500,
    founded: 1861,
    website: 'mit.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/MIT-Logo.png',
    description: 'Leading institution in technology, engineering, and scientific research.',
    specialties: ['Engineering', 'Computer Science', 'Physics', 'Economics'],
    latestResearch: [
      'Quantum Computing Breakthrough in Error Correction',
      'Revolutionary Battery Technology for Electric Vehicles',
      'AI-Powered Drug Discovery Platform'
    ],
    stats: {
      acceptanceRate: '7%',
      studentFacultyRatio: '3:1',
      internationalStudents: '33%',
      researchFunding: '$750M'
    },
    contact: {
      address: '77 Massachusetts Avenue, Cambridge, MA 02139',
      phone: '+1 (617) 253-1000',
      email: 'info@mit.edu'
    }
  },
  {
    id: '2',
    name: 'Stanford University',
    shortName: 'Stanford',
    slug: 'stanford',
    country: 'United States',
    city: 'Stanford, CA',
    ranking: 2,
    nobelPrizes: 84,
    totalResearch: 980,
    recentResearch: 38,
    professors: 540,
    students: 17000,
    founded: 1885,
    website: 'stanford.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Stanford-Logo.png',
    description: 'Premier research university known for innovation and entrepreneurship.',
    specialties: ['Computer Science', 'Medicine', 'Business', 'Engineering'],
    latestResearch: [
      'CRISPR Gene Editing Advances',
      'Sustainable Energy Storage Solutions',
      'Machine Learning in Healthcare'
    ],
    stats: {
      acceptanceRate: '4%',
      studentFacultyRatio: '5:1',
      internationalStudents: '22%',
      researchFunding: '$1.2B'
    },
    contact: {
      address: '450 Serra Mall, Stanford, CA 94305',
      phone: '+1 (650) 723-2300',
      email: 'info@stanford.edu'
    }
  },
  {
    id: '3',
    name: 'Harvard University',
    shortName: 'Harvard',
    slug: 'harvard',
    country: 'United States',
    city: 'Cambridge, MA',
    ranking: 3,
    nobelPrizes: 161,
    totalResearch: 1100,
    recentResearch: 42,
    professors: 720,
    students: 23000,
    founded: 1636,
    website: 'harvard.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2020/06/Harvard-Logo.png',
    description: 'Oldest institution of higher education in the United States.',
    specialties: ['Medicine', 'Law', 'Business', 'Liberal Arts'],
    latestResearch: [
      'Cancer Immunotherapy Breakthroughs',
      'Climate Change Mitigation Strategies',
      'Neuroscience and Brain Mapping'
    ],
    stats: {
      acceptanceRate: '3%',
      studentFacultyRatio: '6:1',
      internationalStudents: '25%',
      researchFunding: '$900M'
    },
    contact: {
      address: 'Massachusetts Hall, Cambridge, MA 02138',
      phone: '+1 (617) 495-1000',
      email: 'info@harvard.edu'
    }
  },
  {
    id: '4',
    name: 'California Institute of Technology',
    shortName: 'Caltech',
    slug: 'caltech',
    country: 'United States',
    city: 'Pasadena, CA',
    ranking: 4,
    nobelPrizes: 76,
    totalResearch: 650,
    recentResearch: 28,
    professors: 300,
    students: 2200,
    founded: 1891,
    website: 'caltech.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Caltech-Logo.png',
    description: 'World-renowned science and engineering research university.',
    specialties: ['Physics', 'Astronomy', 'Engineering', 'Chemistry'],
    latestResearch: [
      'Gravitational Wave Detection Advances',
      'Solar Cell Efficiency Breakthrough',
      'Mars Exploration Technology'
    ],
    stats: {
      acceptanceRate: '6%',
      studentFacultyRatio: '3:1',
      internationalStudents: '27%',
      researchFunding: '$400M'
    },
    contact: {
      address: '1200 E California Blvd, Pasadena, CA 91125',
      phone: '+1 (626) 395-6811',
      email: 'info@caltech.edu'
    }
  },
  {
    id: '5',
    name: 'University of Oxford',
    shortName: 'Oxford',
    slug: 'oxford',
    country: 'United Kingdom',
    city: 'Oxford',
    ranking: 5,
    nobelPrizes: 72,
    totalResearch: 890,
    recentResearch: 35,
    professors: 580,
    students: 24000,
    founded: 1096,
    website: 'ox.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Oxford-Logo.png',
    description: 'One of the oldest and most prestigious universities in the world.',
    specialties: ['Medicine', 'Literature', 'Philosophy', 'History'],
    latestResearch: [
      'COVID-19 Vaccine Development',
      'Artificial Intelligence Ethics',
      'Medieval History Archives'
    ],
    stats: {
      acceptanceRate: '17%',
      studentFacultyRatio: '11:1',
      internationalStudents: '41%',
      researchFunding: '£600M'
    },
    contact: {
      address: 'University Offices, Wellington Square, Oxford OX1 2JD',
      phone: '+44 1865 270000',
      email: 'enquiries@ox.ac.uk'
    }
  },
  {
    id: '6',
    name: 'University of Cambridge',
    shortName: 'Cambridge',
    slug: 'cambridge',
    country: 'United Kingdom',
    city: 'Cambridge',
    ranking: 6,
    nobelPrizes: 121,
    totalResearch: 820,
    recentResearch: 32,
    professors: 520,
    students: 21000,
    founded: 1209,
    website: 'cam.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Cambridge-Logo.png',
    description: 'Historic university with cutting-edge research across all disciplines.',
    specialties: ['Mathematics', 'Physics', 'Engineering', 'Natural Sciences'],
    latestResearch: [
      'Quantum Computing Applications',
      'Climate Science Modeling',
      'Biotechnology Innovations'
    ],
    stats: {
      acceptanceRate: '21%',
      studentFacultyRatio: '12:1',
      internationalStudents: '38%',
      researchFunding: '£500M'
    },
    contact: {
      address: 'The Old Schools, Trinity Lane, Cambridge CB2 1TN',
      phone: '+44 1223 337733',
      email: 'enquiries@cam.ac.uk'
    }
  },
  {
    id: '7',
    name: 'ETH Zurich',
    shortName: 'ETH Zurich',
    slug: 'eth-zurich',
    country: 'Switzerland',
    city: 'Zurich',
    ranking: 7,
    nobelPrizes: 32,
    totalResearch: 720,
    recentResearch: 29,
    professors: 450,
    students: 22000,
    founded: 1855,
    website: 'ethz.ch',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/ETH-Zurich-Logo.png',
    description: 'Leading European university for technology and natural sciences.',
    specialties: ['Engineering', 'Computer Science', 'Mathematics', 'Physics'],
    latestResearch: [
      'Robotics and Automation',
      'Sustainable Materials',
      'Quantum Technologies'
    ],
    stats: {
      acceptanceRate: '8%',
      studentFacultyRatio: '14:1',
      internationalStudents: '40%',
      researchFunding: 'CHF 1.8B'
    },
    contact: {
      address: 'Rämistrasse 101, 8092 Zürich, Switzerland',
      phone: '+41 44 632 11 11',
      email: 'info@ethz.ch'
    }
  },
  {
    id: '8',
    name: 'University College London',
    shortName: 'UCL',
    slug: 'ucl',
    country: 'United Kingdom',
    city: 'London',
    ranking: 8,
    nobelPrizes: 35,
    totalResearch: 950,
    recentResearch: 41,
    professors: 650,
    students: 42000,
    founded: 1826,
    website: 'ucl.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/UCL-Logo.png',
    description: 'London\'s leading multidisciplinary university.',
    specialties: ['Medicine', 'Engineering', 'Architecture', 'Social Sciences'],
    latestResearch: [
      'Brain-Computer Interfaces',
      'Urban Planning Innovation',
      'Medical Imaging Advances'
    ],
    stats: {
      acceptanceRate: '63%',
      studentFacultyRatio: '10:1',
      internationalStudents: '48%',
      researchFunding: '£400M'
    },
    contact: {
      address: 'Gower Street, London WC1E 6BT',
      phone: '+44 20 7679 2000',
      email: 'enquiries@ucl.ac.uk'
    }
  },
  {
    id: '9',
    name: 'Imperial College London',
    shortName: 'Imperial',
    slug: 'imperial',
    country: 'United Kingdom',
    city: 'London',
    ranking: 9,
    nobelPrizes: 14,
    totalResearch: 680,
    recentResearch: 31,
    professors: 380,
    students: 17000,
    founded: 1907,
    website: 'imperial.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Imperial-College-London-Logo.png',
    description: 'Science, engineering, medicine and business university.',
    specialties: ['Engineering', 'Medicine', 'Natural Sciences', 'Business'],
    latestResearch: [
      'Clean Energy Technologies',
      'Pandemic Preparedness',
      'Space Technology'
    ],
    stats: {
      acceptanceRate: '14%',
      studentFacultyRatio: '11:1',
      internationalStudents: '59%',
      researchFunding: '£350M'
    },
    contact: {
      address: 'South Kensington Campus, London SW7 2AZ',
      phone: '+44 20 7589 5111',
      email: 'info@imperial.ac.uk'
    }
  },
  {
    id: '10',
    name: 'University of Chicago',
    shortName: 'UChicago',
    slug: 'uchicago',
    country: 'United States',
    city: 'Chicago, IL',
    ranking: 10,
    nobelPrizes: 92,
    totalResearch: 780,
    recentResearch: 34,
    professors: 520,
    students: 16000,
    founded: 1890,
    website: 'uchicago.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Chicago-Logo.png',
    description: 'Private research university known for rigorous academics.',
    specialties: ['Economics', 'Physics', 'Medicine', 'Social Sciences'],
    latestResearch: [
      'Economic Policy Research',
      'Particle Physics Discoveries',
      'Social Behavior Studies'
    ],
    stats: {
      acceptanceRate: '7%',
      studentFacultyRatio: '5:1',
      internationalStudents: '21%',
      researchFunding: '$450M'
    },
    contact: {
      address: '5801 S Ellis Ave, Chicago, IL 60637',
      phone: '+1 (773) 702-1234',
      email: 'info@uchicago.edu'
    }
  },
  {
    id: '11',
    name: 'National University of Singapore',
    shortName: 'NUS',
    slug: 'nus',
    country: 'Singapore',
    city: 'Singapore',
    ranking: 11,
    nobelPrizes: 3,
    totalResearch: 890,
    recentResearch: 45,
    professors: 580,
    students: 38000,
    founded: 1905,
    website: 'nus.edu.sg',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/NUS-Logo.png',
    description: 'Leading global university centered in Asia.',
    specialties: ['Engineering', 'Business', 'Medicine', 'Computer Science'],
    latestResearch: [
      'Smart City Technologies',
      'Tropical Medicine Research',
      'Sustainable Urban Development'
    ],
    stats: {
      acceptanceRate: '5%',
      studentFacultyRatio: '12:1',
      internationalStudents: '30%',
      researchFunding: 'S$2.8B'
    },
    contact: {
      address: '21 Lower Kent Ridge Rd, Singapore 119077',
      phone: '+65 6516 6666',
      email: 'contact@nus.edu.sg'
    }
  },
  {
    id: '12',
    name: 'Peking University',
    shortName: 'PKU',
    slug: 'peking',
    country: 'China',
    city: 'Beijing',
    ranking: 12,
    nobelPrizes: 8,
    totalResearch: 1200,
    recentResearch: 52,
    professors: 890,
    students: 45000,
    founded: 1898,
    website: 'pku.edu.cn',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Peking-University-Logo.png',
    description: 'China\'s premier comprehensive university.',
    specialties: ['Liberal Arts', 'Sciences', 'Medicine', 'Engineering'],
    latestResearch: [
      'Ancient Chinese Literature Studies',
      'Advanced Materials Science',
      'Environmental Protection Technology'
    ],
    stats: {
      acceptanceRate: '0.1%',
      studentFacultyRatio: '8:1',
      internationalStudents: '15%',
      researchFunding: '¥8.5B'
    },
    contact: {
      address: 'No.5 Yiheyuan Road Haidian District, Beijing',
      phone: '+86 10 6275 1230',
      email: 'admission@pku.edu.cn'
    }
  },
  {
    id: '13',
    name: 'University of Pennsylvania',
    shortName: 'UPenn',
    slug: 'upenn',
    country: 'United States',
    city: 'Philadelphia, PA',
    ranking: 13,
    nobelPrizes: 25,
    totalResearch: 850,
    recentResearch: 38,
    professors: 650,
    students: 25000,
    founded: 1740,
    website: 'upenn.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Pennsylvania-Logo.png',
    description: 'Ivy League university with strong professional schools.',
    specialties: ['Business', 'Medicine', 'Engineering', 'Social Sciences'],
    latestResearch: [
      'mRNA Vaccine Technology',
      'Financial Innovation Research',
      'Precision Medicine Advances'
    ],
    stats: {
      acceptanceRate: '6%',
      studentFacultyRatio: '6:1',
      internationalStudents: '20%',
      researchFunding: '$1.1B'
    },
    contact: {
      address: '3451 Walnut Street, Philadelphia, PA 19104',
      phone: '+1 (215) 898-5000',
      email: 'info@upenn.edu'
    }
  },
  {
    id: '14',
    name: 'Tsinghua University',
    shortName: 'Tsinghua',
    slug: 'tsinghua',
    country: 'China',
    city: 'Beijing',
    ranking: 14,
    nobelPrizes: 2,
    totalResearch: 1150,
    recentResearch: 48,
    professors: 780,
    students: 48000,
    founded: 1911,
    website: 'tsinghua.edu.cn',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Tsinghua-University-Logo.png',
    description: 'China\'s leading university in engineering and technology.',
    specialties: ['Engineering', 'Computer Science', 'Architecture', 'Management'],
    latestResearch: [
      'AI and Machine Learning',
      'Clean Energy Technology',
      'Advanced Manufacturing'
    ],
    stats: {
      acceptanceRate: '0.03%',
      studentFacultyRatio: '9:1',
      internationalStudents: '12%',
      researchFunding: '¥9.2B'
    },
    contact: {
      address: 'Haidian District, Beijing 100084, China',
      phone: '+86 10 6278 2048',
      email: 'admission@tsinghua.edu.cn'
    }
  },
  {
    id: '15',
    name: 'University of Edinburgh',
    shortName: 'Edinburgh',
    slug: 'edinburgh',
    country: 'United Kingdom',
    city: 'Edinburgh',
    ranking: 15,
    nobelPrizes: 19,
    totalResearch: 720,
    recentResearch: 35,
    professors: 480,
    students: 35000,
    founded: 1582,
    website: 'ed.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Edinburgh-Logo.png',
    description: 'Scotland\'s premier university with global reputation.',
    specialties: ['Medicine', 'Veterinary Medicine', 'Engineering', 'Arts'],
    latestResearch: [
      'Veterinary Genomics',
      'Renewable Energy Systems',
      'Digital Humanities'
    ],
    stats: {
      acceptanceRate: '40%',
      studentFacultyRatio: '13:1',
      internationalStudents: '45%',
      researchFunding: '£280M'
    },
    contact: {
      address: 'Old College, South Bridge, Edinburgh EH8 9YL',
      phone: '+44 131 650 1000',
      email: 'communications.office@ed.ac.uk'
    }
  },
  {
    id: '16',
    name: 'King\'s College London',
    shortName: 'KCL',
    slug: 'kcl',
    country: 'United Kingdom',
    city: 'London',
    ranking: 16,
    nobelPrizes: 12,
    totalResearch: 680,
    recentResearch: 32,
    professors: 420,
    students: 31000,
    founded: 1829,
    website: 'kcl.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Kings-College-London-Logo.png',
    description: 'Research-led university in the heart of London.',
    specialties: ['Medicine', 'Dentistry', 'Law', 'Humanities'],
    latestResearch: [
      'Mental Health Research',
      'Cancer Treatment Innovation',
      'Legal Technology'
    ],
    stats: {
      acceptanceRate: '13%',
      studentFacultyRatio: '12:1',
      internationalStudents: '40%',
      researchFunding: '£200M'
    },
    contact: {
      address: 'Strand, London WC2R 2LS',
      phone: '+44 20 7836 5454',
      email: 'info@kcl.ac.uk'
    }
  },
  {
    id: '17',
    name: 'London School of Economics',
    shortName: 'LSE',
    slug: 'lse',
    country: 'United Kingdom',
    city: 'London',
    ranking: 17,
    nobelPrizes: 18,
    totalResearch: 450,
    recentResearch: 28,
    professors: 320,
    students: 12000,
    founded: 1895,
    website: 'lse.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/LSE-Logo.png',
    description: 'World\'s leading social science institution.',
    specialties: ['Economics', 'Political Science', 'Sociology', 'Law'],
    latestResearch: [
      'Global Economic Policy',
      'Social Inequality Studies',
      'Political Behavior Analysis'
    ],
    stats: {
      acceptanceRate: '8%',
      studentFacultyRatio: '12:1',
      internationalStudents: '70%',
      researchFunding: '£150M'
    },
    contact: {
      address: 'Houghton Street, London WC2A 2AE',
      phone: '+44 20 7405 7686',
      email: 'info@lse.ac.uk'
    }
  },
  {
    id: '18',
    name: 'University of Tokyo',
    shortName: 'UTokyo',
    slug: 'utokyo',
    country: 'Japan',
    city: 'Tokyo',
    ranking: 18,
    nobelPrizes: 11,
    totalResearch: 980,
    recentResearch: 42,
    professors: 680,
    students: 28000,
    founded: 1877,
    website: 'u-tokyo.ac.jp',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Tokyo-Logo.png',
    description: 'Japan\'s most prestigious university.',
    specialties: ['Engineering', 'Medicine', 'Law', 'Sciences'],
    latestResearch: [
      'Robotics and AI',
      'Earthquake Engineering',
      'Materials Science'
    ],
    stats: {
      acceptanceRate: '3%',
      studentFacultyRatio: '8:1',
      internationalStudents: '15%',
      researchFunding: '¥220B'
    },
    contact: {
      address: '7-3-1 Hongo, Bunkyo-ku, Tokyo 113-8654',
      phone: '+81 3 3812 2111',
      email: 'info@u-tokyo.ac.jp'
    }
  },
  {
    id: '19',
    name: 'University of Michigan',
    shortName: 'UMich',
    slug: 'umich',
    country: 'United States',
    city: 'Ann Arbor, MI',
    ranking: 19,
    nobelPrizes: 25,
    totalResearch: 920,
    recentResearch: 41,
    professors: 720,
    students: 47000,
    founded: 1817,
    website: 'umich.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Michigan-Logo.png',
    description: 'Leading public research university.',
    specialties: ['Engineering', 'Business', 'Medicine', 'Public Policy'],
    latestResearch: [
      'Autonomous Vehicle Technology',
      'Public Health Innovation',
      'Sustainable Engineering'
    ],
    stats: {
      acceptanceRate: '23%',
      studentFacultyRatio: '15:1',
      internationalStudents: '17%',
      researchFunding: '$1.5B'
    },
    contact: {
      address: '500 S State St, Ann Arbor, MI 48109',
      phone: '+1 (734) 764-1817',
      email: 'info@umich.edu'
    }
  },
  {
    id: '20',
    name: 'Johns Hopkins University',
    shortName: 'JHU',
    slug: 'jhu',
    country: 'United States',
    city: 'Baltimore, MD',
    ranking: 20,
    nobelPrizes: 37,
    totalResearch: 850,
    recentResearch: 39,
    professors: 580,
    students: 24000,
    founded: 1876,
    website: 'jhu.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Johns-Hopkins-University-Logo.png',
    description: 'Premier research university and medical institution.',
    specialties: ['Medicine', 'Public Health', 'Engineering', 'International Studies'],
    latestResearch: [
      'COVID-19 Research',
      'Biomedical Engineering',
      'Space Telescope Technology'
    ],
    stats: {
      acceptanceRate: '11%',
      studentFacultyRatio: '7:1',
      internationalStudents: '25%',
      researchFunding: '$2.5B'
    },
    contact: {
      address: '3400 N Charles St, Baltimore, MD 21218',
      phone: '+1 (410) 516-8000',
      email: 'info@jhu.edu'
    }
  },
  {
    id: '21',
    name: 'University of California, Berkeley',
    shortName: 'UC Berkeley',
    slug: 'uc-berkeley',
    country: 'United States',
    city: 'Berkeley, CA',
    ranking: 21,
    nobelPrizes: 25,
    totalResearch: 1100,
    recentResearch: 48,
    professors: 890,
    students: 45000,
    founded: 1868,
    website: 'berkeley.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/UC-Berkeley-Logo.png',
    description: 'Top public research university.',
    specialties: ['Engineering', 'Computer Science', 'Business', 'Law'],
    latestResearch: [
      'CRISPR Gene Editing',
      'Artificial Intelligence',
      'Climate Science'
    ],
    stats: {
      acceptanceRate: '17%',
      studentFacultyRatio: '19:1',
      internationalStudents: '16%',
      researchFunding: '$900M'
    },
    contact: {
      address: 'Berkeley, CA 94720',
      phone: '+1 (510) 642-6000',
      email: 'info@berkeley.edu'
    }
  },
  {
    id: '22',
    name: 'University of Toronto',
    shortName: 'UofT',
    slug: 'uoft',
    country: 'Canada',
    city: 'Toronto, ON',
    ranking: 22,
    nobelPrizes: 10,
    totalResearch: 980,
    recentResearch: 44,
    professors: 720,
    students: 97000,
    founded: 1827,
    website: 'utoronto.ca',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Toronto-Logo.png',
    description: 'Canada\'s leading research university.',
    specialties: ['Medicine', 'Engineering', 'Business', 'Arts & Science'],
    latestResearch: [
      'Deep Learning Advances',
      'Stem Cell Research',
      'Urban Planning Innovation'
    ],
    stats: {
      acceptanceRate: '43%',
      studentFacultyRatio: '18:1',
      internationalStudents: '25%',
      researchFunding: 'CAD $1.3B'
    },
    contact: {
      address: '27 King\'s College Cir, Toronto, ON M5S 1A1',
      phone: '+1 (416) 978-2011',
      email: 'info@utoronto.ca'
    }
  },
  {
    id: '23',
    name: 'McGill University',
    shortName: 'McGill',
    slug: 'mcgill',
    country: 'Canada',
    city: 'Montreal, QC',
    ranking: 23,
    nobelPrizes: 12,
    totalResearch: 720,
    recentResearch: 35,
    professors: 580,
    students: 40000,
    founded: 1821,
    website: 'mcgill.ca',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/McGill-University-Logo.png',
    description: 'Canada\'s global university.',
    specialties: ['Medicine', 'Law', 'Engineering', 'Management'],
    latestResearch: [
      'Neuroscience Research',
      'Sustainable Development',
      'Arctic Studies'
    ],
    stats: {
      acceptanceRate: '46%',
      studentFacultyRatio: '16:1',
      internationalStudents: '30%',
      researchFunding: 'CAD $600M'
    },
    contact: {
      address: '845 Sherbrooke St W, Montreal, QC H3A 0G4',
      phone: '+1 (514) 398-4455',
      email: 'info@mcgill.ca'
    }
  },
  {
    id: '24',
    name: 'Australian National University',
    shortName: 'ANU',
    slug: 'anu',
    country: 'Australia',
    city: 'Canberra, ACT',
    ranking: 24,
    nobelPrizes: 6,
    totalResearch: 650,
    recentResearch: 32,
    professors: 420,
    students: 25000,
    founded: 1946,
    website: 'anu.edu.au',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/ANU-Logo.png',
    description: 'Australia\'s national research university.',
    specialties: ['Political Science', 'International Relations', 'Physics', 'Economics'],
    latestResearch: [
      'Climate Change Research',
      'Asia-Pacific Studies',
      'Quantum Physics'
    ],
    stats: {
      acceptanceRate: '35%',
      studentFacultyRatio: '14:1',
      internationalStudents: '42%',
      researchFunding: 'AUD $400M'
    },
    contact: {
      address: 'Acton ACT 2601, Australia',
      phone: '+61 2 6125 5111',
      email: 'info@anu.edu.au'
    }
  },
  {
    id: '25',
    name: 'University of Manchester',
    shortName: 'Manchester',
    slug: 'manchester',
    country: 'United Kingdom',
    city: 'Manchester',
    ranking: 25,
    nobelPrizes: 25,
    totalResearch: 780,
    recentResearch: 38,
    professors: 520,
    students: 40000,
    founded: 1824,
    website: 'manchester.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Manchester-Logo.png',
    description: 'Major research university in northern England.',
    specialties: ['Engineering', 'Medicine', 'Business', 'Computer Science'],
    latestResearch: [
      'Graphene Applications',
      'Cancer Research',
      'Advanced Materials'
    ],
    stats: {
      acceptanceRate: '56%',
      studentFacultyRatio: '14:1',
      internationalStudents: '40%',
      researchFunding: '£250M'
    },
    contact: {
      address: 'Oxford Rd, Manchester M13 9PL',
      phone: '+44 161 306 6000',
      email: 'info@manchester.ac.uk'
    }
  },
  {
    id: '26',
    name: 'Northwestern University',
    shortName: 'Northwestern',
    slug: 'northwestern',
    country: 'United States',
    city: 'Evanston, IL',
    ranking: 26,
    nobelPrizes: 19,
    totalResearch: 680,
    recentResearch: 34,
    professors: 480,
    students: 22000,
    founded: 1851,
    website: 'northwestern.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Northwestern-University-Logo.png',
    description: 'Private research university near Chicago.',
    specialties: ['Journalism', 'Engineering', 'Business', 'Medicine'],
    latestResearch: [
      'Nanotechnology',
      'Biomedical Engineering',
      'Media Studies'
    ],
    stats: {
      acceptanceRate: '9%',
      studentFacultyRatio: '6:1',
      internationalStudents: '18%',
      researchFunding: '$800M'
    },
    contact: {
      address: '633 Clark St, Evanston, IL 60208',
      phone: '+1 (847) 491-3741',
      email: 'info@northwestern.edu'
    }
  },
  {
    id: '27',
    name: 'University of Bristol',
    shortName: 'Bristol',
    slug: 'bristol',
    country: 'United Kingdom',
    city: 'Bristol',
    ranking: 27,
    nobelPrizes: 13,
    totalResearch: 580,
    recentResearch: 29,
    professors: 380,
    students: 27000,
    founded: 1876,
    website: 'bristol.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Bristol-Logo.png',
    description: 'Research-intensive university in southwest England.',
    specialties: ['Engineering', 'Medicine', 'Social Sciences', 'Arts'],
    latestResearch: [
      'Aerospace Engineering',
      'Quantum Technologies',
      'Social Policy Research'
    ],
    stats: {
      acceptanceRate: '13%',
      studentFacultyRatio: '15:1',
      internationalStudents: '28%',
      researchFunding: '£180M'
    },
    contact: {
      address: 'Senate House, Tyndall Ave, Bristol BS8 1TH',
      phone: '+44 117 928 9000',
      email: 'info@bristol.ac.uk'
    }
  },
  {
    id: '28',
    name: 'University of Warwick',
    shortName: 'Warwick',
    slug: 'warwick',
    country: 'United Kingdom',
    city: 'Coventry',
    ranking: 28,
    nobelPrizes: 2,
    totalResearch: 520,
    recentResearch: 26,
    professors: 320,
    students: 27000,
    founded: 1965,
    website: 'warwick.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Warwick-Logo.png',
    description: 'Leading research university in the Midlands.',
    specialties: ['Business', 'Engineering', 'Mathematics', 'Economics'],
    latestResearch: [
      'Manufacturing Technology',
      'Financial Mathematics',
      'Digital Economy'
    ],
    stats: {
      acceptanceRate: '14%',
      studentFacultyRatio: '13:1',
      internationalStudents: '40%',
      researchFunding: '£120M'
    },
    contact: {
      address: 'Gibbet Hill Rd, Coventry CV4 7AL',
      phone: '+44 24 7652 3523',
      email: 'info@warwick.ac.uk'
    }
  },
  {
    id: '29',
    name: 'Technical University of Munich',
    shortName: 'TUM',
    slug: 'tum',
    country: 'Germany',
    city: 'Munich',
    ranking: 29,
    nobelPrizes: 17,
    totalResearch: 750,
    recentResearch: 36,
    professors: 520,
    students: 45000,
    founded: 1868,
    website: 'tum.de',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/TUM-Logo.png',
    description: 'Germany\'s top technical university.',
    specialties: ['Engineering', 'Natural Sciences', 'Medicine', 'Management'],
    latestResearch: [
      'Automotive Technology',
      'Renewable Energy',
      'Biotechnology'
    ],
    stats: {
      acceptanceRate: '8%',
      studentFacultyRatio: '17:1',
      internationalStudents: '35%',
      researchFunding: '€380M'
    },
    contact: {
      address: 'Arcisstraße 21, 80333 München, Germany',
      phone: '+49 89 289 01',
      email: 'info@tum.de'
    }
  },
  {
    id: '30',
    name: 'University of Glasgow',
    shortName: 'Glasgow',
    slug: 'glasgow',
    country: 'United Kingdom',
    city: 'Glasgow',
    ranking: 30,
    nobelPrizes: 7,
    totalResearch: 480,
    recentResearch: 24,
    professors: 350,
    students: 29000,
    founded: 1451,
    website: 'gla.ac.uk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Glasgow-Logo.png',
    description: 'Ancient Scottish university with modern research focus.',
    specialties: ['Medicine', 'Engineering', 'Arts', 'Social Sciences'],
    latestResearch: [
      'Gravitational Wave Research',
      'Veterinary Medicine',
      'Scottish Literature'
    ],
    stats: {
      acceptanceRate: '25%',
      studentFacultyRatio: '16:1',
      internationalStudents: '35%',
      researchFunding: '£200M'
    },
    contact: {
      address: 'University Ave, Glasgow G12 8QQ',
      phone: '+44 141 330 2000',
      email: 'info@gla.ac.uk'
    }
  },
  {
    id: '31',
    name: 'Yale University',
    shortName: 'Yale',
    slug: 'yale',
    country: 'United States',
    city: 'New Haven, CT',
    ranking: 31,
    nobelPrizes: 65,
    totalResearch: 720,
    recentResearch: 35,
    professors: 580,
    students: 13000,
    founded: 1701,
    website: 'yale.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Yale-University-Logo.png',
    description: 'Ivy League university with strong liberal arts tradition.',
    specialties: ['Liberal Arts', 'Medicine', 'Law', 'Drama'],
    latestResearch: [
      'Immunology Research',
      'Environmental Studies',
      'Art History'
    ],
    stats: {
      acceptanceRate: '5%',
      studentFacultyRatio: '6:1',
      internationalStudents: '20%',
      researchFunding: '$650M'
    },
    contact: {
      address: 'New Haven, CT 06520',
      phone: '+1 (203) 432-4771',
      email: 'info@yale.edu'
    }
  },
  {
    id: '32',
    name: 'Columbia University',
    shortName: 'Columbia',
    slug: 'columbia',
    country: 'United States',
    city: 'New York, NY',
    ranking: 32,
    nobelPrizes: 104,
    totalResearch: 890,
    recentResearch: 42,
    professors: 680,
    students: 33000,
    founded: 1754,
    website: 'columbia.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Columbia-University-Logo.png',
    description: 'Ivy League university in Manhattan.',
    specialties: ['Journalism', 'Business', 'Medicine', 'International Affairs'],
    latestResearch: [
      'Climate Science',
      'Journalism Innovation',
      'Urban Studies'
    ],
    stats: {
      acceptanceRate: '4%',
      studentFacultyRatio: '6:1',
      internationalStudents: '35%',
      researchFunding: '$750M'
    },
    contact: {
      address: '116th St & Broadway, New York, NY 10027',
      phone: '+1 (212) 854-1754',
      email: 'info@columbia.edu'
    }
  },
  {
    id: '33',
    name: 'Princeton University',
    shortName: 'Princeton',
    slug: 'princeton',
    country: 'United States',
    city: 'Princeton, NJ',
    ranking: 33,
    nobelPrizes: 69,
    totalResearch: 650,
    recentResearch: 31,
    professors: 520,
    students: 8500,
    founded: 1746,
    website: 'princeton.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Princeton-University-Logo.png',
    description: 'Elite Ivy League research university.',
    specialties: ['Physics', 'Economics', 'Public Policy', 'Engineering'],
    latestResearch: [
      'Plasma Physics',
      'Economic Theory',
      'Computer Science'
    ],
    stats: {
      acceptanceRate: '4%',
      studentFacultyRatio: '5:1',
      internationalStudents: '23%',
      researchFunding: '$400M'
    },
    contact: {
      address: 'Princeton, NJ 08544',
      phone: '+1 (609) 258-3000',
      email: 'info@princeton.edu'
    }
  },
  {
    id: '34',
    name: 'Cornell University',
    shortName: 'Cornell',
    slug: 'cornell',
    country: 'United States',
    city: 'Ithaca, NY',
    ranking: 34,
    nobelPrizes: 58,
    totalResearch: 820,
    recentResearch: 38,
    professors: 650,
    students: 25000,
    founded: 1865,
    website: 'cornell.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Cornell-University-Logo.png',
    description: 'Ivy League university with strong engineering and agriculture programs.',
    specialties: ['Engineering', 'Agriculture', 'Veterinary Medicine', 'Business'],
    latestResearch: [
      'Agricultural Innovation',
      'Veterinary Science',
      'Engineering Research'
    ],
    stats: {
      acceptanceRate: '9%',
      studentFacultyRatio: '9:1',
      internationalStudents: '25%',
      researchFunding: '$900M'
    },
    contact: {
      address: 'Ithaca, NY 14853',
      phone: '+1 (607) 254-4636',
      email: 'info@cornell.edu'
    }
  },
  {
    id: '35',
    name: 'University of Melbourne',
    shortName: 'Melbourne',
    slug: 'melbourne',
    country: 'Australia',
    city: 'Melbourne, VIC',
    ranking: 35,
    nobelPrizes: 8,
    totalResearch: 750,
    recentResearch: 36,
    professors: 520,
    students: 50000,
    founded: 1853,
    website: 'unimelb.edu.au',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Melbourne-Logo.png',
    description: 'Australia\'s leading comprehensive university.',
    specialties: ['Medicine', 'Law', 'Business', 'Engineering'],
    latestResearch: [
      'Medical Research',
      'Climate Studies',
      'Urban Planning'
    ],
    stats: {
      acceptanceRate: '70%',
      studentFacultyRatio: '18:1',
      internationalStudents: '45%',
      researchFunding: 'AUD $850M'
    },
    contact: {
      address: 'Parkville VIC 3010, Australia',
      phone: '+61 3 9035 5511',
      email: 'info@unimelb.edu.au'
    }
  },
  {
    id: '36',
    name: 'University of Sydney',
    shortName: 'Sydney',
    slug: 'sydney',
    country: 'Australia',
    city: 'Sydney, NSW',
    ranking: 36,
    nobelPrizes: 5,
    totalResearch: 680,
    recentResearch: 33,
    professors: 480,
    students: 52000,
    founded: 1850,
    website: 'sydney.edu.au',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Sydney-Logo.png',
    description: 'Australia\'s first university.',
    specialties: ['Medicine', 'Engineering', 'Arts', 'Business'],
    latestResearch: [
      'Brain Research',
      'Engineering Innovation',
      'Social Sciences'
    ],
    stats: {
      acceptanceRate: '30%',
      studentFacultyRatio: '19:1',
      internationalStudents: '40%',
      researchFunding: 'AUD $600M'
    },
    contact: {
      address: 'Camperdown NSW 2006, Australia',
      phone: '+61 2 9351 2222',
      email: 'info@sydney.edu.au'
    }
  },
  {
    id: '37',
    name: 'University of British Columbia',
    shortName: 'UBC',
    slug: 'ubc',
    country: 'Canada',
    city: 'Vancouver, BC',
    ranking: 37,
    nobelPrizes: 8,
    totalResearch: 720,
    recentResearch: 35,
    professors: 580,
    students: 65000,
    founded: 1908,
    website: 'ubc.ca',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/UBC-Logo.png',
    description: 'Leading Canadian research university.',
    specialties: ['Medicine', 'Engineering', 'Forestry', 'Business'],
    latestResearch: [
      'Forestry Research',
      'Ocean Sciences',
      'Sustainable Development'
    ],
    stats: {
      acceptanceRate: '53%',
      studentFacultyRatio: '17:1',
      internationalStudents: '28%',
      researchFunding: 'CAD $650M'
    },
    contact: {
      address: '2329 West Mall, Vancouver, BC V6T 1Z4',
      phone: '+1 (604) 822-2211',
      email: 'info@ubc.ca'
    }
  },
  {
    id: '38',
    name: 'Nanyang Technological University',
    shortName: 'NTU',
    slug: 'ntu',
    country: 'Singapore',
    city: 'Singapore',
    ranking: 38,
    nobelPrizes: 1,
    totalResearch: 650,
    recentResearch: 32,
    professors: 450,
    students: 33000,
    founded: 1991,
    website: 'ntu.edu.sg',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/NTU-Logo.png',
    description: 'Young and research-intensive university.',
    specialties: ['Engineering', 'Business', 'Science', 'Medicine'],
    latestResearch: [
      'Smart Materials',
      'Artificial Intelligence',
      'Sustainable Energy'
    ],
    stats: {
      acceptanceRate: '15%',
      studentFacultyRatio: '13:1',
      internationalStudents: '25%',
      researchFunding: 'S$800M'
    },
    contact: {
      address: '50 Nanyang Ave, Singapore 639798',
      phone: '+65 6791 1744',
      email: 'info@ntu.edu.sg'
    }
  },
  {
    id: '39',
    name: 'Kyoto University',
    shortName: 'Kyoto',
    slug: 'kyoto',
    country: 'Japan',
    city: 'Kyoto',
    ranking: 39,
    nobelPrizes: 19,
    totalResearch: 680,
    recentResearch: 34,
    professors: 520,
    students: 23000,
    founded: 1897,
    website: 'kyoto-u.ac.jp',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Kyoto-University-Logo.png',
    description: 'Japan\'s second-oldest university.',
    specialties: ['Sciences', 'Medicine', 'Engineering', 'Humanities'],
    latestResearch: [
      'Stem Cell Research',
      'Materials Science',
      'Cultural Studies'
    ],
    stats: {
      acceptanceRate: '4%',
      studentFacultyRatio: '9:1',
      internationalStudents: '10%',
      researchFunding: '¥180B'
    },
    contact: {
      address: 'Yoshida-Honmachi, Sakyo-ku, Kyoto 606-8501',
      phone: '+81 75 753 7531',
      email: 'info@kyoto-u.ac.jp'
    }
  },
  {
    id: '40',
    name: 'Seoul National University',
    shortName: 'SNU',
    slug: 'snu',
    country: 'South Korea',
    city: 'Seoul',
    ranking: 40,
    nobelPrizes: 1,
    totalResearch: 720,
    recentResearch: 36,
    professors: 580,
    students: 28000,
    founded: 1946,
    website: 'snu.ac.kr',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/SNU-Logo.png',
    description: 'South Korea\'s most prestigious university.',
    specialties: ['Engineering', 'Medicine', 'Business', 'Liberal Arts'],
    latestResearch: [
      'Semiconductor Technology',
      'Biomedical Engineering',
      'Korean Studies'
    ],
    stats: {
      acceptanceRate: '2%',
      studentFacultyRatio: '12:1',
      internationalStudents: '15%',
      researchFunding: '₩450B'
    },
    contact: {
      address: '1 Gwanak-ro, Gwanak-gu, Seoul 08826',
      phone: '+82 2 880 5114',
      email: 'info@snu.ac.kr'
    }
  },
  {
    id: '41',
    name: 'University of Hong Kong',
    shortName: 'HKU',
    slug: 'hku',
    country: 'Hong Kong',
    city: 'Hong Kong',
    ranking: 41,
    nobelPrizes: 2,
    totalResearch: 580,
    recentResearch: 29,
    professors: 420,
    students: 29000,
    founded: 1911,
    website: 'hku.hk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/HKU-Logo.png',
    description: 'Hong Kong\'s oldest tertiary institution.',
    specialties: ['Medicine', 'Law', 'Business', 'Engineering'],
    latestResearch: [
      'Medical Research',
      'Financial Technology',
      'Urban Studies'
    ],
    stats: {
      acceptanceRate: '10%',
      studentFacultyRatio: '14:1',
      internationalStudents: '40%',
      researchFunding: 'HK$3.2B'
    },
    contact: {
      address: 'Pokfulam, Hong Kong',
      phone: '+852 2859 2111',
      email: 'info@hku.hk'
    }
  },
  {
    id: '42',
    name: 'University of California, Los Angeles',
    shortName: 'UCLA',
    slug: 'ucla',
    country: 'United States',
    city: 'Los Angeles, CA',
    ranking: 42,
    nobelPrizes: 15,
    totalResearch: 950,
    recentResearch: 44,
    professors: 780,
    students: 45000,
    founded: 1919,
    website: 'ucla.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/UCLA-Logo.png',
    description: 'Public research university in Los Angeles.',
    specialties: ['Medicine', 'Engineering', 'Film', 'Business'],
    latestResearch: [
      'Entertainment Technology',
      'Medical Innovation',
      'Urban Planning'
    ],
    stats: {
      acceptanceRate: '12%',
      studentFacultyRatio: '18:1',
      internationalStudents: '15%',
      researchFunding: '$1.1B'
    },
    contact: {
      address: '405 Hilgard Ave, Los Angeles, CA 90095',
      phone: '+1 (310) 825-4321',
      email: 'info@ucla.edu'
    }
  },
  {
    id: '43',
    name: 'University of New South Wales',
    shortName: 'UNSW',
    slug: 'unsw',
    country: 'Australia',
    city: 'Sydney, NSW',
    ranking: 43,
    nobelPrizes: 1,
    totalResearch: 620,
    recentResearch: 31,
    professors: 450,
    students: 59000,
    founded: 1949,
    website: 'unsw.edu.au',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/UNSW-Logo.png',
    description: 'Leading Australian technological university.',
    specialties: ['Engineering', 'Business', 'Medicine', 'Art & Design'],
    latestResearch: [
      'Solar Cell Technology',
      'Engineering Innovation',
      'Business Analytics'
    ],
    stats: {
      acceptanceRate: '35%',
      studentFacultyRatio: '20:1',
      internationalStudents: '35%',
      researchFunding: 'AUD $400M'
    },
    contact: {
      address: 'High St, Kensington NSW 2052, Australia',
      phone: '+61 2 9385 1000',
      email: 'info@unsw.edu.au'
    }
  },
  {
    id: '44',
    name: 'University of Queensland',
    shortName: 'UQ',
    slug: 'uq',
    country: 'Australia',
    city: 'Brisbane, QLD',
    ranking: 44,
    nobelPrizes: 2,
    totalResearch: 590,
    recentResearch: 30,
    professors: 420,
    students: 52000,
    founded: 1909,
    website: 'uq.edu.au',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/UQ-Logo.png',
    description: 'Queensland\'s oldest university.',
    specialties: ['Medicine', 'Engineering', 'Agriculture', 'Business'],
    latestResearch: [
      'Tropical Medicine',
      'Mining Engineering',
      'Environmental Science'
    ],
    stats: {
      acceptanceRate: '45%',
      studentFacultyRatio: '19:1',
      internationalStudents: '38%',
      researchFunding: 'AUD $500M'
    },
    contact: {
      address: 'St Lucia QLD 4072, Australia',
      phone: '+61 7 3365 1111',
      email: 'info@uq.edu.au'
    }
  },
  {
    id: '45',
    name: 'Monash University',
    shortName: 'Monash',
    slug: 'monash',
    country: 'Australia',
    city: 'Melbourne, VIC',
    ranking: 45,
    nobelPrizes: 1,
    totalResearch: 560,
    recentResearch: 28,
    professors: 400,
    students: 80000,
    founded: 1958,
    website: 'monash.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Monash-University-Logo.png',
    description: 'Large research university in Melbourne.',
    specialties: ['Medicine', 'Engineering', 'Business', 'Pharmacy'],
    latestResearch: [
      'Pharmaceutical Research',
      'Engineering Solutions',
      'Medical Innovation'
    ],
    stats: {
      acceptanceRate: '40%',
      studentFacultyRatio: '22:1',
      internationalStudents: '35%',
      researchFunding: 'AUD $380M'
    },
    contact: {
      address: 'Wellington Rd, Clayton VIC 3800, Australia',
      phone: '+61 3 9905 4000',
      email: 'info@monash.edu'
    }
  },
  {
    id: '46',
    name: 'University of Amsterdam',
    shortName: 'UvA',
    slug: 'uva',
    country: 'Netherlands',
    city: 'Amsterdam',
    ranking: 46,
    nobelPrizes: 6,
    totalResearch: 520,
    recentResearch: 26,
    professors: 380,
    students: 42000,
    founded: 1632,
    website: 'uva.nl',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/UvA-Logo.png',
    description: 'Leading Dutch research university.',
    specialties: ['Social Sciences', 'Humanities', 'Economics', 'Law'],
    latestResearch: [
      'Social Policy Research',
      'European Studies',
      'Digital Humanities'
    ],
    stats: {
      acceptanceRate: '25%',
      studentFacultyRatio: '16:1',
      internationalStudents: '30%',
      researchFunding: '€280M'
    },
    contact: {
      address: 'Spui 21, 1012 WX Amsterdam, Netherlands',
      phone: '+31 20 525 9111',
      email: 'info@uva.nl'
    }
  },
  {
    id: '47',
    name: 'Delft University of Technology',
    shortName: 'TU Delft',
    slug: 'tu-delft',
    country: 'Netherlands',
    city: 'Delft',
    ranking: 47,
    nobelPrizes: 3,
    totalResearch: 480,
    recentResearch: 24,
    professors: 350,
    students: 26000,
    founded: 1842,
    website: 'tudelft.nl',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/TU-Delft-Logo.png',
    description: 'Leading technical university in the Netherlands.',
    specialties: ['Engineering', 'Technology', 'Applied Sciences', 'Architecture'],
    latestResearch: [
      'Aerospace Engineering',
      'Water Management',
      'Sustainable Technology'
    ],
    stats: {
      acceptanceRate: '20%',
      studentFacultyRatio: '15:1',
      internationalStudents: '35%',
      researchFunding: '€320M'
    },
    contact: {
      address: 'Stevinweg 1, 2628 CN Delft, Netherlands',
      phone: '+31 15 278 9111',
      email: 'info@tudelft.nl'
    }
  },
  {
    id: '48',
    name: 'University of Copenhagen',
    shortName: 'UCPH',
    slug: 'ucph',
    country: 'Denmark',
    city: 'Copenhagen',
    ranking: 48,
    nobelPrizes: 9,
    totalResearch: 550,
    recentResearch: 27,
    professors: 420,
    students: 37000,
    founded: 1479,
    website: 'ku.dk',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Copenhagen-Logo.png',
    description: 'Denmark\'s oldest and largest university.',
    specialties: ['Medicine', 'Natural Sciences', 'Humanities', 'Social Sciences'],
    latestResearch: [
      'Climate Research',
      'Medical Innovation',
      'Nordic Studies'
    ],
    stats: {
      acceptanceRate: '30%',
      studentFacultyRatio: '14:1',
      internationalStudents: '20%',
      researchFunding: 'DKK 4.2B'
    },
    contact: {
      address: 'Nørregade 10, 1165 København K, Denmark',
      phone: '+45 35 32 26 26',
      email: 'info@ku.dk'
    }
  },
  {
    id: '49',
    name: 'Karolinska Institute',
    shortName: 'KI',
    slug: 'ki',
    country: 'Sweden',
    city: 'Stockholm',
    ranking: 49,
    nobelPrizes: 5,
    totalResearch: 420,
    recentResearch: 22,
    professors: 280,
    students: 8000,
    founded: 1810,
    website: 'ki.se',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/Karolinska-Institute-Logo.png',
    description: 'Leading medical university in Sweden.',
    specialties: ['Medicine', 'Health Sciences', 'Dentistry', 'Pharmacy'],
    latestResearch: [
      'Medical Research',
      'Public Health',
      'Pharmaceutical Sciences'
    ],
    stats: {
      acceptanceRate: '15%',
      studentFacultyRatio: '10:1',
      internationalStudents: '25%',
      researchFunding: 'SEK 3.8B'
    },
    contact: {
      address: '171 77 Stockholm, Sweden',
      phone: '+46 8 524 800 00',
      email: 'info@ki.se'
    }
  },
  {
    id: '50',
    name: 'University of Wisconsin-Madison',
    shortName: 'UW-Madison',
    slug: 'uw-madison',
    country: 'United States',
    city: 'Madison, WI',
    ranking: 50,
    nobelPrizes: 25,
    totalResearch: 820,
    recentResearch: 38,
    professors: 650,
    students: 47000,
    founded: 1848,
    website: 'wisc.edu',
    logo: 'https://logos-world.net/wp-content/uploads/2021/01/University-of-Wisconsin-Madison-Logo.png',
    description: 'Leading public research university in the Midwest.',
    specialties: ['Agriculture', 'Engineering', 'Medicine', 'Business'],
    latestResearch: [
      'Stem Cell Research',
      'Agricultural Innovation',
      'Environmental Studies'
    ],
    stats: {
      acceptanceRate: '54%',
      studentFacultyRatio: '17:1',
      internationalStudents: '13%',
      researchFunding: '$1.2B'
    },
    contact: {
      address: '500 Lincoln Dr, Madison, WI 53706',
      phone: '+1 (608) 262-1234',
      email: 'info@wisc.edu'
    }
  }
];

export interface Country {
  name: string;
  slug: string;
  flag: string;
  universities: number;
  totalResearch: number;
  nobelPrizes: number;
  topUniversities: string[];
  description: string;
}

export const countries: Country[] = [
  {
    name: 'United States',
    slug: 'united-states',
    flag: 'https://flagcdn.com/w320/us.png',
    universities: 25,
    totalResearch: 15420,
    nobelPrizes: 892,
    topUniversities: ['MIT', 'Stanford', 'Harvard', 'Caltech', 'UChicago'],
    description: 'Home to the world\'s leading research universities and innovation centers.'
  },
  {
    name: 'United Kingdom',
    slug: 'united-kingdom',
    flag: 'https://flagcdn.com/w320/gb.png',
    universities: 8,
    totalResearch: 6240,
    nobelPrizes: 342,
    topUniversities: ['Oxford', 'Cambridge', 'UCL', 'Imperial'],
    description: 'Historic centers of learning with centuries of academic excellence.'
  },
  {
    name: 'Switzerland',
    slug: 'switzerland',
    flag: 'https://flagcdn.com/w320/ch.png',
    universities: 3,
    totalResearch: 1890,
    nobelPrizes: 45,
    topUniversities: ['ETH Zurich', 'EPFL'],
    description: 'Leading European institutions in science and technology.'
  },
  {
    name: 'Germany',
    slug: 'germany',
    flag: 'https://flagcdn.com/w320/de.png',
    universities: 4,
    totalResearch: 3420,
    nobelPrizes: 156,
    topUniversities: ['TU Munich', 'Heidelberg', 'Max Planck'],
    description: 'Strong tradition in engineering, physics, and research excellence.'
  },
  {
    name: 'Canada',
    slug: 'canada',
    flag: 'https://flagcdn.com/w320/ca.png',
    universities: 3,
    totalResearch: 2180,
    nobelPrizes: 67,
    topUniversities: ['University of Toronto', 'McGill', 'UBC'],
    description: 'Leading North American research institutions.'
  },
  {
    name: 'Australia',
    slug: 'australia',
    flag: 'https://flagcdn.com/w320/au.png',
    universities: 6,
    totalResearch: 3560,
    nobelPrizes: 34,
    topUniversities: ['University of Melbourne', 'ANU', 'Sydney', 'UNSW'],
    description: 'Premier research universities in the Asia-Pacific region.'
  },
  {
    name: 'Singapore',
    slug: 'singapore',
    flag: 'https://flagcdn.com/w320/sg.png',
    universities: 2,
    totalResearch: 980,
    nobelPrizes: 12,
    topUniversities: ['NUS', 'NTU'],
    description: 'Rising Asian research powerhouses in technology and innovation.'
  },
  {
    name: 'Japan',
    slug: 'japan',
    flag: 'https://flagcdn.com/w320/jp.png',
    universities: 2,
    totalResearch: 1660,
    nobelPrizes: 89,
    topUniversities: ['University of Tokyo', 'Kyoto University'],
    description: 'Leading Asian institutions with strong research traditions.'
  },
  {
    name: 'China',
    slug: 'china',
    flag: 'https://flagcdn.com/w320/cn.png',
    universities: 2,
    totalResearch: 2350,
    nobelPrizes: 10,
    topUniversities: ['Peking University', 'Tsinghua University'],
    description: 'Rapidly advancing research institutions with global impact.'
  },
  {
    name: 'Netherlands',
    slug: 'netherlands',
    flag: 'https://flagcdn.com/w320/nl.png',
    universities: 2,
    totalResearch: 1000,
    nobelPrizes: 9,
    topUniversities: ['University of Amsterdam', 'TU Delft'],
    description: 'Innovative Dutch universities leading in technology and social sciences.'
  },
  {
    name: 'South Korea',
    slug: 'south-korea',
    flag: 'https://flagcdn.com/w320/kr.png',
    universities: 1,
    totalResearch: 720,
    nobelPrizes: 1,
    topUniversities: ['Seoul National University'],
    description: 'Rapidly emerging research powerhouse in Asia.'
  },
  {
    name: 'Hong Kong',
    slug: 'hong-kong',
    flag: 'https://flagcdn.com/w320/hk.png',
    universities: 1,
    totalResearch: 580,
    nobelPrizes: 2,
    topUniversities: ['University of Hong Kong'],
    description: 'International hub for research and education in Asia.'
  },
  {
    name: 'Denmark',
    slug: 'denmark',
    flag: 'https://flagcdn.com/w320/dk.png',
    universities: 1,
    totalResearch: 550,
    nobelPrizes: 9,
    topUniversities: ['University of Copenhagen'],
    description: 'Nordic excellence in research and innovation.'
  },
  {
    name: 'Sweden',
    slug: 'sweden',
    flag: 'https://flagcdn.com/w320/se.png',
    universities: 1,
    totalResearch: 420,
    nobelPrizes: 5,
    topUniversities: ['Karolinska Institute'],
    description: 'Leading medical research institution in Scandinavia.'
  }
];