import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Award,
  BookOpen,
  Mail,
  Linkedin,
  ExternalLink,
  Save,
  X,
  Upload,
  User
} from 'lucide-react';
import { professors, Professor } from '../data/professorsData';

const ProfessorsManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const [professorsList, setProfessorsList] = useState<Professor[]>(professors);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    currentUniversity: '',
    department: '',
    field: '',
    photo: '',
    email: '',
    linkedinUrl: '',
    personalWebsite: '',
    bio: '',
    researchAreas: [''],
    totalPublications: 0,
    totalCitations: 0,
    hIndex: 0
  });

  const fields = [...new Set(professors.map(prof => prof.field))];

  const filteredProfessors = professorsList.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.currentUniversity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.field.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = selectedField === 'all' || prof.field === selectedField;
    return matchesSearch && matchesField;
  });

  const handleAddProfessor = () => {
    const newProfessor: Professor = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...formData,
      education: [],
      previousPositions: [],
      publications: [],
      awards: [],
      stats: {
        totalPublications: formData.totalPublications,
        totalCitations: formData.totalCitations,
        hIndex: formData.hIndex
      },
      currentResearch: [],
      collaborations: [],
      fundingGrants: []
    };

    setProfessorsList([...professorsList, newProfessor]);
    resetForm();
    setIsAddFormOpen(false);
  };

  const handleEditProfessor = (professor: Professor) => {
    setEditingProfessor(professor);
    setFormData({
      name: professor.name,
      title: professor.title,
      currentUniversity: professor.currentUniversity,
      department: professor.department,
      field: professor.field,
      photo: professor.photo,
      email: professor.email,
      linkedinUrl: professor.linkedinUrl,
      personalWebsite: professor.personalWebsite || '',
      bio: professor.bio,
      researchAreas: professor.researchAreas,
      totalPublications: professor.stats.totalPublications,
      totalCitations: professor.stats.totalCitations,
      hIndex: professor.stats.hIndex
    });
    setIsAddFormOpen(true);
  };

  const handleUpdateProfessor = () => {
    if (!editingProfessor) return;

    const updatedProfessors = professorsList.map(prof => 
      prof.id === editingProfessor.id 
        ? {
            ...prof,
            ...formData,
            stats: {
              ...prof.stats,
              totalPublications: formData.totalPublications,
              totalCitations: formData.totalCitations,
              hIndex: formData.hIndex
            }
          }
        : prof
    );

    setProfessorsList(updatedProfessors);
    resetForm();
    setIsAddFormOpen(false);
    setEditingProfessor(null);
  };

  const handleDeleteProfessor = (id: string) => {
    if (window.confirm('Are you sure you want to delete this professor profile?')) {
      setProfessorsList(professorsList.filter(prof => prof.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      currentUniversity: '',
      department: '',
      field: '',
      photo: '',
      email: '',
      linkedinUrl: '',
      personalWebsite: '',
      bio: '',
      researchAreas: [''],
      totalPublications: 0,
      totalCitations: 0,
      hIndex: 0
    });
  };

  const addResearchArea = () => {
    setFormData(prev => ({
      ...prev,
      researchAreas: [...prev.researchAreas, '']
    }));
  };

  const updateResearchArea = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      researchAreas: prev.researchAreas.map((area, i) => i === index ? value : area)
    }));
  };

  const removeResearchArea = (index: number) => {
    setFormData(prev => ({
      ...prev,
      researchAreas: prev.researchAreas.filter((_, i) => i !== index)
    }));
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
          <h1 className="text-3xl font-bold text-gray-900">Professors Management</h1>
          <p className="text-gray-600 mt-1">Manage professor profiles, research, and academic information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddFormOpen(true)}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Professor</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search professors, universities, fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Fields</option>
              {fields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-3 flex items-center">
            <span className="text-sm text-gray-600">
              {filteredProfessors.length} professors found
            </span>
          </div>
        </div>
      </motion.div>

      {/* Professors Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProfessors.map((professor, index) => (
          <motion.div
            key={professor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={professor.photo}
                  alt={professor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{professor.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{professor.title}</p>
                  <p className="text-sm text-red-600 truncate">{professor.currentUniversity}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Field:</span>
                  <span className="ml-1 text-gray-600">{professor.field}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Department:</span>
                  <span className="ml-1 text-gray-600">{professor.department}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{professor.stats.totalPublications}</div>
                  <div className="text-xs text-gray-500">Papers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{professor.stats.totalCitations.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Citations</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">{professor.stats.hIndex}</div>
                  <div className="text-xs text-gray-500">H-Index</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <a
                    href={`mailto:${professor.email}`}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={professor.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  {professor.personalWebsite && (
                    <a
                      href={professor.personalWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.open(`/professor/${professor.id}`, '_blank')}
                    className="text-gray-400 hover:text-blue-600 p-1 rounded transition-colors"
                    title="View Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditProfessor(professor)}
                    className="text-gray-400 hover:text-green-600 p-1 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProfessor(professor.id)}
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

      {/* Add/Edit Professor Modal */}
      {isAddFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-600 to-red-700 text-white">
              <h2 className="text-2xl font-bold">
                {editingProfessor ? 'Edit Professor' : 'Add New Professor'}
              </h2>
              <button
                onClick={() => {
                  setIsAddFormOpen(false);
                  setEditingProfessor(null);
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
                editingProfessor ? handleUpdateProfessor() : handleAddProfessor();
              }}
              className="p-6 space-y-6"
            >
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Professor of Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current University *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.currentUniversity}
                      onChange={(e) => setFormData({...formData, currentUniversity: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="MIT"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Computer Science and Artificial Intelligence Laboratory"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Research Field *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.field}
                      onChange={(e) => setFormData({...formData, field: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Quantum Computing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.photo}
                      onChange={(e) => setFormData({...formData, photo: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="john.smith@university.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/john-smith"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Personal Website
                    </label>
                    <input
                      type="url"
                      value={formData.personalWebsite}
                      onChange={(e) => setFormData({...formData, personalWebsite: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="https://johnsmith.university.edu"
                    />
                  </div>
                </div>
              </div>

              {/* Biography */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biography *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Brief biography and research overview..."
                />
              </div>

              {/* Research Areas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Research Areas *
                </label>
                <div className="space-y-2">
                  {formData.researchAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => updateResearchArea(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Research area"
                      />
                      {formData.researchAreas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeResearchArea(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addResearchArea}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Research Area
                  </button>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Publications
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.totalPublications}
                      onChange={(e) => setFormData({...formData, totalPublications: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Citations
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.totalCitations}
                      onChange={(e) => setFormData({...formData, totalCitations: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      H-Index
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.hIndex}
                      onChange={(e) => setFormData({...formData, hIndex: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddFormOpen(false);
                    setEditingProfessor(null);
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
                  <span>{editingProfessor ? 'Update Professor' : 'Add Professor'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorsManagementPage;