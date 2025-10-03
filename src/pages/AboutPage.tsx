import React, { useState, useEffect } from 'react';
import { Camera, Film, Award, MapPin, Mail, Instagram, Linkedin, Sparkles, Zap } from 'lucide-react';
import { useSupabaseContent } from '../hooks/useSupabaseContent';

const AboutPage: React.FC = () => {
  const { siteContent, loading, error } = useSupabaseContent();

  const achievements = [
    'Featured in Distraction Magazine',
    'Photography contributor to Hurricane Newspaper',
    'Commercial work with local businesses',
    'Event photography for various organizations',
    'Portrait sessions for professionals and students',
    'Fine art photography exhibitions'
  ];

  const skills = [
    { name: 'Portrait Photography', level: 95 },
    { name: 'Event Photography', level: 90 },
    { name: 'Fine Art Photography', level: 85 },
    { name: 'Photo Editing', level: 88 },
    { name: 'Video Production', level: 75 },
    { name: 'Creative Direction', level: 80 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Top section with light background for navbar compatibility */}
      <div className="h-32 bg-gradient-to-b from-white/20 via-white/10 to-transparent backdrop-blur-sm"></div>
      
      <div className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-12 h-12 text-stone-700" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-rose-300" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-light text-stone-800 mb-6 tracking-wide">
            {siteContent?.page_content?.about?.title}
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-serif font-light">
            {siteContent?.page_content?.about?.content || "A passionate photographer and filmmaker based in Miami, Florida, dedicated to capturing authentic moments and telling compelling visual stories."}
          </p>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-stone-800 mb-4 tracking-wide">
              {siteContent?.page_content?.about?.skills_title || "Skills & Expertise"}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-rose-100 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-serif font-medium text-stone-800">{skill.name}</h3>
                  <span className="text-sm text-stone-600 font-serif">{skill.level}%</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-rose-400 to-pink-400 h-2 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;