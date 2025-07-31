import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Home,
  FileText,
  BookOpen,
  Award,
  Palette,
  Globe
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/articles', icon: FileText, label: 'Articles' },
    { path: '/admin/professors', icon: Users, label: 'Professors' },
    { path: '/admin/categories', icon: BookOpen, label: 'Categories' },
    { path: '/admin/users', icon: Users, label: 'Users', adminOnly: true },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/site-settings', icon: Palette, label: 'Site Settings' },
    { path: '/admin/settings', icon: Settings, label: 'Account Settings' },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl lg:static lg:inset-0 lg:translate-x-0"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-6 bg-gradient-to-r from-red-600 to-red-700">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold text-white">Zanist</span>
            <span className="text-sm text-red-200">Admin</span>
          </motion.div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role === 'admin' ? 'Administrator' : 
                 user?.role === 'moderator' ? 'Moderator' : 
                 'Editor'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Home Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <NavLink
              to="/"
              onClick={onClose}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">View Website</span>
            </NavLink>
          </motion.div>

          {filteredMenuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-red-50 text-red-600 border-r-2 border-red-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;