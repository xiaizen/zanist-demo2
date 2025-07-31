import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Mail,
  Rss,
  MessageCircle,
  Users,
  Share2,
  Bell,
  ExternalLink
} from 'lucide-react';
import Footer from '../components/Footer';

const SocialPage: React.FC = () => {
  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: Twitter,
      handle: '@ZanistScience',
      url: 'https://twitter.com/zanist',
      followers: '125K',
      description: 'Latest scientific breakthroughs, research updates, and science news in real-time.',
      color: 'bg-blue-500',
      posts: [
        'Breaking: New quantum computing breakthrough at MIT shows 99.7% accuracy in error correction',
        'CRISPR 3.0 technology achieves unprecedented gene editing precision - full analysis coming soon',
        'Solar cell efficiency reaches 47% - a game-changer for renewable energy adoption'
      ]
    },
    {
      name: 'Facebook',
      icon: Facebook,
      handle: 'Zanist Science',
      url: 'https://facebook.com/zanist',
      followers: '89K',
      description: 'In-depth articles, research discussions, and community engagement.',
      color: 'bg-blue-600',
      posts: [
        'Join our live discussion on climate change research this Friday at 3 PM EST',
        'New article: How AI is revolutionizing drug discovery - read the full analysis',
        'Weekly roundup: Top 5 scientific discoveries that will change the world'
      ]
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      handle: 'Zanist',
      url: 'https://linkedin.com/company/zanist',
      followers: '67K',
      description: 'Professional insights, career opportunities, and industry analysis.',
      color: 'bg-blue-700',
      posts: [
        'Career spotlight: How to transition from academia to science journalism',
        'Industry report: The future of biotechnology and its impact on healthcare',
        'Networking event: Connect with leading researchers at our virtual conference'
      ]
    },
    {
      name: 'Instagram',
      icon: Instagram,
      handle: '@zanist_science',
      url: 'https://instagram.com/zanist',
      followers: '156K',
      description: 'Visual science stories, infographics, and behind-the-scenes content.',
      color: 'bg-pink-500',
      posts: [
        'Beautiful visualization of quantum entanglement - swipe to see the process',
        'Time-lapse: Watch CRISPR gene editing in action under the microscope',
        'Infographic: Solar energy efficiency improvements over the past decade'
      ]
    },
    {
      name: 'YouTube',
      icon: Youtube,
      handle: 'Zanist Science',
      url: 'https://youtube.com/zanist',
      followers: '234K',
      description: 'Educational videos, expert interviews, and research explanations.',
      color: 'bg-red-600',
      posts: [
        'New video: Quantum Computing Explained - From Theory to Application (15 min)',
        'Expert interview: Dr. Sarah Chen discusses the future of climate modeling',
        'Lab tour: Inside Stanford\'s revolutionary gene editing facility'
      ]
    },
    {
      name: 'GitHub',
      icon: Github,
      handle: 'zanist-science',
      url: 'https://github.com/zanist',
      followers: '12K',
      description: 'Open-source research tools, data visualizations, and scientific code.',
      color: 'bg-gray-800',
      posts: [
        'New repository: Climate modeling algorithms used in our latest research',
        'Data visualization tools for quantum physics research - now open source',
        'Collaborative project: Building a database of scientific breakthroughs'
      ]
    }
  ];

  const newsletters = [
    {
      name: 'Weekly Science Digest',
      description: 'Curated selection of the week\'s most important scientific discoveries',
      frequency: 'Weekly',
      subscribers: '45K',
      icon: Mail
    },
    {
      name: 'Research Alerts',
      description: 'Breaking news and urgent updates from the scientific community',
      frequency: 'As needed',
      subscribers: '32K',
      icon: Bell
    },
    {
      name: 'Deep Dive Analysis',
      description: 'Monthly in-depth analysis of major scientific trends and breakthroughs',
      frequency: 'Monthly',
      subscribers: '28K',
      icon: MessageCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="hover:text-red-200">Home</Link>
            <span>›</span>
            <span>Social Media</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <Share2 className="w-12 h-12 text-red-200" />
            <div>
              <h1 className="text-4xl font-bold">Follow Zanist</h1>
              <p className="text-red-100 text-lg">
                Stay connected with the latest scientific discoveries across all platforms
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>700K+ Total Followers</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>6 Active Platforms</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>3 Newsletter Options</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Platforms */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Connect With Us on Social Media
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {socialPlatforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${platform.color} p-6 text-white`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{platform.name}</h3>
                      <p className="text-white/80">{platform.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{platform.followers}</div>
                      <div className="text-white/80 text-sm">Followers</div>
                    </div>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <span>Follow</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{platform.description}</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Posts:</h4>
                  <div className="space-y-2">
                    {platform.posts.map((post, postIndex) => (
                      <div key={postIndex} className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {post}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Subscribe to Our Newsletters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsletters.map((newsletter, index) => {
              const Icon = newsletter.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{newsletter.name}</h3>
                  <p className="text-gray-600 mb-4">{newsletter.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{newsletter.frequency}</span>
                    <span>{newsletter.subscribers} subscribers</span>
                  </div>
                  <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RSS and API */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            For Developers and Power Users
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rss className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">RSS Feed</h3>
              <p className="text-gray-600 mb-4">
                Get all our latest articles delivered directly to your RSS reader
              </p>
              <a
                href="/rss"
                className="inline-flex items-center space-x-2 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Rss className="w-4 h-4" />
                <span>Subscribe to RSS</span>
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">API Access</h3>
              <p className="text-gray-600 mb-4">
                Integrate Zanist content into your applications with our API
              </p>
              <a
                href="/api/docs"
                className="inline-flex items-center space-x-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>API Documentation</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Community Guidelines</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We encourage respectful, scientific discourse across all our platforms. Please maintain 
              professional standards when engaging with our content and community members. We welcome 
              questions, discussions, and constructive feedback that advances scientific understanding.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Respectful Discussion</h3>
                <p className="text-sm text-gray-600">Engage in constructive, evidence-based conversations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Inclusive Community</h3>
                <p className="text-sm text-gray-600">Welcome scientists and enthusiasts of all backgrounds</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Share2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Share Knowledge</h3>
                <p className="text-sm text-gray-600">Help spread accurate scientific information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SocialPage;