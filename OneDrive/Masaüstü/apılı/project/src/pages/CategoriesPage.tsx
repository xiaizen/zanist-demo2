import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter,
  User,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  BookOpen,
  Calendar,
  MapPin,
  Star,
  Quote,
  TrendingUp,
  Eye,
  Clock
} from 'lucide-react';
import { sampleEssays } from '../data/sampleEssays';
import EssayDetail from '../components/EssayDetail';

const CategoriesPage: React.FC = () => {
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Category data with icons and detailed information
  const categories = [
    {
      id: 1,
      name: 'Quantum Physics',
      slug: 'quantum-physics',
      description: 'Explore the fundamental nature of matter and energy at the smallest scales.',
      articles: 156,
      contributors: 45,
      nobelPrizes: 12,
      color: 'blue',
      image: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=400',
      topUniversities: ['MIT', 'Caltech', 'Harvard'],
      recentBreakthroughs: [
        'Quantum Error Correction Breakthrough',
        'Room Temperature Quantum Computing',
        'Quantum Internet Protocols'
      ],
      keyResearchers: [
        { name: 'Dr. Sarah Chen', university: 'MIT', citations: 1250 },
        { name: 'Prof. Michael Quantum', university: 'Caltech', citations: 980 }
      ]
    },
    {
      id: 2,
      name: 'Biotechnology',
      slug: 'biotechnology',
      description: 'Revolutionary advances in genetic engineering and biological systems.',
      articles: 203,
      contributors: 67,
      nobelPrizes: 8,
      color: 'green',
      image: 'https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg?auto=compress&cs=tinysrgb&w=400',
      topUniversities: ['Stanford', 'Harvard', 'MIT'],
      recentBreakthroughs: [
        'CRISPR 3.0 Gene Editing',
        'Synthetic Biology Applications',
        'Personalized Medicine Advances'
      ],
      keyResearchers: [
        { name: 'Dr. Elena Rodriguez', university: 'Stanford', citations: 1100 },
        { name: 'Prof. James Bio', university: 'Harvard', citations: 890 }
      ]
    },
    {
      id: 3,
      name: 'Artificial Intelligence',
      slug: 'artificial-intelligence',
      description: 'Cutting-edge developments in machine learning and cognitive computing.',
      articles: 289,
      contributors: 89,
      nobelPrizes: 3,
      color: 'purple',
      image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400',
      topUniversities: ['Stanford', 'MIT', 'Carnegie Mellon'],
      recentBreakthroughs: [
        'Large Language Model Advances',
        'AI in Drug Discovery',
        'Autonomous Systems Development'
      ],
      keyResearchers: [
        { name: 'Dr. Alex Neural', university: 'Stanford', citations: 1450 },
        { name: 'Prof. Lisa Machine', university: 'MIT', citations: 1200 }
      ]
    },
    {
      id: 4,
      name: 'Renewable Energy',
      slug: 'renewable-energy',
      description: 'Sustainable energy solutions for a cleaner future.',
      articles: 178,
      contributors: 52,
      nobelPrizes: 5,
      color: 'yellow',
      image: 'https://images.pexels.com/photos/9875442/pexels-photo-9875442.jpeg?auto=compress&cs=tinysrgb&w=400',
      topUniversities: ['Caltech', 'MIT', 'Stanford'],
      recentBreakthroughs: [
        'Perovskite Solar Cell Efficiency',
        'Advanced Battery Technology',
        'Hydrogen Fuel Innovations'
      ],
      keyResearchers: [
        { name: 'Dr. Solar Power', university: 'Caltech', citations: 950 },
        { name: 'Prof. Wind Energy', university: 'MIT', citations: 780 }
      ]
    },
    {
      id: 5,
      name: 'Environmental Science',
      slug: 'environmental-science',
      description: 'Research on climate change, conservation, and environmental protection.',
      articles: 234,
      contributors: 78,
      nobelPrizes: 7,
      color: 'green',
      image: 'https://images.pexels.com/photos/221012/pexels-photo-221012.jpeg?auto=compress&cs=tinysrgb&w=400',
      topUniversities: ['Harvard', 'Stanford', 'Oxford'],
      recentBreakthroughs: [
        'Carbon Capture Technology',
        'Ecosystem Restoration Methods',
        'Climate Modeling Advances'
      ],
      keyResearchers: [
        { name: 'Dr. Green Earth', university: 'Harvard', citations: 1050 },
        { name: 'Prof. Climate Change', university: 'Stanford', citations: 920 }
      ]
    },
    {
      id: 6,
      name: 'Space Science',
      slug: 'space-science',
      description: 'Exploration of the cosmos and space technology development.',
      articles: 145,
      contributors: 38,
      nobelPrizes: 4,
      color: 'indigo',
      image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpg?auto=compress&cs=tinysrgb&w=400',
      topUniversities: ['Caltech', 'MIT', 'Stanford'],
      recentBreakthroughs: [
        'James Webb Telescope Discoveries',
        'Mars Exploration Technology',
        'Exoplanet Detection Methods'
      ],
      keyResearchers: [
        { name: 'Dr. Star Gazer', university: 'Caltech', citations: 850 },
        { name: 'Prof. Rocket Science', university: 'MIT', citations: 720 }
      ]
    },
    {
      id: 7,
      name: 'Nanotechnology',
      slug: 'nanotechnology',
      description: 'Engineering at the molecular and atomic scale.',
      articles: 167,
      contributors: 43,
      nobelPrizes: 6,
      color: 'red',
      image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400',
      topUniversities: ['MIT', 'Stanford', 'Caltech'],
      recentBreakthroughs: [
        'Molecular Machines Development',
        'Nanomedical Applications',
        'Quantum Dot Innovations'
      ],
      keyResearchers: [
        { name: 'Dr. Nano Tech', university: 'MIT', citations: 980 },
        { name: 'Prof. Molecular', university: 'Stanford', citations: 760 }
      ]
    },
    {
      id: 8,
      name: 'Nuclear Physics',
      slug: 'nuclear-physics',
      description: 'Study of atomic nuclei and nuclear reactions.',
      articles: 123,
      contributors: 35,
      nobelPrizes: 15,
      color: 'orange',
      image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpg?auto=compress&cs=tinysrgb&w=400',
      topUniversities: ['MIT', 'Caltech', 'Oxford'],
      recentBreakthroughs: [
        'Fusion Energy Advances',
        'Nuclear Waste Solutions',
        'Particle Accelerator Technology'
      ],
      keyResearchers: [
        { name: 'Dr. Nuclear Power', university: 'MIT', citations: 1150 },
        { name: 'Prof. Fusion Energy', university: 'Caltech', citations: 890 }
      ]
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
    red: 'bg-red-100 text-red-600 border-red-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200'
  };

  // Filter categories
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedEssay) {
    return <EssayDetail essay={selectedEssay} onBack={() => setSelectedEssay(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="hover:text-red-200">Home</Link>
            <span>›</span>
            <span>Categories</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Research Categories</h1>
          <p className="text-red-100 text-lg max-w-3xl">
            Explore scientific research across diverse fields of study. Each category features the latest breakthroughs, 
            leading researchers, and comprehensive analysis from top universities worldwide.
          </p>
          
          <div className="flex items-center space-x-8 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>{categories.reduce((sum, cat) => sum + cat.articles, 0)} Total Articles</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{categories.reduce((sum, cat) => sum + cat.contributors, 0)} Contributors</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>{categories.reduce((sum, cat) => sum + cat.nobelPrizes, 0)} Nobel Prizes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search categories, research areas, breakthroughs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Category Header */}
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                </div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{category.articles}</div>
                    <div className="text-xs text-gray-500">Articles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{category.contributors}</div>
                    <div className="text-xs text-gray-500">Contributors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">{category.nobelPrizes}</div>
                    <div className="text-xs text-gray-500">Nobel Prizes</div>
                  </div>
                </div>

                {/* Top Universities */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-900 mb-2">Top Universities:</h5>
                  <div className="flex flex-wrap gap-1">
                    {category.topUniversities.map((uni, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded">
                        {uni}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Breakthroughs */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-900 mb-2">Recent Breakthroughs:</h5>
                  <ul className="space-y-1">
                    {category.recentBreakthroughs.slice(0, 2).map((breakthrough, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="w-1 h-1 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span className="line-clamp-1">{breakthrough}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-medium text-sm">Explore Category</span>
                  <span className="text-red-600">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
          </div>
        )}
      </div>

      {/* Featured Statistics */}
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Research Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {categories.reduce((sum, cat) => sum + cat.articles, 0)}
              </div>
              <div className="text-gray-600">Research Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {categories.reduce((sum, cat) => sum + cat.contributors, 0)}
              </div>
              <div className="text-gray-600">Active Researchers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {categories.reduce((sum, cat) => sum + cat.nobelPrizes, 0)}
              </div>
              <div className="text-gray-600">Nobel Prizes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600">Research Fields</div>
            </div>
          </div>
        </div>
      </div>

      {/* Zanist Premium Ad */}
      <div className="bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 py-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Unlock Premium Research Access</h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Join Zanist Premium to access exclusive research papers, expert analysis, and early access to breakthrough discoveries from leading scientists worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-lg p-6">
              <BookOpen className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Unlimited Access</h3>
              <p className="text-red-100 text-sm">Read all research papers without limits</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <User className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Expert Analysis</h3>
              <p className="text-red-100 text-sm">Get insights from leading researchers</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Early Access</h3>
              <p className="text-red-100 text-sm">Be first to read new discoveries</p>
            </div>
          </div>
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <h3 className="text-xl font-bold">Zanist</h3>
              </Link>
              <p className="text-gray-400 text-sm">
                Your trusted source for the latest scientific discoveries and research breakthroughs.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/category/quantum-physics" className="hover:text-white transition-colors">Quantum Physics</Link></li>
                <li><Link to="/category/biotechnology" className="hover:text-white transition-colors">Biotechnology</Link></li>
                <li><Link to="/category/artificial-intelligence" className="hover:text-white transition-colors">AI Research</Link></li>
                <li><Link to="/category/space-science" className="hover:text-white transition-colors">Space Science</Link></li>
                <li><Link to="/categories" className="hover:text-white transition-colors font-medium">View All Categories →</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
                <li><Link to="/about/team" className="hover:text-white transition-colors">Editorial Team</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/about/advertise" className="hover:text-white transition-colors">Advertise</Link></li>
                <li><Link to="/about/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://twitter.com/zanist" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="https://facebook.com/zanist" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="https://linkedin.com/company/zanist" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="/rss" className="hover:text-white transition-colors">RSS Feed</a></li>
                <li><a href="/newsletter" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Zanist. All rights reserved. | <Link to="/privacy" className="hover:text-white">Privacy Policy</Link> | <Link to="/terms" className="hover:text-white">Terms of Service</Link></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoriesPage;