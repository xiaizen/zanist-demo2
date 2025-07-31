import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Calendar, Share2, Bookmark, User, ExternalLink, Tag } from 'lucide-react';
import { Essay } from '../types/Essay';
import { professors } from '../data/professorsData';

interface EssayDetailProps {
  essay: Essay;
  onBack: () => void;
}

const EssayDetail: React.FC<EssayDetailProps> = ({ essay, onBack }) => {
  // Find the professor who contributed to this research
  const contributingProfessor = professors.find(prof => 
    prof.name.toLowerCase().includes(essay.professor.toLowerCase()) ||
    prof.currentUniversity === essay.university ||
    essay.professor.toLowerCase().includes(prof.name.split(' ')[1]?.toLowerCase() || '')
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 hover:text-red-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to News</span>
          </button>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-3">
            <div className="bg-white rounded shadow overflow-hidden">
              {/* Article Header */}
              <div className="relative">
                <img
                  src={essay.imageUrl}
                  alt={essay.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-red-600 text-white px-4 py-2 rounded font-medium">
                    {essay.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {essay.title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-6 mb-8">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{essay.university}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{essay.professor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(essay.publishDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{essay.readTime} min read</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                      <Bookmark className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>

                {/* Reference Link */}
                {essay.referenceLink && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Original Research Paper</span>
                    </div>
                    <a 
                      href={essay.referenceLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm break-all"
                    >
                      {essay.referenceLink}
                    </a>
                    <p className="text-xs text-blue-700 mt-2">
                      Click to access the peer-reviewed research paper and detailed methodology
                    </p>
                  </div>
                )}

                {/* Contributing Professor */}
                {contributingProfessor && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <User className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">Lead Researcher</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <img
                        src={contributingProfessor.photo}
                        alt={contributingProfessor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <Link 
                          to={`/professor/${contributingProfessor.id}`}
                          className="font-semibold text-green-900 hover:text-green-700 transition-colors"
                        >
                          {contributingProfessor.name}
                        </Link>
                        <div className="text-sm text-green-700">
                          {contributingProfessor.title} at {contributingProfessor.currentUniversity}
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          {contributingProfessor.stats.totalPublications} publications • {contributingProfessor.stats.totalCitations.toLocaleString()} citations
                        </div>
                      </div>
                      <Link 
                        to={`/professor/${contributingProfessor.id}`}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {essay.tags && essay.tags.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Tag className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-900">Research Keywords</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {essay.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Article Summary */}
                <div className="bg-gray-50 p-6 rounded mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Research Summary</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {essay.summary}
                  </p>
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-800 leading-relaxed">
                    {essay.content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('# ')) {
                        return (
                          <h1 key={index} className="text-3xl font-bold mb-6 mt-8 text-gray-900">
                            {paragraph.substring(2)}
                          </h1>
                        );
                      } else if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-2xl font-semibold mb-4 mt-8 text-gray-900">
                            {paragraph.substring(3)}
                          </h2>
                        );
                      } else if (paragraph.startsWith('- ')) {
                        return (
                          <li key={index} className="mb-2 ml-6 text-gray-700">
                            {paragraph.substring(2)}
                          </li>
                        );
                      } else if (paragraph.trim() === '') {
                        return <br key={index} />;
                      } else {
                        return (
                          <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg">
                            {paragraph}
                          </p>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Author Info */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-4 py-3 font-bold">
                Research Team
              </div>
              <div className="p-4">
                {contributingProfessor ? (
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={contributingProfessor.photo}
                        alt={contributingProfessor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <Link 
                          to={`/professor/${contributingProfessor.id}`}
                          className="font-medium text-gray-900 hover:text-red-600 transition-colors"
                        >
                          {contributingProfessor.name}
                        </Link>
                        <p className="text-sm text-gray-600">{contributingProfessor.currentUniversity}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {contributingProfessor.bio.substring(0, 150)}...
                    </p>
                    <Link 
                      to={`/professor/${contributingProfessor.id}`}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      View Full Profile →
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{essay.professor}</h4>
                        <p className="text-sm text-gray-600">{essay.university}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Leading researcher in {essay.category.toLowerCase()} with extensive experience in cutting-edge scientific research.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-4 py-3 font-bold">
                Related Articles
              </div>
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <h4 className="text-sm font-medium text-gray-900 hover:text-red-600 cursor-pointer mb-2">
                      Related Research Article Title {item}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>5 min read</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zanist Premium Ad */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded shadow p-6 text-center text-white">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Zanist Premium</h3>
                <p className="text-red-100 text-sm">
                  Access exclusive research papers and expert analysis from leading scientists worldwide.
                </p>
              </div>
              <div className="space-y-1 mb-4 text-sm">
                <div className="flex items-center justify-center">
                  <span className="mr-2">✓</span>
                  <span>Unlimited access</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-2">✓</span>
                  <span>Expert insights</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="mr-2">✓</span>
                  <span>Early access</span>
                </div>
              </div>
              <button className="bg-white text-red-600 px-4 py-2 rounded font-medium hover:bg-red-50 transition-colors text-sm">
                Upgrade Now
              </button>
            </div>

            {/* Newsletter */}
            <div className="bg-white rounded shadow">
              <div className="bg-red-600 text-white px-4 py-3 font-bold">
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
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EssayDetail;