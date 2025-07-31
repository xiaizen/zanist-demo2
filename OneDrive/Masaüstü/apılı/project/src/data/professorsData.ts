export interface Professor {
  id: string;
  name: string;
  title: string;
  currentUniversity: string;
  department: string;
  field: string;
  photo: string;
  email: string;
  linkedinUrl: string;
  personalWebsite?: string;
  bio: string;
  education: {
    degree: string;
    university: string;
    year: number;
    field: string;
  }[];
  previousPositions: {
    position: string;
    university: string;
    years: string;
  }[];
  researchAreas: string[];
  publications: {
    title: string;
    journal: string;
    year: number;
    citations: number;
    doi: string;
  }[];
  awards: {
    name: string;
    year: number;
    organization: string;
  }[];
  nobelPrizes?: {
    year: number;
    category: string;
    achievement: string;
  }[];
  stats: {
    totalPublications: number;
    totalCitations: number;
    hIndex: number;
    researchGate?: string;
    orcid?: string;
  };
  currentResearch: string[];
  collaborations: string[];
  fundingGrants: {
    title: string;
    amount: string;
    agency: string;
    year: number;
  }[];
}

export const professors: Professor[] = [
  {
    id: 'sarah-chen-mit',
    name: 'Dr. Sarah Chen',
    title: 'Professor of Computer Science',
    currentUniversity: 'MIT',
    department: 'Computer Science and Artificial Intelligence Laboratory (CSAIL)',
    field: 'Quantum Computing',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    email: 's.chen@mit.edu',
    linkedinUrl: 'https://linkedin.com/in/sarah-chen-mit',
    personalWebsite: 'https://people.csail.mit.edu/schen',
    bio: 'Dr. Sarah Chen is a leading researcher in quantum computing and quantum algorithms. Her groundbreaking work on quantum error correction has revolutionized the field and brought practical quantum computing significantly closer to reality. She has published over 120 papers in top-tier journals and conferences.',
    education: [
      {
        degree: 'Ph.D. in Computer Science',
        university: 'Stanford University',
        year: 2010,
        field: 'Quantum Computing Theory'
      },
      {
        degree: 'M.S. in Physics',
        university: 'Caltech',
        year: 2006,
        field: 'Quantum Mechanics'
      },
      {
        degree: 'B.S. in Computer Science',
        university: 'UC Berkeley',
        year: 2004,
        field: 'Computer Science and Mathematics'
      }
    ],
    previousPositions: [
      {
        position: 'Associate Professor',
        university: 'MIT',
        years: '2015-2020'
      },
      {
        position: 'Assistant Professor',
        university: 'MIT',
        years: '2010-2015'
      },
      {
        position: 'Postdoctoral Researcher',
        university: 'IBM Research',
        years: '2008-2010'
      }
    ],
    researchAreas: [
      'Quantum Error Correction',
      'Quantum Algorithms',
      'Quantum Machine Learning',
      'Fault-Tolerant Quantum Computing',
      'Quantum Cryptography'
    ],
    publications: [
      {
        title: 'Quantum Error Correction for Climate Modeling Applications',
        journal: 'Nature',
        year: 2024,
        citations: 245,
        doi: '10.1038/s41586-024-07123-4'
      },
      {
        title: 'Scalable Quantum Algorithms for Optimization Problems',
        journal: 'Science',
        year: 2023,
        citations: 892,
        doi: '10.1126/science.abc1234'
      },
      {
        title: 'Fault-Tolerant Quantum Computing with Superconducting Qubits',
        journal: 'Physical Review Letters',
        year: 2022,
        citations: 1456,
        doi: '10.1103/PhysRevLett.128.010501'
      }
    ],
    awards: [
      {
        name: 'MacArthur Fellowship',
        year: 2023,
        organization: 'MacArthur Foundation'
      },
      {
        name: 'Breakthrough Prize in Fundamental Physics',
        year: 2022,
        organization: 'Breakthrough Prize Foundation'
      },
      {
        name: 'NSF CAREER Award',
        year: 2012,
        organization: 'National Science Foundation'
      }
    ],
    stats: {
      totalPublications: 124,
      totalCitations: 15420,
      hIndex: 68,
      researchGate: 'https://researchgate.net/profile/Sarah-Chen-MIT',
      orcid: '0000-0002-1234-5678'
    },
    currentResearch: [
      'Quantum algorithms for climate modeling',
      'Error-corrected quantum processors',
      'Quantum machine learning applications',
      'Distributed quantum computing networks'
    ],
    collaborations: [
      'IBM Quantum Network',
      'Google Quantum AI',
      'Microsoft Quantum Development Kit',
      'European Quantum Flagship'
    ],
    fundingGrants: [
      {
        title: 'Quantum Computing for Climate Science',
        amount: '$2.5M',
        agency: 'NSF',
        year: 2023
      },
      {
        title: 'Fault-Tolerant Quantum Algorithms',
        amount: '$1.8M',
        agency: 'DOE',
        year: 2022
      }
    ]
  },
  {
    id: 'jennifer-martinez-stanford',
    name: 'Prof. Jennifer Martinez',
    title: 'Professor of Medicine and Genetics',
    currentUniversity: 'Stanford',
    department: 'School of Medicine',
    field: 'Gene Editing and CRISPR Technology',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    email: 'j.martinez@stanford.edu',
    linkedinUrl: 'https://linkedin.com/in/jennifer-martinez-stanford',
    personalWebsite: 'https://med.stanford.edu/profiles/jennifer-martinez',
    bio: 'Professor Jennifer Martinez is a pioneer in CRISPR gene editing technology. Her laboratory has developed the most precise gene editing tools available today, achieving single-base editing with unprecedented accuracy. Her work has direct applications in treating genetic diseases.',
    education: [
      {
        degree: 'M.D./Ph.D.',
        university: 'Harvard Medical School',
        year: 2008,
        field: 'Medicine and Molecular Biology'
      },
      {
        degree: 'B.S. in Biochemistry',
        university: 'MIT',
        year: 2002,
        field: 'Biochemistry and Molecular Biology'
      }
    ],
    previousPositions: [
      {
        position: 'Associate Professor',
        university: 'Stanford University',
        years: '2018-2023'
      },
      {
        position: 'Assistant Professor',
        university: 'UCSF',
        years: '2012-2018'
      },
      {
        position: 'Postdoctoral Fellow',
        university: 'Broad Institute',
        years: '2008-2012'
      }
    ],
    researchAreas: [
      'CRISPR Gene Editing',
      'Genetic Disease Treatment',
      'Precision Medicine',
      'Therapeutic Genome Editing',
      'Gene Therapy Development'
    ],
    publications: [
      {
        title: 'CRISPR 3.0: Unprecedented Precision in Gene Editing',
        journal: 'Science',
        year: 2024,
        citations: 567,
        doi: '10.1126/science.abcd1234'
      },
      {
        title: 'Single-Base Editing for Genetic Disease Treatment',
        journal: 'Nature Medicine',
        year: 2023,
        citations: 1234,
        doi: '10.1038/s41591-023-02345-6'
      }
    ],
    awards: [
      {
        name: 'Breakthrough Prize in Life Sciences',
        year: 2024,
        organization: 'Breakthrough Prize Foundation'
      },
      {
        name: 'Lasker Award for Basic Medical Research',
        year: 2023,
        organization: 'Lasker Foundation'
      }
    ],
    stats: {
      totalPublications: 89,
      totalCitations: 12450,
      hIndex: 54,
      researchGate: 'https://researchgate.net/profile/Jennifer-Martinez-Stanford',
      orcid: '0000-0003-2345-6789'
    },
    currentResearch: [
      'CRISPR 3.0 clinical applications',
      'Gene therapy for inherited diseases',
      'Precision medicine development',
      'Therapeutic genome editing safety'
    ],
    collaborations: [
      'Broad Institute',
      'Chan Zuckerberg Initiative',
      'NIH Gene Therapy Consortium',
      'European Gene Therapy Society'
    ],
    fundingGrants: [
      {
        title: 'CRISPR Therapeutics for Genetic Diseases',
        amount: '$3.2M',
        agency: 'NIH',
        year: 2023
      }
    ]
  },
  {
    id: 'michael-thompson-caltech',
    name: 'Dr. Michael Thompson',
    title: 'Professor of Materials Science and Engineering',
    currentUniversity: 'Caltech',
    department: 'Division of Engineering and Applied Science',
    field: 'Solar Energy and Photovoltaics',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    email: 'm.thompson@caltech.edu',
    linkedinUrl: 'https://linkedin.com/in/michael-thompson-caltech',
    personalWebsite: 'https://www.caltech.edu/about/news/michael-thompson',
    bio: 'Dr. Michael Thompson is a world-renowned expert in solar energy technology. His research has led to breakthrough improvements in solar cell efficiency, including the development of perovskite-silicon tandem cells that have achieved record-breaking 47% efficiency.',
    education: [
      {
        degree: 'Ph.D. in Materials Science',
        university: 'MIT',
        year: 2005,
        field: 'Photovoltaic Materials'
      },
      {
        degree: 'M.S. in Physics',
        university: 'Stanford University',
        year: 2001,
        field: 'Solid State Physics'
      },
      {
        degree: 'B.S. in Engineering Physics',
        university: 'UC Berkeley',
        year: 1999,
        field: 'Engineering Physics'
      }
    ],
    previousPositions: [
      {
        position: 'Associate Professor',
        university: 'Caltech',
        years: '2012-2018'
      },
      {
        position: 'Assistant Professor',
        university: 'Caltech',
        years: '2007-2012'
      },
      {
        position: 'Research Scientist',
        university: 'NREL',
        years: '2005-2007'
      }
    ],
    researchAreas: [
      'Perovskite Solar Cells',
      'Tandem Photovoltaics',
      'Solar Cell Efficiency',
      'Renewable Energy Materials',
      'Energy Storage Systems'
    ],
    publications: [
      {
        title: 'Record 47% Efficiency in Perovskite-Silicon Tandem Solar Cells',
        journal: 'Joule',
        year: 2024,
        citations: 423,
        doi: '10.1016/j.joule.2024.01.015'
      },
      {
        title: 'Advanced Light-Trapping in Next-Generation Solar Cells',
        journal: 'Nature Energy',
        year: 2023,
        citations: 789,
        doi: '10.1038/s41560-023-01234-5'
      }
    ],
    awards: [
      {
        name: 'IEEE William R. Cherry Award',
        year: 2023,
        organization: 'IEEE'
      },
      {
        name: 'DOE Early Career Award',
        year: 2010,
        organization: 'Department of Energy'
      }
    ],
    stats: {
      totalPublications: 156,
      totalCitations: 18750,
      hIndex: 72,
      researchGate: 'https://researchgate.net/profile/Michael-Thompson-Caltech',
      orcid: '0000-0004-3456-7890'
    },
    currentResearch: [
      'Next-generation perovskite solar cells',
      'Tandem cell optimization',
      'Solar energy storage integration',
      'Commercial solar cell manufacturing'
    ],
    collaborations: [
      'First Solar',
      'Tesla Energy',
      'NREL Partnership',
      'European Solar Initiative'
    ],
    fundingGrants: [
      {
        title: 'Advanced Solar Cell Technologies',
        amount: '$4.1M',
        agency: 'DOE',
        year: 2023
      }
    ]
  },
  {
    id: 'elena-rodriguez-harvard',
    name: 'Dr. Elena Rodriguez',
    title: 'Professor of Computer Science and Medicine',
    currentUniversity: 'Harvard',
    department: 'Harvard Medical School & School of Engineering',
    field: 'AI in Drug Discovery',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    email: 'e.rodriguez@harvard.edu',
    linkedinUrl: 'https://linkedin.com/in/elena-rodriguez-harvard',
    personalWebsite: 'https://hms.harvard.edu/faculty/elena-rodriguez',
    bio: 'Dr. Elena Rodriguez is a leading researcher at the intersection of artificial intelligence and drug discovery. Her work has revolutionized how new antibiotics are discovered, using machine learning to identify compounds that traditional methods missed.',
    education: [
      {
        degree: 'Ph.D. in Computer Science',
        university: 'MIT',
        year: 2009,
        field: 'Machine Learning and Bioinformatics'
      },
      {
        degree: 'M.D.',
        university: 'Harvard Medical School',
        year: 2007,
        field: 'Medicine'
      },
      {
        degree: 'B.S. in Computer Science',
        university: 'Stanford University',
        year: 2003,
        field: 'Computer Science and Biology'
      }
    ],
    previousPositions: [
      {
        position: 'Associate Professor',
        university: 'Harvard University',
        years: '2016-2021'
      },
      {
        position: 'Assistant Professor',
        university: 'Harvard University',
        years: '2011-2016'
      },
      {
        position: 'Research Fellow',
        university: 'Broad Institute',
        years: '2009-2011'
      }
    ],
    researchAreas: [
      'AI Drug Discovery',
      'Machine Learning in Medicine',
      'Antibiotic Development',
      'Computational Biology',
      'Medical AI Applications'
    ],
    publications: [
      {
        title: 'AI-Discovered Antibiotic Compounds for Drug-Resistant Bacteria',
        journal: 'Nature Medicine',
        year: 2024,
        citations: 678,
        doi: '10.1038/s41591-024-02789-1'
      },
      {
        title: 'Deep Learning for Molecular Drug Discovery',
        journal: 'Nature',
        year: 2023,
        citations: 1245,
        doi: '10.1038/s41586-023-05678-9'
      }
    ],
    awards: [
      {
        name: 'Turing Award for AI in Medicine',
        year: 2024,
        organization: 'ACM'
      },
      {
        name: 'NIH Director\'s Pioneer Award',
        year: 2020,
        organization: 'National Institutes of Health'
      }
    ],
    stats: {
      totalPublications: 98,
      totalCitations: 14230,
      hIndex: 61,
      researchGate: 'https://researchgate.net/profile/Elena-Rodriguez-Harvard',
      orcid: '0000-0005-4567-8901'
    },
    currentResearch: [
      'AI-driven antibiotic discovery',
      'Machine learning for drug safety',
      'Personalized medicine algorithms',
      'Medical AI ethics and fairness'
    ],
    collaborations: [
      'Google DeepMind',
      'Pfizer Research',
      'WHO Antibiotic Resistance Initiative',
      'Gates Foundation Global Health'
    ],
    fundingGrants: [
      {
        title: 'AI for Global Antibiotic Discovery',
        amount: '$5.2M',
        agency: 'NIH',
        year: 2023
      }
    ]
  },
  {
    id: 'david-kim-oxford',
    name: 'Prof. David Kim',
    title: 'Professor of Physics',
    currentUniversity: 'Oxford',
    department: 'Department of Physics',
    field: 'Fusion Energy and Plasma Physics',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    email: 'd.kim@physics.ox.ac.uk',
    linkedinUrl: 'https://linkedin.com/in/david-kim-oxford',
    personalWebsite: 'https://www.physics.ox.ac.uk/our-people/kim',
    bio: 'Professor David Kim is a world-leading expert in fusion energy research. His team at Oxford has achieved record-breaking plasma durations, bringing commercial fusion power significantly closer to reality.',
    education: [
      {
        degree: 'Ph.D. in Plasma Physics',
        university: 'Princeton University',
        year: 2003,
        field: 'Plasma Physics and Fusion Energy'
      },
      {
        degree: 'M.S. in Physics',
        university: 'MIT',
        year: 1999,
        field: 'Nuclear Engineering'
      },
      {
        degree: 'B.S. in Physics',
        university: 'Seoul National University',
        year: 1997,
        field: 'Physics'
      }
    ],
    previousPositions: [
      {
        position: 'Professor',
        university: 'Oxford University',
        years: '2015-present'
      },
      {
        position: 'Associate Professor',
        university: 'Oxford University',
        years: '2010-2015'
      },
      {
        position: 'Research Scientist',
        university: 'ITER Organization',
        years: '2005-2010'
      }
    ],
    researchAreas: [
      'Fusion Energy',
      'Plasma Physics',
      'Tokamak Design',
      'Magnetic Confinement',
      'Clean Energy Systems'
    ],
    publications: [
      {
        title: 'Sustained Plasma Confinement for Commercial Fusion',
        journal: 'Nuclear Fusion',
        year: 2024,
        citations: 234,
        doi: '10.1088/1741-4326/ac5678'
      },
      {
        title: 'Advanced Tokamak Operations at Oxford',
        journal: 'Physical Review Letters',
        year: 2023,
        citations: 567,
        doi: '10.1103/PhysRevLett.130.123456'
      }
    ],
    awards: [
      {
        name: 'Fusion Energy Sciences Award',
        year: 2023,
        organization: 'American Physical Society'
      },
      {
        name: 'IAEA Fusion Energy Award',
        year: 2021,
        organization: 'International Atomic Energy Agency'
      }
    ],
    stats: {
      totalPublications: 187,
      totalCitations: 16890,
      hIndex: 69,
      researchGate: 'https://researchgate.net/profile/David-Kim-Oxford',
      orcid: '0000-0006-5678-9012'
    },
    currentResearch: [
      'Commercial fusion reactor design',
      'Plasma control algorithms',
      'Fusion energy economics',
      'International fusion collaboration'
    ],
    collaborations: [
      'ITER Project',
      'UK Atomic Energy Authority',
      'European Fusion Programme',
      'Commonwealth Fusion Systems'
    ],
    fundingGrants: [
      {
        title: 'Advanced Fusion Energy Research',
        amount: '$6.8M',
        agency: 'UKRI',
        year: 2023
      }
    ]
  }
];

export const getProfessorById = (id: string): Professor | undefined => {
  return professors.find(prof => prof.id === id);
};

export const getProfessorsByUniversity = (university: string): Professor[] => {
  return professors.filter(prof => prof.currentUniversity === university);
};

export const getProfessorsByField = (field: string): Professor[] => {
  return professors.filter(prof => prof.field.toLowerCase().includes(field.toLowerCase()));
};