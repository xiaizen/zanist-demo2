import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter,
  Calendar,
  Clock,
  User,
  MapPin,
  Eye,
  MessageCircle,
  Share2,
  Download,
  Star,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { sampleEssays } from '../data/sampleEssays';
import EssayDetail from '../components/EssayDetail';
import Footer from '../components/Footer';

const ResearchPage: React.FC = () => {
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    'Quantum Physics',
    'Biotechnology',
    'Artificial Intelligence',
    'Renewable Energy',
    'Nuclear Physics',
    'Environmental Science',
    'Nanotechnology',
    'Space Science'
  ];

  const universities = ['MIT', 'Stanford', 'Harvard', 'Caltech', 'Oxford', 'Cambridge'];

  // Apply filters
  let filteredEssays = sampleEssays.filter(essay => {
    const matchesSearch = essay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         essay.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         essay.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || essay.category === selectedCategory;
    const matchesUniversity = selectedUniversity === 'all' || essay.university === selectedUniversity;
    
    // Time filter logic
    let matchesTime = true;
    if (timeFilter !== 'all') {
      const essayDate = new Date(essay.publishDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - essayDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (timeFilter) {
        case 'week':
          matchesTime = diffDays <= 7;
          break;
        case 'month':
          matchesTime = diffDays <= 30;
          break;
        case 'year':
          matchesTime = diffDays <= 365;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesUniversity && matchesTime;
  });

  // Sort essays
  filteredEssays.sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      case 'oldest':
        return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
      case 'readTime':
        return a.readTime - b.readTime;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  if (selectedEssay) {
    return <EssayDetail essay={selectedEssay} onBack={() => setSelectedEssay(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="hover:text-red-200">
              <span className="font-bold">Zanist</span>
            </Link>
            <span>›</span>
            <span>Research</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">All Research</h1>
          <p className="text-red-100 text-lg max-w-3xl">
            Comprehensive collection of scientific research papers, breakthroughs, and discoveries from leading 
            universities and research institutions worldwide.
          </p>
          
          <div className="flex items-center space-x-8 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>{filteredEssays.length} Research Papers</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>{categories.length} Categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{universities.length} Universities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            {/* Search Bar */}
            <div className="lg:col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search research papers, keywords, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* University Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Universities</option>
                {universities.map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            {/* Time Filter */}
            <div className="lg:col-span-2">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="year">Past Year</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="readTime">By Read Time</option>
                <option value="title">By Title</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredEssays.length} research papers
            </div>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-sm rounded-l-lg ${
                  viewMode === 'grid' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 text-sm rounded-r-lg ${
                  viewMode === 'list' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Research Papers */}
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEssays.map((essay) => (
              <div key={essay.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={essay.imageUrl}
                    alt={essay.title}
                    className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                    onClick={() => setSelectedEssay(essay)}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-medium rounded">
                      {essay.category}
                    </span>
                  </div>
                  {essay.isFeatured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-medium rounded">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 
                    className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-red-600 line-clamp-2"
                    onClick={() => setSelectedEssay(essay)}
                  >
                    {essay.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {essay.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{essay.university}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{essay.readTime} min</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 cursor-pointer hover:text-red-600" />
                      <MessageCircle className="w-4 h-4 cursor-pointer hover:text-red-600" />
                      <Share2 className="w-4 h-4 cursor-pointer hover:text-red-600" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(essay.publishDate).toLocaleDateString()}
                    </span>
                    <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-lg shadow">
            <div className="divide-y divide-gray-200">
              {filteredEssays.map((essay) => (
                <div key={essay.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <img
                        src={essay.imageUrl}
                        alt={essay.title}
                        className="w-full h-32 object-cover rounded cursor-pointer"
                        onClick={() => setSelectedEssay(essay)}
                      />
                    </div>
                    
                    <div className="md:col-span-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-medium rounded">
                          {essay.category}
                        </span>
                        {essay.isFeatured && (
                          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 text-xs font-medium rounded">
                            FEATURED
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(essay.publishDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 
                        className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-red-600"
                        onClick={() => setSelectedEssay(essay)}
                      >
                        {essay.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {essay.summary}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{essay.university}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{essay.readTime} min read</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Eye className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-600" />
                          <MessageCircle className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-600" />
                          <Share2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-600" />
                          <Download className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredEssays.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No research papers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ResearchPage;