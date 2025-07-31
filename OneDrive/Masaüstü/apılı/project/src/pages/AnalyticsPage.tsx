import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Eye, Clock } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import Chart from '../components/Chart';

const AnalyticsPage: React.FC = () => {
  const analyticsStats = [
    {
      title: 'Page Views',
      value: '45,231',
      change: '+12.5%',
      trend: 'up' as const,
      icon: Eye,
      color: 'blue'
    },
    {
      title: 'Unique Visitors',
      value: '12,543',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users,
      color: 'green'
    },
    {
      title: 'Bounce Rate',
      value: '23.1%',
      change: '-2.4%',
      trend: 'down' as const,
      icon: TrendingUp,
      color: 'red'
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      change: '+1.2%',
      trend: 'up' as const,
      icon: Clock,
      color: 'purple'
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
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </motion.div>

      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsStats.map((stat, index) => (
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Chart title="Traffic Overview" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Chart title="User Engagement" />
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;