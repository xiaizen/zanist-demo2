import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter,
  MapPin,
  Users,
  BookOpen,
  Award,
  Star,
  TrendingUp,
  Globe,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { top50Universities, countries } from '../data/universitiesData';

const UniversitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedRanking, setSelectedRanking] = useState('all');
  const [sortBy, setSortBy] = useState('ranking');
  const [viewMode, setViewMode] = useState('universities');

  // Apply filters
  let filteredUniversities = top50Universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || uni.country === selectedCountry;
    const matchesRanking = selectedRanking === 'all' || 
                          (selectedRanking === 'top10' && uni.ranking <= 10) ||
                          (selectedRanking === 'top25' && uni.ranking <= 25);
    
    return matchesSearch && matchesCountry && matchesRanking;
  });

  // Sort universities
  filteredUniversities.sort((a, b) => {
    switch (sortBy) {
      case 'ranking':
        return a.ranking - b.ranking;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'research':
        return b.totalResearch - a.totalResearch;
      case 'nobel':
        return b.nobelPrizes - a.nobelPrizes;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="hover:text-red-200">Home</Link>
            <span>›</span>
            <span>Universities</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Top 50 Universities Worldwide</h1>
          <p className="text-red-100 text-lg max-w-3xl">
            Explore the world's leading universities and their groundbreaking research contributions to science and technology.
          </p>
          
          <div className="flex items-center space-x-8 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>{top50Universities.length} Universities</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>{top50Universities.reduce((sum, uni) => sum + uni.totalResearch, 0).toLocaleString()} Research Papers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>{top50Universities.reduce((sum, uni) => sum + uni.nobelPrizes, 0)} Nobel Prizes</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('universities')}
                className={`px-6 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                  viewMode === 'universities' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Universities
              </button>
              <button
                onClick={() => setViewMode('countries')}
                className={`px-6 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                  viewMode === 'countries' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Countries
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'universities' ? (
        <>
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
                      placeholder="Search universities, cities, specialties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Country Filter */}
                <div className="lg:col-span-2">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="all">All Countries</option>
                    {countries.map(country => (
                      <option key={country.name} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>

                {/* Ranking Filter */}
                <div className="lg:col-span-2">
                  <select
                    value={selectedRanking}
                    onChange={(e) => setSelectedRanking(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="all">All Rankings</option>
                    <option value="top10">Top 10</option>
                    <option value="top25">Top 25</option>
                  </select>
                </div>

                {/* Sort Filter */}
                <div className="lg:col-span-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="ranking">By Ranking</option>
                    <option value="name">By Name</option>
                    <option value="research">By Research</option>
                    <option value="nobel">By Nobel Prizes</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="lg:col-span-2 flex items-center">
                  <span className="text-sm text-gray-600">
                    {filteredUniversities.length} universities found
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Universities Grid */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map((university) => (
                <div key={university.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                  {/* University Header */}
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center p-4">
                      <img
                        src={university.logo}
                        alt={university.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x100/f3f4f6/6b7280?text=' + encodeURIComponent(university.shortName);
                        }}
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
                        #{university.ranking}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center bg-white/90 px-2 py-1 rounded">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* University Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <Link 
                        to={`/university/${university.slug}`}
                        className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors mb-1 block"
                      >
                        {university.shortName}
                      </Link>
                      <h4 className="text-sm text-gray-600 mb-2">{university.name}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <Link 
                          to={`/country/${university.country.toLowerCase().replace(/\s+/g, '-')}`}
                          className="hover:text-red-600 transition-colors"
                        >
                          {university.city}, {university.country}
                        </Link>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {university.description}
                    </p>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{university.nobelPrizes}</div>
                        <div className="text-xs text-gray-500">Nobel Prizes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{university.recentResearch}</div>
                        <div className="text-xs text-gray-500">Recent Research</div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {university.specialties.slice(0, 3).map((specialty, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Link
                        to={`/university/${university.slug}`}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded text-sm hover:bg-red-700 transition-colors text-center"
                      >
                        View Details
                      </Link>
                      <a
                        href={`https://${university.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredUniversities.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No universities found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Countries View */
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
              <Link
                key={country.slug}
                to={`/country/${country.slug}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group"
              >
                <div className="p-6 text-center">
                  <div className="mb-4 relative">
                    <img 
                      src={country.flag} 
                      alt={`${country.name} flag`} 
                      className="w-16 h-12 object-cover mx-auto rounded shadow-md transition-transform duration-300 group-hover:scale-110" 
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/64x48/f3f4f6/6b7280?text=' + encodeURIComponent(country.name.substring(0, 2));
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-600 transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {country.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">{country.universities}</div>
                      <div className="text-xs text-gray-500">Universities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{(country.totalResearch / 1000).toFixed(1)}K</div>
                      <div className="text-xs text-gray-500">Research</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600">{country.nobelPrizes}</div>
                      <div className="text-xs text-gray-500">Nobel</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Top Universities:</strong>
                    <div className="mt-1">
                      {country.topUniversities.slice(0, 3).join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center justify-center text-red-600 font-medium text-sm">
                    <span>Explore Universities</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversitiesPage;