import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Eye, 
  TrendingUp,
  Plus,
  Calendar,
  Award,
  BookOpen,
  Settings,
  Image,
  Globe,
  Database,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import Chart from '../components/Chart';
import RecentActivity from '../components/RecentActivity';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Articles',
      value: '156',
      change: '+12.5%',
      trend: 'up' as const,
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Total Views',
      value: '45,231',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Eye,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '2,543',
      change: '+15.7%',
      trend: 'up' as const,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Monthly Growth',
      value: '23.1%',
      change: '+2.4%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'red'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Article',
      description: 'Create and publish research articles',
      icon: Plus,
      color: 'bg-blue-500',
      link: '/admin/articles',
      action: 'create'
    },
    {
      title: 'Manage Professors',
      description: 'Add, edit, or remove professor profiles',
      icon: Users,
      color: 'bg-green-500',
      link: '/admin/professors',
      action: 'manage'
    },
    {
      title: 'Nobel Prize Winners',
      description: 'Add new Nobel Prize winners',
      icon: Award,
      color: 'bg-yellow-500',
      link: '/admin/nobel-prizes',
      action: 'create'
    },
    {
      title: 'Categories Management',
      description: 'Create and organize research categories',
      icon: BookOpen,
      color: 'bg-purple-500',
      link: '/admin/categories',
      action: 'manage'
    },
    {
      title: 'Site Settings',
      description: 'Configure website settings and appearance',
      icon: Settings,
      color: 'bg-gray-500',
      link: '/admin/site-settings',
      action: 'configure'
    },
    {
      title: 'Media Library',
      description: 'Manage images, logos, and media files',
      icon: Image,
      color: 'bg-pink-500',
      link: '/admin/media',
      action: 'manage'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Complete control over your Zanist website</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/backup"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Database className="w-4 h-4" />
            <span>Backup Data</span>
          </Link>
          <Link
            to="/admin/site-settings"
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Site Settings</span>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="group p-6 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Chart title="Website Analytics & Performance" />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <RecentActivity />
        </motion.div>
      </div>

      {/* Website Management Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Website Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-gray-600">Research Articles</div>
            <Link to="/admin/articles" className="text-blue-600 hover:text-blue-700 text-xs mt-1 block">
              Manage →
            </Link>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">45</div>
            <div className="text-sm text-gray-600">Professor Profiles</div>
            <Link to="/admin/professors" className="text-green-600 hover:text-green-700 text-xs mt-1 block">
              Manage →
            </Link>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">23</div>
            <div className="text-sm text-gray-600">Nobel Prize Winners</div>
            <Link to="/admin/nobel-prizes" className="text-yellow-600 hover:text-yellow-700 text-xs mt-1 block">
              Manage →
            </Link>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">8</div>
            <div className="text-sm text-gray-600">Research Categories</div>
            <Link to="/admin/categories" className="text-purple-600 hover:text-purple-700 text-xs mt-1 block">
              Manage →
            </Link>
          </div>
        </div>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <div className="font-medium text-gray-900">Website Status</div>
              <div className="text-sm text-green-600">Online & Operational</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div>
              <div className="font-medium text-gray-900">Database</div>
              <div className="text-sm text-blue-600">Connected & Synced</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div>
              <div className="font-medium text-gray-900">Last Backup</div>
              <div className="text-sm text-yellow-600">2 hours ago</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;