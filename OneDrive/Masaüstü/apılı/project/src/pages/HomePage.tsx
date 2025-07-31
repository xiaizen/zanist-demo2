import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  User, 
  Menu,
  X,
  Clock,
  Calendar,
  Eye,
  MessageCircle,
  Share2,
  ChevronRight,
  Settings,
  Bell,
  Globe,
  Star,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { sampleEssays } from '../data/sampleEssays';
import EssayDetail from '../components/EssayDetail';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredEssay = sampleEssays.find(essay => essay.isFeatured) || sampleEssays[0];
  const latestNews = sampleEssays.slice(1, 9);
  const sidebarNews = sampleEssays.slice(9, 14);

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

  const topUniversities = [
    { name: 'MIT', slug: 'mit', articles: 45, rating: 5 },
    { name: 'Stanford', slug: 'stanford', articles: 38, rating: 5 },
    { name: 'Harvard', slug: 'harvard', articles: 32, rating: 4 },
    { name: 'Caltech', slug: 'caltech', articles: 28, rating: 5 },
    { name: 'Oxford', slug: 'oxford', articles: 25, rating: 4 },
    { name: 'Cambridge', slug: 'cambridge', articles: 22, rating: 4 }
  ];

  if (selectedEssay) {
    return <EssayDetail essay={selectedEssay} onBack={() => setSelectedEssay(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header Bar */}
      <div className="bg-red-700 text-white text-sm py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Breaking News</span>
            <span className="text-red-200">•</span>
            <span>Latest Scientific Discoveries</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-red-600 text-white">
        <div className="container mx-auto px-4">
          {/* Logo and Search Row */}
          <div className="flex items-center justify-between py-4 border-b border-red-500">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center">
                <h1 className="text-4xl font-bold">Zanist</h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Enhanced Search */}
              <div className="hidden md:flex items-center bg-white rounded-lg">
                <input
                  type="text"
                  placeholder="Search research, universities, professors..."
                  className="px-6 py-4 text-gray-900 rounded-l-lg w-[500px] focus:outline-none text-base"
                />
                <button className="bg-red-500 px-8 py-4 rounded-r-lg hover:bg-red-400 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* User Menu */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="hidden md:block">Welcome, {user.name}</span>
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/profile"
                      className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400"
                    >
                      <User className="w-4 h-4" />
                    </Link>
                    {(user.role === 'admin' || user.role === 'moderator') && (
                      <Link
                        to="/admin"
                        className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400"
                        title="Admin Panel"
                      >
                        <Settings className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/auth"
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-400 transition-colors"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="py-3">
            <div className="flex items-center justify-between">
              <ul className="hidden md:flex items-center space-x-8">
                <li><Link to="/" className="hover:text-red-200 font-medium">Home</Link></li>
                <li><Link to="/research" className="hover:text-red-200 font-medium">Research</Link></li>
                <li><Link to="/universities" className="hover:text-red-200 font-medium">Universities</Link></li>
                <li><Link to="/categories" className="hover:text-red-200 font-medium">Categories</Link></li>
                <li><Link to="/analysis" className="hover:text-red-200 font-medium">Analysis</Link></li>
                <li><Link to="/nobel-prizes" className="hover:text-red-200 font-medium">Nobel Prizes</Link></li>
                <li><Link to="/contact" className="hover:text-red-200 font-medium">Contact</Link></li>
              </ul>

              <div className="flex items-center space-x-4">
                <Bell className="w-5 h-5 hover:text-red-200 cursor-pointer" />
                <Globe className="w-5 h-5 hover:text-red-200 cursor-pointer" />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-red-500">
                <ul className="space-y-2 mt-4">
                  <li><Link to="/" className="block py-2 hover:text-red-200">Home</Link></li>
                  <li><Link to="/research" className="block py-2 hover:text-red-200">Research</Link></li>
                  <li><Link to="/universities" className="block py-2 hover:text-red-200">Universities</Link></li>
                  <li><Link to="/categories" className="block py-2 hover:text-red-200">Categories</Link></li>
                  <li><Link to="/analysis" className="block py-2 hover:text-red-200">Analysis</Link></li>
                  <li><Link to="/nobel-prizes" className="block py-2 hover:text-red-200">Nobel Prizes</Link></li>
                  <li><Link to="/contact" className="block py-2 hover:text-red-200">Contact</Link></li>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Featured Article */}
            <div className="bg-white rounded shadow overflow-hidden">
              <div className="relative">
                <img
                  src={featuredEssay.imageUrl}
                  alt={featuredEssay.title}
                  className="w-full h-80 object-cover cursor-pointer"
                  onClick={() => setSelectedEssay(featuredEssay)}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 text-sm font-medium rounded">
                    FEATURED
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <div className="text-sm mb-2">
                      <Link 
                        to={`/category/${featuredEssay.category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="hover:text-red-200 transition-colors"
                      >
                        {featuredEssay.category}
                      </Link>
                    </div>
                    <h1 
                      className="text-2xl md:text-3xl font-bold mb-3 cursor-pointer hover:text-red-200"
                      onClick={() => setSelectedEssay(featuredEssay)}
                    >
                      {featuredEssay.title}
                    </h1>
                    <p className="text-gray-200 mb-3">{featuredEssay.summary}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <Link 
                        to={`/university/${featuredEssay.university.toLowerCase().replace(/\s+/g, '-')}`}
                        className="hover:text-red-200 transition-colors"
                      >
                        {featuredEssay.university}
                      </Link>
                      <span>•</span>
                      <span>{new Date(featuredEssay.publishDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{featuredEssay.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest News Grid */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-6 py-3 font-bold">
                Latest Research
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {latestNews.map((news, index) => (
                    <article key={news.id} className="group">
                      <div className="relative overflow-hidden rounded mb-3">
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                          onClick={() => setSelectedEssay(news)}
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg?auto=compress&cs=tinysrgb&w=800';
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <Link 
                            to={`/category/${news.category.toLowerCase().replace(/\s+/g, '-')}`}
                            className="bg-red-600 text-white px-2 py-1 text-xs font-medium rounded hover:bg-red-700 transition-colors"
                          >
                            {news.category}
                          </Link>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 
                          className="font-bold text-gray-900 group-hover:text-red-600 cursor-pointer line-clamp-2"
                          onClick={() => setSelectedEssay(news)}
                        >
                          {news.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {news.summary}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-3">
                            <Link 
                              to={`/university/${news.university.toLowerCase().replace(/\s+/g, '-')}`}
                              className="hover:text-red-600 transition-colors"
                            >
                              {news.university}
                            </Link>
                            <span>•</span>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{news.readTime} min</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="w-3 h-3" />
                            <MessageCircle className="w-3 h-3" />
                            <Share2 className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-4 py-2 font-bold">
                Categories
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link 
                        to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between text-gray-700 hover:text-red-600 py-1"
                      >
                        <span className="text-sm">{category}</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Latest News Sidebar */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-4 py-2 font-bold">
                Latest News
              </div>
              <div className="p-4 space-y-4">
                {sidebarNews.map((news, index) => (
                  <div key={news.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <div className="flex space-x-3">
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-16 h-12 object-cover rounded cursor-pointer"
                        onClick={() => setSelectedEssay(news)}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800';
                        }}
                      />
                      <div className="flex-1">
                        <h4 
                          className="text-sm font-medium text-gray-900 hover:text-red-600 cursor-pointer line-clamp-2"
                          onClick={() => setSelectedEssay(news)}
                        >
                          {news.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{news.readTime} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contributors (Universities) */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-4 py-2 font-bold flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Top Contributors
              </div>
              <div className="p-4 space-y-3">
                {topUniversities.map((uni, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <Link 
                          to={`/university/${uni.slug}`}
                          className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors"
                        >
                          {uni.name}
                        </Link>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{uni.articles} articles</span>
                          <div className="flex items-center">
                            {[...Array(uni.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link to={`/university/${uni.slug}`}>
                      <Globe className="w-4 h-4 text-gray-400 hover:text-red-600 cursor-pointer" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Zanist Premium Ad */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded shadow p-6 text-center text-white">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Join Zanist Premium</h3>
                <p className="text-red-100 text-sm">
                  Get unlimited access to exclusive research papers, expert analysis, and early access to breakthrough discoveries.
                </p>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-center text-sm">
                  <span className="mr-2">✓</span>
                  <span>Unlimited article access</span>
                </div>
                <div className="flex items-center justify-center text-sm">
                  <span className="mr-2">✓</span>
                  <span>Expert analysis & insights</span>
                </div>
                <div className="flex items-center justify-center text-sm">
                  <span className="mr-2">✓</span>
                  <span>Weekly research digest</span>
                </div>
              </div>
              <button className="bg-white text-red-600 px-4 py-2 rounded font-medium hover:bg-red-50 transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-4 py-2 font-bold">
                Newsletter
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest scientific discoveries delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button className="w-full bg-red-600 text-white py-2 rounded text-sm hover:bg-red-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;