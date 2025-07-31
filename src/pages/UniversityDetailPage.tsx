import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  Award,
  Star,
  Globe,
  Mail,
  Phone,
  Search,
  Filter,
  Clock,
  TrendingUp,
  Eye,
  MessageCircle,
  Share2
} from 'lucide-react';
import { sampleEssays } from '../data/sampleEssays';
import { top50Universities } from '../data/universitiesData';
import EssayDetail from '../components/EssayDetail';

const UniversityDetailPage: React.FC = () => {
  const { universitySlug } = useParams();
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProfessor, setSelectedProfessor] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('about');

  // Find university data
  const university = top50Universities.find(uni => uni.slug === universitySlug);
  
  if (!university) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">University not found</h1>
          <Link to="/universities" className="text-red-600 hover:text-red-700">
            Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  // Mock professors data
  const professors = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      department: 'Computer Science',
      field: 'Quantum Computing',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 's.chen@university.edu',
      researchCount: 45,
      citations: 2450,
      hIndex: 35,
      specialization: 'Quantum Algorithms, Error Correction',
      bio: 'Leading researcher in quantum computing with focus on error correction and algorithm development.'
    },
    {
      id: '2',
      name: 'Prof. Michael Johnson',
      department: 'Physics',
      field: 'Nuclear Physics',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'm.johnson@university.edu',
      researchCount: 38,
      citations: 1890,
      hIndex: 28,
      specialization: 'Fusion Energy, Plasma Physics',
      bio: 'Expert in fusion energy research and plasma physics applications.'
    },
    {
      id: '3',
      name: 'Dr. Elena Rodriguez',
      department: 'Biology',
      field: 'Biotechnology',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'e.rodriguez@university.edu',
      researchCount: 52,
      citations: 3200,
      hIndex: 42,
      specialization: 'Gene Editing, CRISPR Technology',
      bio: 'Pioneer in gene editing technologies and therapeutic applications.'
    }
  ];

  // Filter university research
  const universityResearch = sampleEssays.filter(essay => 
    essay.university.toLowerCase().includes(university.shortName.toLowerCase())
  );

  const categories = [...new Set(universityResearch.map(essay => essay.category))];

  // Apply filters to research
  let filteredResearch = universityResearch.filter(essay => {
    const matchesSearch = essay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         essay.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || essay.category === selectedCategory;
    
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
    
    return matchesSearch && matchesCategory && matchesTime;
  });

  // Filter professors
  const filteredProfessors = professors.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.field.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProfessor = selectedProfessor === 'all' || prof.name === selectedProfessor;
    
    return matchesSearch && matchesProfessor;
  });

  if (selectedEssay) {
    return <EssayDetail essay={selectedEssay} onBack={() => setSelectedEssay(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Banner */}
      <div className="relative">
        <img
          src={university.logo}
          alt={university.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 text-white p-4 sm:p-6">
          <div className="container mx-auto">
            <Link
              to="/universities"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-3 sm:mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Universities</span>
            </Link>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <img
                src={university.logo}
                alt={university.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-white/10 p-2"
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 break-words">{university.name}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white/90 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="break-words">{university.city}, {university.country}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>Founded {university.founded}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>Ranking #{university.ranking}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            {[
              { id: 'about', label: 'About', icon: BookOpen },
              { id: 'research', label: 'Research', icon: Search },
              { id: 'professors', label: 'Professors', icon: Users },
              { id: 'contact', label: 'Contact', icon: Mail }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-3 sm:px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">About {university.shortName}</h2>
                <p className="text-gray-700 leading-relaxed mb-6 break-words">{university.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {university.specialties.map((specialty, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm break-words">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-red-600">{university.stats.acceptanceRate}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Acceptance Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{university.stats.studentFacultyRatio}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Student:Faculty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">{university.stats.internationalStudents}</div>
                    <div className="text-xs sm:text-sm text-gray-600">International</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">{university.stats.researchFunding}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Research Funding</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Students</span>
                    <span className="font-medium text-sm">{university.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Faculty</span>
                    <span className="font-medium text-sm">{university.professors}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Nobel Prizes</span>
                    <span className="font-medium text-sm">{university.nobelPrizes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Research Papers</span>
                    <span className="font-medium text-sm">{university.totalResearch}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 break-words">{university.contact.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 break-all">{university.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 break-all">{university.contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <a href={`https://${university.website}`} className="text-sm text-red-600 hover:text-red-700 break-all">
                      {university.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div>
            {/* Research Filters */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search research papers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="text-sm text-gray-600">
                  {filteredResearch.length} papers found
                </div>
              </div>
            </div>

            {/* Research Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResearch.map((research) => (
                <div key={research.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <img
                    src={research.imageUrl}
                    alt={research.title}
                    className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                    onClick={() => setSelectedEssay(research)}
                  />
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-medium rounded">
                        {research.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(research.publishDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 
                      className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-red-600 break-words"
                      onClick={() => setSelectedEssay(research)}
                    >
                      {research.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 break-words">
                      {research.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{research.readTime} min</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 cursor-pointer hover:text-red-600" />
                        <MessageCircle className="w-4 h-4 cursor-pointer hover:text-red-600" />
                        <Share2 className="w-4 h-4 cursor-pointer hover:text-red-600" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'professors' && (
          <div>
            {/* Professor Filters */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search professors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
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
                <div className="text-sm text-gray-600">
                  {filteredProfessors.length} professors found
                </div>
              </div>
            </div>

            {/* Professors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfessors.map((professor) => (
                <div key={professor.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 sm:p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={professor.photo}
                      alt={professor.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-gray-900 break-words">{professor.name}</h3>
                      <div className="text-sm text-gray-600 break-words">{professor.department}</div>
                      <div className="text-sm text-red-600 break-words">{professor.field}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 break-words">{professor.bio}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium">Specialization:</span> 
                      <span className="break-words ml-1">{professor.specialization}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Email:</span> 
                      <a href={`mailto:${professor.email}`} className="text-red-600 hover:text-red-700 ml-1 break-all">
                        {professor.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center border-t pt-4">
                    <div>
                      <div className="text-lg font-bold text-blue-600">{professor.researchCount}</div>
                      <div className="text-xs text-gray-600">Papers</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{professor.citations}</div>
                      <div className="text-xs text-gray-600">Citations</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">{professor.hIndex}</div>
                      <div className="text-xs text-gray-600">H-Index</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Contact {university.shortName}</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900">Address</div>
                    <div className="text-gray-700 break-words">{university.contact.address}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-gray-700 break-all">{university.contact.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-700 break-all">{university.contact.email}</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900">Website</div>
                    <a href={`https://${university.website}`} className="text-red-600 hover:text-red-700 break-all">
                      {university.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-red-600">{university.ranking}</div>
                  <div className="text-xs sm:text-sm text-gray-600">World Ranking</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">{university.nobelPrizes}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Nobel Prizes</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">{university.totalResearch}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Research Papers</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{university.students.toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Students</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityDetailPage;