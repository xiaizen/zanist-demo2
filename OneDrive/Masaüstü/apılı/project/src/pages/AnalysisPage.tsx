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

const AnalysisPage: React.FC = () => {
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedProfessor, setSelectedProfessor] = useState('all');

  // Mock professor analysis data
  const professorAnalyses = [
    {
      id: '1',
      researchId: '1',
      researchTitle: 'Quantum Computing Breakthrough: New Algorithms Show Promise for Climate Modeling',
      professor: {
        name: 'Dr. Michael Thompson',
        university: 'Stanford University',
        field: 'Quantum Physics',
        credentials: 'PhD in Quantum Computing, 15+ years experience',
        photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8,
        citations: 2450
      },
      analysis: {
        title: 'Revolutionary Approach to Climate Prediction',
        content: `This research represents a paradigm shift in how we approach climate modeling. The quantum algorithms developed by Dr. Chen's team at MIT could potentially reduce computation time from weeks to hours, making real-time climate prediction a reality.

The most impressive aspect is their novel approach to quantum error correction, which addresses one of the fundamental challenges in quantum computing. Their method shows 99.7% accuracy in preliminary tests, which is unprecedented in this field.

However, I believe the practical implementation will face significant challenges. The current quantum hardware limitations mean we're still 3-5 years away from seeing these algorithms deployed at scale. Nevertheless, this work lays crucial groundwork for future developments.`,
        pros: [
          'Innovative quantum error correction method',
          'Significant reduction in computation time',
          'High accuracy in preliminary testing',
          'Strong theoretical foundation'
        ],
        cons: [
          'Hardware limitations for immediate implementation',
          'Limited testing on real-world climate data',
          'High computational resource requirements',
          'Scalability concerns for global deployment'
        ],
        rating: 4.5,
        impact: 'High',
        novelty: 'Very High',
        methodology: 'Excellent'
      },
      publishDate: '2024-01-16',
      likes: 156,
      dislikes: 12,
      comments: 34,
      views: 2340
    },
    {
      id: '2',
      researchId: '2',
      researchTitle: 'CRISPR 3.0: Stanford Scientists Achieve Unprecedented Gene Editing Precision',
      professor: {
        name: 'Prof. Sarah Williams',
        university: 'Harvard Medical School',
        field: 'Biotechnology',
        credentials: 'MD, PhD in Molecular Biology, 20+ years experience',
        photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        citations: 3200
      },
      analysis: {
        title: 'A Game-Changer for Genetic Medicine',
        content: `The precision achieved in this CRISPR 3.0 system is truly remarkable. Achieving 99.9% accuracy in single-base editing opens doors to treating genetic diseases that were previously considered untreatable.

What sets this work apart is the innovative protein engineering approach. The enhanced Cas proteins show remarkable specificity, virtually eliminating off-target effects that have been a major concern in gene therapy applications.

The clinical implications are enormous. Diseases like sickle cell anemia, Huntington's disease, and certain forms of inherited blindness could potentially be cured rather than just managed. This represents a fundamental shift from symptomatic treatment to actual genetic correction.`,
        pros: [
          'Unprecedented editing precision (99.9%)',
          'Virtually eliminates off-target effects',
          'Broad therapeutic applications',
          'Robust experimental validation'
        ],
        cons: [
          'Long-term effects still unknown',
          'Regulatory approval will take years',
          'High treatment costs expected',
          'Ethical considerations for germline editing'
        ],
        rating: 4.8,
        impact: 'Very High',
        novelty: 'High',
        methodology: 'Excellent'
      },
      publishDate: '2024-01-15',
      likes: 203,
      dislikes: 8,
      comments: 67,
      views: 3450
    },
    {
      id: '3',
      researchId: '3',
      researchTitle: 'Revolutionary Solar Cell Design Achieves 47% Efficiency at Caltech',
      professor: {
        name: 'Dr. James Chen',
        university: 'MIT',
        field: 'Renewable Energy',
        credentials: 'PhD in Materials Science, 12+ years experience',
        photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.7,
        citations: 1890
      },
      analysis: {
        title: 'Breaking the Efficiency Barrier',
        content: `This achievement represents a significant milestone in photovoltaic technology. Reaching 47% efficiency in a practical solar cell design brings us much closer to the theoretical maximum efficiency limits.

The tandem perovskite-silicon architecture is particularly clever. By optimizing the bandgap alignment and implementing advanced light-trapping structures, they've managed to capture a much broader spectrum of sunlight than conventional cells.

From a commercial perspective, this could be transformative. Even if manufacturing costs are initially high, the increased efficiency could make solar power competitive in regions where it's currently not economically viable.`,
        pros: [
          'Record-breaking efficiency achievement',
          'Practical tandem cell design',
          'Broad spectrum light capture',
          'Commercial viability potential'
        ],
        cons: [
          'Manufacturing complexity and costs',
          'Perovskite stability concerns',
          'Scalability challenges',
          'Competition with existing technologies'
        ],
        rating: 4.6,
        impact: 'High',
        novelty: 'High',
        methodology: 'Very Good'
      },
      publishDate: '2024-01-14',
      likes: 178,
      dislikes: 15,
      comments: 45,
      views: 2890
    }
  ];

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
  const professors = [
    'Dr. Michael Thompson',
    'Prof. Sarah Williams', 
    'Dr. James Chen',
    'Prof. Elena Rodriguez',
    'Dr. David Kim'
  ];

  // Apply filters
  const filteredAnalyses = professorAnalyses.filter(analysis => {
    const matchesSearch = analysis.researchTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         analysis.professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         analysis.analysis.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || analysis.professor.field === selectedCategory;
    const matchesUniversity = selectedUniversity === 'all' || analysis.professor.university === selectedUniversity;
    const matchesProfessor = selectedProfessor === 'all' || analysis.professor.name === selectedProfessor;
    
    return matchesSearch && matchesCategory && matchesUniversity && matchesProfessor;
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
            <Link to="/" className="hover:text-red-200">Home</Link>
            <span>›</span>
            <span>Analysis</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Expert Analysis</h1>
          <p className="text-red-100 text-lg max-w-3xl">
            In-depth analysis and expert opinions from leading professors and researchers on the latest scientific breakthroughs and discoveries.
          </p>
          
          <div className="flex items-center space-x-8 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>{filteredAnalyses.length} Expert Reviews</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{professors.length} Contributing Professors</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>{categories.length} Research Fields</span>
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
                  placeholder="Search analyses, professors, research topics..."
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
                <option value="all">All Fields</option>
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

            {/* Professor Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedProfessor}
                onChange={(e) => setSelectedProfessor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Professors</option>
                {professors.map(prof => (
                  <option key={prof} value={prof}>{prof}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="lg:col-span-2 flex items-center">
              <span className="text-sm text-gray-600">
                {filteredAnalyses.length} analysis found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {filteredAnalyses.map((analysis) => (
            <div key={analysis.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Research Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 
                  className="text-xl font-bold text-gray-900 hover:text-red-600 cursor-pointer mb-2"
                  onClick={() => {
                    const essay = sampleEssays.find(e => e.id === analysis.researchId);
                    if (essay) setSelectedEssay(essay);
                  }}
                >
                  {analysis.researchTitle}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Analysis published {new Date(analysis.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{analysis.views} views</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Professor Info */}
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={analysis.professor.photo}
                    alt={analysis.professor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{analysis.professor.name}</h3>
                    <div className="text-sm text-gray-600 mb-1">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {analysis.professor.university}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{analysis.professor.credentials}</div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{analysis.professor.rating}/5.0</span>
                      </div>
                      <div>{analysis.professor.citations} citations</div>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {analysis.professor.field}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Content */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Quote className="w-5 h-5 text-red-600 mr-2" />
                    <h4 className="text-xl font-semibold text-gray-900">{analysis.analysis.title}</h4>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-600">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {analysis.analysis.content}
                    </p>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h5 className="font-semibold text-green-800 mb-3 flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Strengths
                    </h5>
                    <ul className="space-y-2">
                      {analysis.analysis.pros.map((pro, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-red-800 mb-3 flex items-center">
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Limitations
                    </h5>
                    <ul className="space-y-2">
                      {analysis.analysis.cons.map((con, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Rating Metrics */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Expert Rating</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{analysis.analysis.rating}</div>
                      <div className="text-sm text-gray-600">Overall</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">{analysis.analysis.impact}</div>
                      <div className="text-sm text-gray-600">Impact</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-purple-600">{analysis.analysis.novelty}</div>
                      <div className="text-sm text-gray-600">Novelty</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">{analysis.analysis.methodology}</div>
                      <div className="text-sm text-gray-600">Methodology</div>
                    </div>
                  </div>
                </div>

                {/* Engagement */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{analysis.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                      <span>{analysis.dislikes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{analysis.comments} comments</span>
                    </button>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnalyses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No analyses found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;