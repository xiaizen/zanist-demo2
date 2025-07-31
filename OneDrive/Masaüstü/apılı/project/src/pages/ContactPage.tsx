import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageCircle,
  Clock,
  Globe,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  BookOpen
} from 'lucide-react';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="hover:text-red-200">
              <span className="font-bold">Zanist</span>
            </Link>
            <span>›</span>
            <span>Contact</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <MessageCircle className="w-12 h-12 text-red-200" />
            <div>
              <h1 className="text-4xl font-bold">Contact Zanist</h1>
              <p className="text-red-100 text-lg">
                Get in touch with our editorial team and research community
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Category and Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="editorial">Editorial Team</option>
                        <option value="research">Research Submission</option>
                        <option value="partnership">Partnership</option>
                        <option value="technical">Technical Support</option>
                        <option value="press">Press & Media</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Brief subject line"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600">contact@zanist.com</div>
                    <div className="text-gray-600">editorial@zanist.com</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                    <div className="text-gray-600">+1 (555) 987-6543</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Address</div>
                    <div className="text-gray-600">
                      123 Science Avenue<br />
                      Research District<br />
                      Cambridge, MA 02139<br />
                      United States
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900">Business Hours</div>
                    <div className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday: 10:00 AM - 4:00 PM EST<br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Team */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Editorial Team</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900">Dr. Sarah Mitchell</div>
                  <div className="text-sm text-gray-600">Editor-in-Chief</div>
                  <div className="text-sm text-red-600">s.mitchell@zanist.com</div>
                </div>
                
                <div>
                  <div className="font-medium text-gray-900">Prof. Michael Chen</div>
                  <div className="text-sm text-gray-600">Senior Science Editor</div>
                  <div className="text-sm text-red-600">m.chen@zanist.com</div>
                </div>
                
                <div>
                  <div className="font-medium text-gray-900">Dr. Elena Rodriguez</div>
                  <div className="text-sm text-gray-600">Research Director</div>
                  <div className="text-sm text-red-600">e.rodriguez@zanist.com</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
                
                <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-800 transition-colors">
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
                
                <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                
                <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">www.zanist.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h3>
              
              <div className="space-y-3">
                <Link to="/about" className="block text-gray-600 hover:text-red-600 transition-colors">
                  About Zanist
                </Link>
                <Link to="/submission-guidelines" className="block text-gray-600 hover:text-red-600 transition-colors">
                  Submission Guidelines
                </Link>
                <Link to="/peer-review" className="block text-gray-600 hover:text-red-600 transition-colors">
                  Peer Review Process
                </Link>
                <Link to="/ethics" className="block text-gray-600 hover:text-red-600 transition-colors">
                  Publication Ethics
                </Link>
                <Link to="/careers" className="block text-gray-600 hover:text-red-600 transition-colors">
                  Career Opportunities
                </Link>
                <Link to="/advertise" className="block text-gray-600 hover:text-red-600 transition-colors">
                  Advertise with Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How can I submit research for publication?</h3>
              <p className="text-gray-600 text-sm">
                Please review our submission guidelines and send your research to editorial@zanist.com with all required documentation.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is your peer review process?</h3>
              <p className="text-gray-600 text-sm">
                All submissions undergo rigorous peer review by experts in the relevant field. The process typically takes 4-6 weeks.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I request specific research topics?</h3>
              <p className="text-gray-600 text-sm">
                Yes! We welcome suggestions for research topics and coverage areas. Contact our editorial team with your ideas.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I become a peer reviewer?</h3>
              <p className="text-gray-600 text-sm">
                We're always looking for qualified reviewers. Send your CV and areas of expertise to editorial@zanist.com.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;