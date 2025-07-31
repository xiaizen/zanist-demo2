import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Award,
  Calendar,
  User,
  MapPin,
  BookOpen,
  Star,
  Trophy,
  Medal,
  Crown,
  Filter
} from 'lucide-react';
import Footer from '../components/Footer';

const NobelPrizePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  // Expanded Nobel Prize data - not limited to top 50 universities
  const nobelPrizes = [
    {
      id: 1,
      year: 2023,
      category: 'Physics',
      recipients: [
        {
          name: 'Pierre Agostini',
          university: 'Ohio State University',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Ferenc Krausz',
          university: 'Max Planck Institute',
          country: 'Germany',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Anne L\'Huillier',
          university: 'Lund University',
          country: 'Sweden',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      achievement: 'For experimental methods that generate attosecond pulses of light for the study of electron dynamics in matter',
      description: 'The laureates have demonstrated a way to create extremely short pulses of light that can be used to measure the rapid processes in which electrons move or change energy.',
      impact: 'This breakthrough enables scientists to study processes that were previously too fast to observe, opening new frontiers in physics and chemistry.',
      relatedResearch: [
        'Attosecond Science and Technology',
        'Ultrafast Laser Physics',
        'Electron Dynamics in Atoms'
      ],
      citations: 2450,
      hIndex: 85
    },
    {
      id: 2,
      year: 2023,
      category: 'Chemistry',
      recipients: [
        {
          name: 'Moungi Bawendi',
          university: 'MIT',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Louis Brus',
          university: 'Columbia University',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Alexei Ekimov',
          university: 'Nanocrystals Technology',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      achievement: 'For the discovery and synthesis of quantum dots',
      description: 'The laureates have succeeded in producing particles so small that their properties are determined by quantum phenomena.',
      impact: 'Quantum dots are now used in LED lights, television screens, and medical imaging, revolutionizing display technology and biomedical applications.',
      relatedResearch: [
        'Quantum Dot Technology',
        'Nanotechnology Applications',
        'Semiconductor Nanocrystals'
      ],
      citations: 3200,
      hIndex: 92
    },
    {
      id: 3,
      year: 2023,
      category: 'Medicine',
      recipients: [
        {
          name: 'Katalin Karikó',
          university: 'University of Pennsylvania',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Drew Weissman',
          university: 'University of Pennsylvania',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      achievement: 'For their discoveries concerning nucleoside base modifications that enabled the development of effective mRNA vaccines',
      description: 'Their groundbreaking findings enabled the development of effective mRNA vaccines against COVID-19.',
      impact: 'Their work was crucial for developing COVID-19 vaccines and opens new possibilities for treating cancer, autoimmune diseases, and genetic disorders.',
      relatedResearch: [
        'mRNA Vaccine Technology',
        'Nucleoside Modifications',
        'Immunotherapy Applications'
      ],
      citations: 4100,
      hIndex: 78
    },
    {
      id: 4,
      year: 2022,
      category: 'Physics',
      recipients: [
        {
          name: 'Alain Aspect',
          university: 'Université Paris-Saclay',
          country: 'France',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'John Clauser',
          university: 'Independent Researcher',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Anton Zeilinger',
          university: 'University of Vienna',
          country: 'Austria',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      achievement: 'For experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science',
      description: 'The laureates have conducted groundbreaking experiments using entangled quantum states, where two particles behave like a single unit even when separated.',
      impact: 'Their work has laid the foundation for quantum computing, quantum communication, and quantum cryptography.',
      relatedResearch: [
        'Quantum Entanglement',
        'Quantum Information Theory',
        'Bell\'s Theorem Experiments'
      ],
      citations: 2800,
      hIndex: 78
    },
    {
      id: 5,
      year: 2022,
      category: 'Chemistry',
      recipients: [
        {
          name: 'Carolyn Bertozzi',
          university: 'Stanford University',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Morten Meldal',
          university: 'University of Copenhagen',
          country: 'Denmark',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Barry Sharpless',
          university: 'Scripps Research',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      achievement: 'For the development of click chemistry and bioorthogonal chemistry',
      description: 'The laureates have developed chemical reactions that allow molecules to be joined together efficiently and reliably.',
      impact: 'Click chemistry has revolutionized drug development, materials science, and biological research.',
      relatedResearch: [
        'Click Chemistry Applications',
        'Bioorthogonal Chemistry',
        'Drug Discovery Methods'
      ],
      citations: 4100,
      hIndex: 105
    },
    {
      id: 6,
      year: 2021,
      category: 'Physics',
      recipients: [
        {
          name: 'Syukuro Manabe',
          university: 'Princeton University',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Klaus Hasselmann',
          university: 'Max Planck Institute',
          country: 'Germany',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Giorgio Parisi',
          university: 'Sapienza University of Rome',
          country: 'Italy',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      achievement: 'For groundbreaking contributions to our understanding of complex physical systems',
      description: 'The laureates have made fundamental contributions to climate modeling and the understanding of complex systems.',
      impact: 'Their work has been crucial for understanding climate change and predicting global warming.',
      relatedResearch: [
        'Climate Modeling',
        'Complex Systems Theory',
        'Statistical Physics'
      ],
      citations: 3500,
      hIndex: 88
    },
    // Add more Nobel Prizes from various institutions
    {
      id: 7,
      year: 2020,
      category: 'Chemistry',
      recipients: [
        {
          name: 'Emmanuelle Charpentier',
          university: 'Max Planck Institute',
          country: 'Germany',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Jennifer Doudna',
          university: 'University of California, Berkeley',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      achievement: 'For the development of a method for genome editing',
      description: 'They developed CRISPR-Cas9, a revolutionary tool for precise gene editing.',
      impact: 'CRISPR has transformed biological research and holds promise for treating genetic diseases.',
      relatedResearch: [
        'CRISPR-Cas9 Technology',
        'Gene Editing Applications',
        'Genetic Disease Treatment'
      ],
      citations: 5200,
      hIndex: 95
    },
    {
      id: 8,
      year: 2019,
      category: 'Physics',
      recipients: [
        {
          name: 'James Peebles',
          university: 'Princeton University',
          country: 'United States',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Michel Mayor',
          university: 'University of Geneva',
          country: 'Switzerland',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Didier Queloz',
          university: 'University of Cambridge',
          country: 'United Kingdom',
          photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      achievement: 'For theoretical discoveries in physical cosmology and for the discovery of an exoplanet orbiting a solar-type star',
      description: 'Peebles developed theoretical framework for cosmology, while Mayor and Queloz discovered the first exoplanet.',
      impact: 'Their work has revolutionized our understanding of the universe and the search for life beyond Earth.',
      relatedResearch: [
        'Cosmological Theory',
        'Exoplanet Detection',
        'Dark Matter Research'
      ],
      citations: 4800,
      hIndex: 102
    }
  ];

  const categories = ['Physics', 'Chemistry', 'Medicine', 'Literature', 'Peace', 'Economics'];
  const years = Array.from({length: 15}, (_, i) => 2024 - i);
  const universities = [...new Set(nobelPrizes.flatMap(prize => prize.recipients.map(r => r.university)))];
  const countries = [...new Set(nobelPrizes.flatMap(prize => prize.recipients.map(r => r.country)))];

  // Apply filters
  const filteredPrizes = nobelPrizes.filter(prize => {
    const matchesSearch = prize.achievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prize.recipients.some(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         prize.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || prize.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || prize.year.toString() === selectedYear;
    const matchesUniversity = selectedUniversity === 'all' || 
                             prize.recipients.some(r => r.university === selectedUniversity);
    const matchesCountry = selectedCountry === 'all' || 
                          prize.recipients.some(r => r.country === selectedCountry);
    
    return matchesSearch && matchesCategory && matchesYear && matchesUniversity && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="hover:text-yellow-200">
              <span className="font-bold">Zanist</span>
            </Link>
            <span>›</span>
            <span>Nobel Prizes</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <Trophy className="w-12 h-12 text-yellow-200" />
            <div>
              <h1 className="text-4xl font-bold">Nobel Prize Winners</h1>
              <p className="text-yellow-100 text-lg">
                Celebrating the greatest scientific achievements and discoveries from institutions worldwide
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>{filteredPrizes.length} Prize Winners</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>{categories.length} Categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{universities.length} Institutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Nobel Prize winners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* University Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="all">All Institutions</option>
                {universities.map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            {/* Country Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="lg:col-span-1 flex items-center">
              <span className="text-sm text-gray-600">
                {filteredPrizes.length} found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nobel Prizes */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {filteredPrizes.map((prize) => (
            <div key={prize.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Prize Header */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-6 py-4 border-b border-yellow-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Medal className="w-8 h-8 text-yellow-600" />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Nobel Prize in {prize.category}</h2>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{prize.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Citations</div>
                    <div className="text-2xl font-bold text-yellow-600">{prize.citations.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Achievement */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Achievement</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{prize.achievement}</p>
                </div>

                {/* Recipients */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recipients</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {prize.recipients.map((recipient, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={recipient.photo}
                            alt={recipient.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">{recipient.name}</h4>
                            <div className="text-sm text-gray-600">{recipient.country}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{recipient.university}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description and Impact */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{prize.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact</h3>
                    <p className="text-gray-700 leading-relaxed">{prize.impact}</p>
                  </div>
                </div>

                {/* Related Research */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Research Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {prize.relatedResearch.map((research, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {research}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{prize.year}</div>
                      <div className="text-sm text-gray-600">Award Year</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{prize.recipients.length}</div>
                      <div className="text-sm text-gray-600">Recipients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{prize.citations.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Citations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{prize.hIndex}</div>
                      <div className="text-sm text-gray-600">H-Index</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrizes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Nobel Prizes found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NobelPrizePage;