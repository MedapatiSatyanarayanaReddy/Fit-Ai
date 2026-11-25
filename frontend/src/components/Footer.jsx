import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Activity, ShieldCheck, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <span className="text-3xl font-extrabold tracking-tight text-white">
              Fit<span className="text-purple-400">AI</span>
            </span>
            <p className="text-sm text-gray-400 leading-relaxed">
              Smart AI-Powered Fitness and Diet Recommendation System. Personalized clinical nutrition, adaptive workouts, and 24/7 intelligent health coaching.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Gemini AI Engine Online</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/current-diet-plan" className="hover:text-purple-400 transition">Generate Diet Plan</Link></li>
              <li><Link to="/ExercisesPage" className="hover:text-purple-400 transition">Workout Routines</Link></li>
              <li><Link to="/plan-history" className="hover:text-purple-400 transition">Saved Plan History</Link></li>
              <li><Link to="/how-it-works" className="hover:text-purple-400 transition">How FitAI Works</Link></li>
              <li><Link to="/pricing" className="hover:text-purple-400 transition">Membership & Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Company & Health</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-purple-400 transition">About Our AI</Link></li>
              <li><Link to="/features" className="hover:text-purple-400 transition">All Features</Link></li>
              <li><Link to="/blog" className="hover:text-purple-400 transition">Nutrition & Fitness Blog</Link></li>
              <li><a href="#disclaimer" className="hover:text-purple-400 transition">Medical Disclaimer</a></li>
              <li><a href="#privacy" className="hover:text-purple-400 transition">Privacy & HIPAA Security</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Stay Connected</h4>
            <p className="text-sm text-gray-400 mb-4">
              Get weekly science-backed nutrition tips and workout optimization guides.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm flex-1 focus:outline-none focus:border-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} FitAI Health Inc. All rights reserved.</p>
          <p className="text-center md:text-right text-gray-400">
            Disclaimer: FitAI recommendations are for educational and fitness planning purposes and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
