import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import { Essay } from '../types/Essay';

interface ArticleGridProps {
  essays: Essay[];
  onSelect: (essay: Essay) => void;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ essays, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {essays.map((essay) => (
        <article
          key={essay.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => onSelect(essay)}
        >
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={essay.imageUrl}
              alt={essay.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg?auto=compress&cs=tinysrgb&w=800';
              }}
            />
            <div className="absolute top-4 left-4">
              <Link 
                to={`/category/${essay.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {essay.category}
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4" />
              <Link 
                to={`/university/${essay.university.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-red-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {essay.university}
              </Link>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{essay.readTime} min</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
              {essay.title}
            </h3>
            
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {essay.summary}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(essay.publishDate).toLocaleDateString()}
              </span>
              <button className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors">
                Read More →
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleGrid;