import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useSupabaseContent } from '../hooks/useSupabaseContent';

const ContactPage: React.FC = () => {
  const { siteContent } = useSupabaseContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Top section with light background for navbar compatibility */}
      <div className="h-32 bg-gradient-to-b from-white/20 via-white/10 to-transparent backdrop-blur-sm"></div>
      
      <div className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-800 mb-6 tracking-wide">
              {siteContent?.page_content?.contact?.title || "Let's Work Together"}
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-serif font-light">
              {siteContent?.page_content?.contact?.description || "Ready to create something beautiful? I'd love to hear about your project and how we can bring your vision to life."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8">
              <h2 className="text-3xl font-serif font-light text-stone-800 mb-6 tracking-wide">
                Send a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8">
                <h3 className="text-2xl font-serif font-light text-stone-800 mb-6 tracking-wide">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-rose-500" />
                    <span className="text-stone-700">{siteContent?.site_settings?.contact_email || "julia@example.com"}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6 text-rose-500" />
                    <span className="text-stone-700">Miami, Florida</span>, U.S.
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-rose-200 to-pink-200 rounded-2xl p-8 text-center">
                <h4 className="text-xl font-serif font-light text-stone-800 mb-4">
                  Let's Connect
                </h4>
                <p className="text-stone-600 mb-6">
                  Follow my work and stay updated on new projects and photography tips.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="https://www.instagram.com/jules.infocus/" className="text-stone-700 hover:text-rose-600 transition-colors">
                    Instagram
                  </a>
                  <a href="https://www.tiktok.com/@jul_campbell_" className="text-stone-700 hover:text-rose-600 transition-colors">
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;