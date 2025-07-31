import React from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Eye, MessageCircle, Award, TrendingUp } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'article',
      message: 'New article published',
      details: 'Quantum Computing Breakthrough',
      time: '2 minutes ago',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 2,
      type: 'user',
      message: 'New user registered',
      details: 'Dr. Sarah Chen from MIT',
      time: '15 minutes ago',
      icon: User,
      color: 'green'
    },
    {
      id: 3,
      type: 'engagement',
      message: 'High engagement article',
      details: 'CRISPR 3.0 research reached 1K views',
      time: '1 hour ago',
      icon: Eye,
      color: 'purple'
    },
    {
      id: 4,
      type: 'comment',
      message: 'New expert comment',
      details: 'Prof. Johnson reviewed solar cell research',
      time: '2 hours ago',
      icon: MessageCircle,
      color: 'orange'
    },
    {
      id: 5,
      type: 'achievement',
      message: 'Milestone reached',
      details: '50K total article views this month',
      time: '3 hours ago',
      icon: Award,
      color: 'yellow'
    },
    {
      id: 6,
      type: 'trending',
      message: 'Trending category',
      details: 'AI Research articles up 25%',
      time: '4 hours ago',
      icon: TrendingUp,
      color: 'red'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                colorClasses[activity.color as keyof typeof colorClasses]
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-600 line-clamp-1">{activity.details}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RecentActivity;