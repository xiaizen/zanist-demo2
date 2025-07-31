import React, { useState } from 'react';
import { X, Upload, Save, Eye, AlertCircle, CheckCircle, Plus, Minus } from 'lucide-react';
import { Essay } from '../types/Essay';

interface AddEssayFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (essay: Omit<Essay, 'id'>) => void;
}

const AddEssayForm: React.FC<AddEssayFormProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    category: '',
    university: '',
    professor: '',
    referenceLink: '',
    tags: [''],
    readTime: 5,
    isFeatured: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreview, setIsPreview] = useState(false);

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

  const universities = [
    'MIT', 'Stanford', 'Harvard', 'Caltech', 'Oxford', 'Cambridge',
    'ETH Zurich', 'UCL', 'Imperial College', 'University of Chicago',
    'Princeton', 'Yale', 'Columbia', 'University of Pennsylvania',
    'University of California Berkeley', 'University of Toronto'
  ];

  const sampleImages = [
    'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/9875442/pexels-photo-9875442.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/221012/pexels-photo-221012.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.university) newErrors.university = 'University is required';
      if (!formData.professor.trim()) newErrors.professor = 'Professor name is required';
      if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
      if (formData.summary.length < 50) newErrors.summary = 'Summary must be at least 50 characters';
    }

    if (step === 2) {
      if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
      if (!formData.content.trim()) newErrors.content = 'Content is required';
      if (formData.content.length < 200) newErrors.content = 'Content must be at least 200 characters';
      if (!formData.referenceLink.trim()) newErrors.referenceLink = 'Reference link is required';
      if (formData.referenceLink && !isValidUrl(formData.referenceLink)) {
        newErrors.referenceLink = 'Please enter a valid URL';
      }
      const validTags = formData.tags.filter(tag => tag.trim() !== '');
      if (validTags.length === 0) newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(2)) {
      const validTags = formData.tags.filter(tag => tag.trim() !== '');
      const newEssay: Omit<Essay, 'id'> = {
        ...formData,
        tags: validTags,
        publishDate: new Date().toISOString().split('T')[0]
      };
      onSave(newEssay);
      
      // Reset form
      setFormData({
        title: '',
        summary: '',
        content: '',
        imageUrl: '',
        category: '',
        university: '',
        professor: '',
        referenceLink: '',
        tags: [''],
        readTime: 5,
        isFeatured: false
      });
      setCurrentStep(1);
      setErrors({});
      setIsPreview(false);
      onClose();
    }
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const addTag = () => {
    setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const updateTag = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }));
  };

  React.useEffect(() => {
    if (formData.content) {
      const estimated = estimateReadTime(formData.content);
      setFormData(prev => ({ ...prev, readTime: estimated }));
    }
  }, [formData.content]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div>
            <h2 className="text-2xl font-bold">Add New Research Essay</h2>
            <p className="text-red-100 text-sm">Share groundbreaking scientific discoveries with the world</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-red-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="font-medium">Basic Information</span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-red-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-red-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="font-medium">Content & References</span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep >= 3 ? 'bg-red-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-red-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3 ? 'bg-red-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="font-medium">Review & Publish</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Research Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Quantum Computing Breakthrough in Climate Modeling"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University/Institution *
                  </label>
                  <select
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.university ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select university...</option>
                    {universities.map(uni => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                  {errors.university && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.university}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Professor/Researcher *
                  </label>
                  <input
                    type="text"
                    value={formData.professor}
                    onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.professor ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Dr. Sarah Chen, Prof. Michael Johnson"
                  />
                  {errors.professor && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.professor}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Research Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.category ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select category...</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Research Summary *
                </label>
                <textarea
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.summary ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Provide a compelling summary of the research findings and their significance..."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.summary ? (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.summary}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      {formData.summary.length}/500 characters (minimum 50)
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Feature this essay on the homepage
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Content & References */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image *
                </label>
                <div className="space-y-4">
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.imageUrl ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="https://images.pexels.com/..."
                  />
                  {errors.imageUrl && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.imageUrl}
                    </p>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Or choose from suggested images:</p>
                    <div className="grid grid-cols-3 gap-3">
                      {sampleImages.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Sample ${index + 1}`}
                          className={`w-full h-24 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                            formData.imageUrl === url ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData({ ...formData, imageUrl: url })}
                        />
                      ))}
                    </div>
                  </div>

                  {formData.imageUrl && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reference Link (DOI or Publication URL) *
                </label>
                <input
                  type="url"
                  value={formData.referenceLink}
                  onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.referenceLink ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="https://doi.org/10.1038/s41586-2024-07123-4"
                />
                {errors.referenceLink && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.referenceLink}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Provide a link to the original research paper or publication
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags *
                </label>
                <div className="space-y-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="e.g., quantum computing, climate modeling"
                      />
                      {formData.tags.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTag}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add another tag</span>
                  </button>
                </div>
                {errors.tags && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.tags}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Add relevant keywords to help users find this research
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Content * (Markdown supported)
                </label>
                <textarea
                  rows={16}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm ${
                    errors.content ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={`# Research Title

## Introduction
Provide context and background for the research...

## Key Findings
- Finding 1: Detailed explanation
- Finding 2: Detailed explanation
- Finding 3: Detailed explanation

## Methodology
Describe the research methods used...

## Results and Discussion
Present the results and their implications...

## Conclusion
Summarize the significance and future directions...`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.content ? (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.content}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      {formData.content.length} characters (minimum 200) • Estimated read time: {estimateReadTime(formData.content)} min
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsPreview(!isPreview)}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {isPreview ? 'Edit' : 'Preview'}
                  </button>
                </div>

                {isPreview && formData.content && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-3">Content Preview:</h4>
                    <div className="prose prose-sm max-w-none">
                      {formData.content.split('\n').map((line, index) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={index} className="text-2xl font-bold mb-4 text-gray-900">{line.substring(2)}</h1>;
                        } else if (line.startsWith('## ')) {
                          return <h2 key={index} className="text-xl font-semibold mb-3 text-gray-900">{line.substring(3)}</h2>;
                        } else if (line.startsWith('- ')) {
                          return <li key={index} className="mb-1 ml-4 text-gray-700">{line.substring(2)}</li>;
                        } else if (line.trim() === '') {
                          return <br key={index} />;
                        } else {
                          return <p key={index} className="mb-3 text-gray-700">{line}</p>;
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Review & Publish */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-green-900">Ready to Publish!</h3>
                </div>
                <p className="text-green-700">
                  Please review your essay details below before publishing. Once published, the essay will be visible to all users.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Title:</h4>
                    <p className="text-gray-700">{formData.title}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">University:</h4>
                    <p className="text-gray-700">{formData.university}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Professor:</h4>
                    <p className="text-gray-700">{formData.professor}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Category:</h4>
                    <p className="text-gray-700">{formData.category}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Read Time:</h4>
                    <p className="text-gray-700">{formData.readTime} minutes</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Featured:</h4>
                    <p className="text-gray-700">{formData.isFeatured ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Featured Image:</h4>
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Reference Link:</h4>
                <a 
                  href={formData.referenceLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 break-all"
                >
                  {formData.referenceLink}
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.filter(tag => tag.trim() !== '').map((tag, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Summary:</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{formData.summary}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Content Preview:</h4>
                <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                  <p className="text-gray-700 text-sm">{formData.content.substring(0, 500)}...</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t mt-8">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
              )}
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <span>Next</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Essay</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEssayForm;