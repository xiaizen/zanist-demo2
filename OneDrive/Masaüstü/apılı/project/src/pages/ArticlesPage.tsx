import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Eye, ExternalLink, Tag } from 'lucide-react';
import { sampleEssays } from '../data/sampleEssays';
import { Essay } from '../types/Essay';
import AddEssayForm from '../components/AddEssayForm';

const ArticlesPage: React.FC = () => {
  const [essays, setEssays] = useState<Essay[]>(sampleEssays);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const filteredEssays = essays.filter(essay => {
    const matchesSearch = essay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         essay.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         essay.professor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || essay.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddEssay = (newEssay: Omit<Essay, 'id'>) => {
    const essay: Essay = {
      ...newEssay,
      id: `${Date.now()}`
    };
    setEssays([essay, ...essays]);
    
    // Show success message
    alert('Essay published successfully!');
  };

  const handleDeleteEssay = (id: string) => {
    if (window.confirm('Bu makaleyi silmek istediğinizden emin misiniz?')) {
      setEssays(essays.filter(essay => essay.id !== id));
    }
  };

  const toggleFeatured = (id: string) => {
    setEssays(essays.map(essay => 
      essay.id === id 
        ? { ...essay, isFeatured: !essay.isFeatured }
        : { ...essay, isFeatured: false } // Only one featured article
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Makale Yönetimi</h1>
          <p className="text-gray-600 mt-1">Bilimsel makaleleri yönetin ve düzenleyin</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddFormOpen(true)}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Makale</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Makale ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Articles Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredEssays.map((essay, index) => (
          <motion.div
            key={essay.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative">
              <img
                src={essay.imageUrl}
                alt={essay.title}
                className="w-full h-48 object-cover"
              />
              {essay.isFeatured && (
                <div className="absolute top-2 left-2">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Öne Çıkan
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {essay.category}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                {essay.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {essay.summary}
              </p>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{essay.university}</span>
                  <span>{essay.readTime} dk</span>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Professor:</strong> {essay.professor}
                </div>
                {essay.referenceLink && (
                  <div className="flex items-center space-x-1">
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                    <a 
                      href={essay.referenceLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-red-600 hover:text-red-700 truncate"
                    >
                      Reference Link
                    </a>
                  </div>
                )}
                {essay.tags && essay.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3 text-gray-400" />
                    <div className="flex flex-wrap gap-1">
                      {essay.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-gray-100 text-gray-600 px-1 py-0.5 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                      {essay.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{essay.tags.length - 2}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(essay.publishDate).toLocaleDateString('tr-TR')}
                </span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFeatured(essay.id)}
                    className={`p-1 rounded transition-colors ${
                      essay.isFeatured 
                        ? 'text-yellow-600 hover:text-yellow-700' 
                        : 'text-gray-400 hover:text-yellow-600'
                    }`}
                    title={essay.isFeatured ? 'Öne çıkarmayı kaldır' : 'Öne çıkar'}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                    title="Düzenle"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEssay(essay.id)}
                    className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredEssays.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Makale bulunamadı</h3>
          <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin.</p>
        </motion.div>
      )}

      {/* Add Essay Form */}
      <AddEssayForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={handleAddEssay}
      />
    </div>
  );
};

export default ArticlesPage;