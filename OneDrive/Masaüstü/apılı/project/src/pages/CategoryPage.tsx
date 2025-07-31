import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter,
  Calendar,
  Clock,
  User,
  MapPin,
  Award,
  TrendingUp,
  ChevronDown,
  Star,
  Eye,
  MessageCircle,
  Share2
} from 'lucide-react';
import { sampleEssays } from '../data/sampleEssays';
import EssayDetail from '../components/EssayDetail';
import Footer from '../components/Footer';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams();
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedProfessor, setSelectedProfessor] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // Convert slug back to category name
  const categoryName = categorySlug?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'All Categories';

  // Mock data for the category
  const categoryData = {
    description: `Explore the latest breakthroughs and research in ${categoryName}. Discover cutting-edge studies from leading universities and renowned professors worldwide.`,
    totalArticles: 156,
    totalContributors: 45,
    nobelPrizes: [
      { year: 2023, recipient: 'Dr. Sarah Chen', university: 'MIT', achievement: 'Quantum Computing Breakthrough' },
      { year: 2022, recipient: 'Prof. Michael Johnson', university: 'Stanford', achievement: 'Advanced AI Algorithms' },
      { year: 2021, recipient: 'Dr. Elena Rodriguez', university: 'Harvard', achievement: 'Biotechnology Innovation' }
    ]
  };

  // Filter essays by category
  const categoryEssays = sampleEssays.filter(essay => 
    essay.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  // Mock universities and professors for this category
  const universities = [
    { name: 'MIT', articles: 25, professors: 12 },
    { name: 'Stanford', articles: 18, professors: 8 },
    { name: 'Harvard', articles: 15, professors: 10 },
    { name: 'Caltech', articles: 12, professors: 6 },
    { name: 'Oxford', articles: 10, professors: 7 }
  ];

  const professors = [
    { name: 'Dr. Sarah Chen', university: 'MIT', articles: 8, citations: 1250 },
    { name: 'Prof. Michael Johnson', university: 'Stanford', articles: 6, citations: 980 },
    { name: 'Dr. Elena Rodriguez', university: 'Harvard', articles: 7, citations: 1100 },
    { name: 'Prof. David Kim', university: 'Caltech', articles: 5, citations: 750 },
    { name: 'Dr. Anna Wilson', university: 'Oxford', articles: 4, citations: 650 }
  ];

  // Apply filters
  let filteredEssays = categoryEssays.filter(essay => {
    const matchesSearch = essay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         essay.summary.toLowerCase().includes(searchTerm.toLowerCase());
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
    
    return matchesSearch && matchesUniversity && matchesTime;
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
            <Link to="/categories" className="hover:text-red-200">Categories</Link>
            <span>›</span>
            <span>{categoryName}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
          <p className="text-red-100 text-lg max-w-3xl">{categoryData.description}</p>
          
          <div className="flex items-center space-x-8 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>{categoryData.totalArticles} Articles</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{categoryData.totalContributors} Contributors</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>{categoryData.nobelPrizes.length} Nobel Prizes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search research, universities, professors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
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
                  <option key={uni.name} value={uni.name}>{uni.name}</option>
                ))}
              </select>
            </div>

            {/* Professor Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedProfessor}
                onChange={(e) => setSelectedProfessor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Professors</option>
                {professors.map(prof => (
                  <option key={prof.name} value={prof.name}>{prof.name}</option>
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
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Articles */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-6 py-3 font-bold flex items-center justify-between">
                <span>Research Articles ({filteredEssays.length})</span>
                <Filter className="w-4 h-4" />
              </div>
              
              <div className="p-6">
                {filteredEssays.length > 0 ? (
                  <div className="space-y-6">
                    {filteredEssays.map((essay, index) => (
                      <article key={essay.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <img
                              src={essay.imageUrl}
                              alt={essay.title}
                              className="w-full h-48 md:h-32 object-cover rounded cursor-pointer"
                              onClick={() => setSelectedEssay(essay)}
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-medium rounded">
                                  {essay.category}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(essay.publishDate).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <h3 
                                className="text-xl font-bold text-gray-900 hover:text-red-600 cursor-pointer"
                                onClick={() => setSelectedEssay(essay)}
                              >
                                {essay.title}
                              </h3>
                              
                              <p className="text-gray-600 line-clamp-2">
                                {essay.summary}
                              </p>
                              
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{essay.university}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{essay.readTime} min</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <Eye className="w-4 h-4 cursor-pointer hover:text-red-600" />
                                  <MessageCircle className="w-4 h-4 cursor-pointer hover:text-red-600" />
                                  <Share2 className="w-4 h-4 cursor-pointer hover:text-red-600" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Universities */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-4 py-2 font-bold">
                Top Universities
              </div>
              <div className="p-4 space-y-3">
                {universities.map((uni, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{uni.name}</h4>
                      <div className="text-xs text-gray-500">
                        {uni.articles} articles • {uni.professors} professors
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Professors */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-4 py-2 font-bold">
                Leading Researchers
              </div>
              <div className="p-4 space-y-3">
                {professors.map((prof, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <h4 className="text-sm font-medium text-gray-900">{prof.name}</h4>
                    <div className="text-xs text-gray-500 mt-1">
                      {prof.university} • {prof.articles} articles • {prof.citations} citations
                    </div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nobel Prizes */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-4 py-2 font-bold flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Nobel Prizes
              </div>
              <div className="p-4 space-y-3">
                {categoryData.nobelPrizes.map((prize, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-medium rounded">
                        {prize.year}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900">{prize.recipient}</h4>
                    <div className="text-xs text-gray-500 mt-1">
                      {prize.university} • {prize.achievement}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advertisement */}
            <div className="bg-gray-200 rounded shadow p-8 text-center">
              <div className="text-gray-500">
                <div className="text-sm font-medium mb-2">Advertisement</div>
                <div className="text-xs">Your ad could be here</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;