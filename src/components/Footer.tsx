import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <h3 className="text-xl font-bold">Zanist</h3>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted source for the latest scientific discoveries and research breakthroughs.
            </p>
            
            {/* Built with Bolt Badge */}
            <a
              href="https://bolt.new/?rid=j6o2xz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Zap className="w-4 h-4" />
              <span>Built with Bolt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/category/quantum-physics" className="hover:text-white transition-colors">Quantum Physics</Link></li>
              <li><Link to="/category/biotechnology" className="hover:text-white transition-colors">Biotechnology</Link></li>
              <li><Link to="/category/artificial-intelligence" className="hover:text-white transition-colors">AI Research</Link></li>
              <li><Link to="/category/space-science" className="hover:text-white transition-colors">Space Science</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors font-medium">View All Categories →</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/about/team" className="hover:text-white transition-colors">Editorial Team</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about/advertise" className="hover:text-white transition-colors">Advertise</Link></li>
              <li><Link to="/about/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/social" className="hover:text-white transition-colors">All Social Media</Link></li>
              <li><a href="https://twitter.com/zanist" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="https://facebook.com/zanist" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="https://linkedin.com/company/zanist" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="/newsletter" className="hover:text-white transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left text-sm text-gray-400 mb-4 md:mb-0">
            <p>&copy; 2024 Zanist. All rights reserved. | <Link to="/privacy" className="hover:text-white">Privacy Policy</Link> | <Link to="/terms" className="hover:text-white">Terms of Service</Link></p>
          </div>
          
          {/* Additional Bolt Badge in Footer */}
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500">Powered by</span>
            <a
              href="https://bolt.new/?rid=j6o2xz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <Zap className="w-3 h-3" />
              <span>Bolt</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;