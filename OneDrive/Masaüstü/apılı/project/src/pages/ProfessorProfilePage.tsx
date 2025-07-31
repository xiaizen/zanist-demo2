import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Mail,
  Globe,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Users,
  ExternalLink,
  Download,
  Star,
  TrendingUp,
  Building,
  GraduationCap,
  Briefcase,
  DollarSign,
  FileText,
  Linkedin
} from 'lucide-react';
import { getProfessorById } from '../data/professorsData';
import { sampleEssays } from '../data/sampleEssays';
import EssayDetail from '../components/EssayDetail';

const ProfessorProfilePage: React.FC = () => {
  const { professorId } = useParams();
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const professor = getProfessorById(professorId || '');

  if (!professor) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Professor not found</h1>
          <Link to="/" className="text-red-600 hover:text-red-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Find professor's research papers
  const professorResearch = sampleEssays.filter(essay => 
    essay.professor.toLowerCase().includes(professor.name.split(' ')[1]?.toLowerCase() || '') ||
    essay.university === professor.currentUniversity
  );

  if (selectedEssay) {
    return <EssayDetail essay={selectedEssay} onBack={() => setSelectedEssay(null)} />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'research', label: 'Research', icon: FileText },
    { id: 'publications', label: 'Publications', icon: Award },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'grants', label: 'Grants', icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={professor.photo}
              alt={professor.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/20"
            />
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{professor.name}</h1>
              <div className="text-xl text-red-100 mb-2">{professor.title}</div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white/90">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  <span>{professor.currentUniversity}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{professor.department}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  <span>{professor.field}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{professor.stats.totalPublications}</div>
              <div className="text-sm text-gray-600">Publications</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{professor.stats.totalCitations.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Citations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{professor.stats.hIndex}</div>
              <div className="text-sm text-gray-600">H-Index</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{professor.awards.length}</div>
              <div className="text-sm text-gray-600">Awards</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Biography */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Biography</h2>
                <p className="text-gray-700 leading-relaxed">{professor.bio}</p>
              </div>

              {/* Current Research */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Research</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {professor.currentResearch.map((research, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-gray-900">{research}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Areas */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {professor.researchAreas.map((area, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Publications */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Publications</h2>
                <div className="space-y-4">
                  {professor.publications.slice(0, 3).map((pub, index) => (
                    <div key={index} className="border-l-4 border-red-600 pl-4">
                      <h3 className="font-semibold text-gray-900">{pub.title}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        {pub.journal} ({pub.year}) • {pub.citations} citations
                      </div>
                      <a 
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 text-sm flex items-center mt-2"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Publication
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${professor.email}`} className="text-red-600 hover:text-red-700 text-sm">
                      {professor.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-4 h-4 text-gray-400" />
                    <a href={professor.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 text-sm">
                      LinkedIn Profile
                    </a>
                  </div>
                  {professor.personalWebsite && (
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a href={professor.personalWebsite} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 text-sm">
                        Personal Website
                      </a>
                    </div>
                  )}
                  {professor.stats.researchGate && (
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <a href={professor.stats.researchGate} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 text-sm">
                        ResearchGate
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Awards */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Awards</h3>
                <div className="space-y-3">
                  {professor.awards.slice(0, 3).map((award, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Award className="w-4 h-4 text-yellow-500 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{award.name}</div>
                        <div className="text-xs text-gray-600">{award.organization} ({award.year})</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collaborations */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Collaborations</h3>
                <div className="space-y-2">
                  {professor.collaborations.map((collab, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-700">{collab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nobel Prizes */}
              {professor.nobelPrizes && (
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg shadow p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 text-yellow-600 mr-2" />
                    Nobel Prize Winner
                  </h3>
                  {professor.nobelPrizes.map((nobel, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                      <div className="font-medium text-gray-900">{nobel.category} ({nobel.year})</div>
                      <div className="text-sm text-gray-700">{nobel.achievement}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Papers</h2>
            {professorResearch.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professorResearch.map((research) => (
                  <div key={research.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <img
                      src={research.imageUrl}
                      alt={research.title}
                      className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                      onClick={() => setSelectedEssay(research)}
                    />
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-medium rounded">
                          {research.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(research.publishDate).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 
                        className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-red-600"
                        onClick={() => setSelectedEssay(research)}
                      >
                        {research.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {research.summary}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{research.readTime} min read</span>
                        <button 
                          onClick={() => setSelectedEssay(research)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No research papers found</h3>
                <p className="text-gray-500">Research papers from this professor will appear here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Publications</h2>
            <div className="space-y-6">
              {professor.publications.map((pub, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{pub.title}</h3>
                  <div className="text-gray-600 mb-2">
                    <span className="font-medium">{pub.journal}</span> • {pub.year}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {pub.citations} citations
                    </div>
                    <a 
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 text-sm flex items-center"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Publication
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            {/* Education */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
              <div className="space-y-4">
                {professor.education.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <GraduationCap className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <div className="text-gray-600">{edu.university}</div>
                      <div className="text-sm text-gray-500">{edu.field} • {edu.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Previous Positions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Career History</h2>
              <div className="space-y-4">
                {professor.previousPositions.map((pos, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <Briefcase className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{pos.position}</h3>
                      <div className="text-gray-600">{pos.university}</div>
                      <div className="text-sm text-gray-500">{pos.years}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'grants' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Grants</h2>
            <div className="space-y-6">
              {professor.fundingGrants.map((grant, index) => (
                <div key={index} className="border-l-4 border-green-600 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900">{grant.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-medium">{grant.amount}</span>
                    </div>
                    <div>{grant.agency}</div>
                    <div>{grant.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorProfilePage;