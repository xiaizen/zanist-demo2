import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import { Essay } from '../types/Essay';

interface FeaturedArticleProps {
  essay: Essay;
  onSelect: (essay: Essay) => void;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ essay, onSelect }) => {
  return (
    <div className="relative group cursor-pointer" onClick={() => onSelect(essay)}>
      <div className="relative overflow-hidden rounded-lg bg-gray-900">
        <img
          src={essay.imageUrl}
          alt={essay.title}
          className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <Link 
              to={`/category/${essay.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-red-600 px-3 py-1 rounded text-sm font-medium inline-block w-fit hover:bg-red-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {essay.category}
            </Link>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <Link 
                to={`/university/${essay.university.toLowerCase().replace(/\s+/g, '-')}`}
                className="break-words hover:text-red-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {essay.university}
              </Link>
            </div>
          </div>
          
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight break-words">
            {essay.title}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-3 sm:mb-4 leading-relaxed break-words">
            {essay.summary}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{essay.readTime} min read</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>{new Date(essay.publishDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;