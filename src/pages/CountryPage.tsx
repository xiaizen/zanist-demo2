import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Award,
  BookOpen,
  Users,
  TrendingUp,
  Globe,
  Star,
  ChevronRight
} from 'lucide-react';
import { top50Universities, countries } from '../data/universitiesData';

const CountryPage: React.FC = () => {
  const { countrySlug } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRanking, setSelectedRanking] = useState('all');
  const [sortBy, setSortBy] = useState('ranking');

  // Find country data
  const country = countries.find(c => c.slug === countrySlug);
  
  if (!country) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Country not found</h1>
          <Link to="/universities" className="text-red-600 hover:text-red-700">
            Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  // Filter universities by country
  const countryUniversities = top50Universities.filter(uni => 
    uni.country.toLowerCase().replace(/\s+/g, '-') === countrySlug
  );

  // Apply filters
  let filteredUniversities = countryUniversities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRanking = selectedRanking === 'all' || 
                          (selectedRanking === 'top10' && uni.ranking <= 10) ||
                          (selectedRanking === 'top25' && uni.ranking <= 25);
    
    return matchesSearch && matchesRanking;
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
            <Link to="/universities" className="hover:text-red-200">Universities</Link>
            <span>›</span>
            <span>{country.name}</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative group">
              <img 
                src={country.flag} 
                alt={`${country.name} flag`} 
                className="w-20 h-14 object-cover rounded shadow-lg transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{country.name}</h1>
              <p className="text-red-100 text-lg max-w-3xl">
                {country.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>{country.universities} Universities</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>{country.totalResearch.toLocaleString()} Research Papers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>{country.nobelPrizes} Nobel Prizes</span>
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
                  placeholder="Search universities in this country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
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
            <div className="lg:col-span-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {filteredUniversities.length} universities found
              </span>
              <Link
                to="/universities"
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                View All Countries →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Country Statistics */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {country.name} Research Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                #{Math.min(...countryUniversities.map(u => u.ranking))}
              </div>
              <div className="text-gray-600">Highest Ranking</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {country.universities}
              </div>
              <div className="text-gray-600">Top Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {country.totalResearch.toLocaleString()}
              </div>
              <div className="text-gray-600">Research Papers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {country.nobelPrizes}
              </div>
              <div className="text-gray-600">Nobel Prizes</div>
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
                    <span>{university.city}</span>
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

      {/* Related Countries */}
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Explore Other Countries
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {countries.filter(c => c.slug !== countrySlug).slice(0, 4).map((otherCountry) => (
              <Link
                key={otherCountry.slug}
                to={`/country/${otherCountry.slug}`}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="mb-2 relative">
                  <img 
                    src={otherCountry.flag} 
                    alt={`${otherCountry.name} flag`} 
                    className="w-12 h-8 object-cover mx-auto rounded transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                  {otherCountry.name}
                </h3>
                <div className="text-sm text-gray-600 mt-1">
                  {otherCountry.universities} universities
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;