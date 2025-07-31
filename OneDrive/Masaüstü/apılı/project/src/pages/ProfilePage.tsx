import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, Shield, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      'admin': 'Site Yöneticisi',
      'moderator': 'İçerik Moderatörü',
      'member': 'Premium Üye',
      'visitor': 'Üye'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  const getRoleColor = (role: string) => {
    const colors = {
      'admin': 'bg-red-100 text-red-800',
      'moderator': 'bg-blue-100 text-blue-800',
      'member': 'bg-green-100 text-green-800',
      'visitor': 'bg-gray-100 text-gray-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
            
            <h1 className="text-xl font-bold text-gray-900">Zanist</h1>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-12 text-white">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)} bg-white/20 text-white`}>
                  {getRoleDisplayName(user.role)}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">Profil Bilgileri</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Düzenle</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Kaydet</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>İptal</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Ad Soyad
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                    {user.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  E-posta Adresi
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                    {user.email}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Üyelik Türü
                </label>
                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                    {getRoleDisplayName(user.role)}
                  </span>
                </div>
              </div>

              {/* Registration Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Üyelik Tarihi
                </label>
                <p className="text-lg text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : 'Bilinmiyor'}
                </p>
              </div>

              {/* Member Benefits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Üyelik Avantajları
                </label>
                <div className="bg-red-50 px-4 py-3 rounded-lg">
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Tüm araştırma makalelerine sınırsız erişim</li>
                    <li>• Haftalık bilimsel bülten</li>
                    <li>• Yorum yapabilme ve tartışmalara katılım</li>
                    {(user.role === 'member' || user.role === 'admin' || user.role === 'moderator') && (
                      <>
                        <li>• Premium içeriklere erişim</li>
                        <li>• Erken erişim makaleleri</li>
                      </>
                    )}
                    {(user.role === 'admin' || user.role === 'moderator') && (
                      <li>• İçerik yönetimi yetkisi</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                {(user.role === 'admin' || user.role === 'moderator') && (
                  <Link
                    to="/admin"
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 text-center"
                  >
                    Yönetim Paneline Git
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;