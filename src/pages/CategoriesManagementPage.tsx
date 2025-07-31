import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  BookOpen,
  TrendingUp,
  Eye,
  Users
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  articleCount: number;
  isActive: boolean;
  createdAt: string;
}

const CategoriesManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Quantum Physics',
      slug: 'quantum-physics',
      description: 'Explore the fundamental nature of matter and energy at the smallest scales.',
      color: '#3b82f6',
      icon: '⚛️',
      articleCount: 156,
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Biotechnology',
      slug: 'biotechnology',
      description: 'Revolutionary advances in genetic engineering and biological systems.',
      color: '#10b981',
      icon: '🧬',
      articleCount: 203,
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Artificial Intelligence',
      slug: 'artificial-intelligence',
      description: 'Cutting-edge developments in machine learning and cognitive computing.',
      color: '#8b5cf6',
      icon: '🤖',
      articleCount: 289,
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Renewable Energy',
      slug: 'renewable-energy',
      description: 'Sustainable energy solutions for a cleaner future.',
      color: '#f59e0b',
      icon: '🌱',
      articleCount: 178,
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '5',
      name: 'Space Science',
      slug: 'space-science',
      description: 'Exploration of the cosmos and space technology development.',
      color: '#6366f1',
      icon: '🚀',
      articleCount: 145,
      isActive: true,
      createdAt: '2024-01-01'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3b82f6',
    icon: '📚',
    isActive: true
  });

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: `${Date.now()}`,
      name: formData.name,
      slug: generateSlug(formData.name),
      description: formData.description,
      color: formData.color,
      icon: formData.icon,
      articleCount: 0,
      isActive: formData.isActive,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCategories([...categories, newCategory]);
    resetForm();
    setIsAddFormOpen(false);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon,
      isActive: category.isActive
    });
    setIsAddFormOpen(true);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;

    const updatedCategories = categories.map(cat =>
      cat.id === editingCategory.id
        ? {
            ...cat,
            name: formData.name,
            slug: generateSlug(formData.name),
            description: formData.description,
            color: formData.color,
            icon: formData.icon,
            isActive: formData.isActive
          }
        : cat
    );

    setCategories(updatedCategories);
    resetForm();
    setIsAddFormOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    if (category && category.articleCount > 0) {
      if (!window.confirm(`This category has ${category.articleCount} articles. Are you sure you want to delete it? All articles will be moved to "Uncategorized".`)) {
        return;
      }
    }
    
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      color: '#3b82f6',
      icon: '📚',
      isActive: true
    });
  };

  const predefinedIcons = ['📚', '⚛️', '🧬', '🤖', '🌱', '🚀', '🔬', '💡', '🌍', '⚡', '🧪', '🔭'];
  const predefinedColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#6366f1', '#ec4899', '#14b8a6', '#f97316', '#84cc16'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600 mt-1">Organize and manage research categories</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddFormOpen(true)}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-gray-600">
            {filteredCategories.length} categories found
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div 
              className="h-4"
              style={{ backgroundColor: category.color }}
            ></div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">/{category.slug}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${category.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  <span className="text-xs text-gray-500">
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{category.articleCount}</div>
                  <div className="text-xs text-gray-500">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {new Date(category.createdAt).getFullYear()}
                  </div>
                  <div className="text-xs text-gray-500">Created</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleCategoryStatus(category.id)}
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    category.isActive 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {category.isActive ? 'Deactivate' : 'Activate'}
                </button>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.open(`/category/${category.slug}`, '_blank')}
                    className="text-gray-400 hover:text-blue-600 p-1 rounded transition-colors"
                    title="View Category"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="text-gray-400 hover:text-green-600 p-1 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add/Edit Category Modal */}
      {isAddFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-600 to-red-700 text-white">
              <h2 className="text-2xl font-bold">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={() => {
                  setIsAddFormOpen(false);
                  setEditingCategory(null);
                  resetForm();
                }}
                className="text-white hover:text-red-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                editingCategory ? handleUpdateCategory() : handleAddCategory();
              }}
              className="p-6 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Quantum Physics"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Slug will be: {generateSlug(formData.name) || 'category-slug'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Brief description of this category..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Icon
                  </label>
                  <div className="grid grid-cols-6 gap-2 mb-3">
                    {predefinedIcons.map((icon, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFormData({...formData, icon})}
                        className={`p-2 text-xl border rounded-lg hover:bg-gray-50 transition-colors ${
                          formData.icon === icon ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Or enter custom emoji"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Color
                  </label>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {predefinedColors.map((color, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFormData({...formData, color})}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          formData.color === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                    Active category (visible to users)
                  </label>
                </div>
              </div>

              {/* Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Preview</h4>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div 
                    className="h-2"
                    style={{ backgroundColor: formData.color }}
                  ></div>
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{formData.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{formData.name || 'Category Name'}</h3>
                        <p className="text-sm text-gray-600">{formData.description || 'Category description...'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddFormOpen(false);
                    setEditingCategory(null);
                    resetForm();
                  }}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingCategory ? 'Update Category' : 'Add Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagementPage;