import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Target,
  Users,
  Award,
  Globe,
  BookOpen,
  Heart,
  Lightbulb,
  Shield,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Editor-in-Chief',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former NASA researcher with 15+ years in scientific publishing. PhD in Astrophysics from MIT.',
      email: 's.mitchell@zanist.com'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Senior Science Editor',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Leading expert in quantum physics and technology. Professor at Stanford University.',
      email: 'm.chen@zanist.com'
    },
    {
      name: 'Dr. Elena Rodriguez',
      role: 'Research Director',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Biotechnology researcher and science communicator. Harvard Medical School alumna.',
      email: 'e.rodriguez@zanist.com'
    },
    {
      name: 'James Wilson',
      role: 'Technology Director',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Full-stack developer and AI specialist. Former Google engineer with expertise in scientific data.',
      email: 'j.wilson@zanist.com'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Accuracy',
      description: 'We ensure all scientific content is peer-reviewed and fact-checked by experts in the field.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making complex scientific research understandable and accessible to everyone worldwide.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Highlighting breakthrough discoveries that shape the future of science and technology.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Maintaining the highest standards of scientific journalism and ethical reporting.'
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
            <span>About</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <BookOpen className="w-12 h-12 text-red-200" />
            <div>
              <h1 className="text-4xl font-bold">About Zanist</h1>
              <p className="text-red-100 text-lg">
                Advancing scientific knowledge through expert journalism and research
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Zanist is dedicated to bridging the gap between cutting-edge scientific research and public understanding. 
              We believe that scientific knowledge should be accessible to everyone, not just academics. Our mission is to 
              translate complex research into engaging, accurate, and understandable content that inspires curiosity and 
              promotes scientific literacy worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Team */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Editorial Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team consists of experienced scientists, researchers, and science communicators 
              who are passionate about making scientific knowledge accessible to all.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <div className="text-red-600 font-medium mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <a 
                    href={`mailto:${member.email}`}
                    className="text-red-600 hover:text-red-700 text-sm flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Contact
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-600">Research Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1M+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">contact@zanist.com</p>
                <p className="text-gray-600">editorial@zanist.com</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-gray-600">+1 (555) 987-6543</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600">
                  123 Science Avenue<br />
                  Research District<br />
                  Cambridge, MA 02139
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;