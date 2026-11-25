import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Activity, Bot, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Flame, Dumbbell } from 'lucide-react';

const Home = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      text: "This AI planner transformed my fitness journey! The personalized meal plans are incredible."
    },
    {
      name: "Mike Chen",
      role: "Busy Professional",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Finally, a solution that fits my hectic schedule. The AI understands my needs perfectly."
    },
    {
      name: "Emma Davis",
      role: "Health Coach",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "I recommend this to all my clients. The nutrition tracking features are game-changing."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" fill="none" viewBox="0 0 1200 600" aria-hidden="true">
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#d8b4fe" />
                <stop offset="100%" stopColor="#bfdbfe" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="100" r="150" fill="url(#grad1)" />
            <circle cx="900" cy="500" r="180" fill="url(#grad1)" />
            <rect x="50" y="300" width="100" height="100" rx="20" fill="url(#grad1)" />
            <polygon points="600,0 700,100 600,200 500,100" fill="url(#grad1)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center pt-8 pb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 border border-purple-200 text-purple-700 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" /> Next-Generation AI Diet & Fitness Coach
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Your AI-Powered Journey to <span className="gradient-text">Optimal Health</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Personalized meal plans, adaptive workout routines, and an intelligent AI assistant – all designed for your unique biology, taste, and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/current-diet-plan"
              className="btn-primary transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
            >
              Start Your Free Plan <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/ExercisesPage"
              className="btn-secondary transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
            >
              <Dumbbell className="w-5 h-5 text-purple-600" /> Explore Workouts
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose AI Health? Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Why Choose FitAI?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-14 text-lg">
            Say goodbye to generic cookie-cutter plans. FitAI calculates your exact metabolic rate and crafts dynamic regimens that fit your life.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Personalized Meal Plans Card */}
            <Link
              to="/current-diet-plan"
              className="block bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-sm hover:shadow-xl text-center card-hover border border-purple-100/80 transition-all duration-300 hover:scale-105 group"
            >
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl inline-flex mb-6 text-white group-hover:scale-110 transition-transform">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Meal Plans</h3>
              <p className="text-gray-700 leading-relaxed">
                Get AI-generated 7-day meal plans tailored to your exact caloric deficit or surplus, dietary restrictions, and cuisine preferences.
                <span className="text-purple-600 font-semibold text-sm block mt-3">Generate Meal Plan →</span>
              </p>
            </Link>

            {/* Adaptive Workout Routines Card */}
            <Link
              to="/ExercisesPage"
              className="block bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl shadow-sm hover:shadow-xl text-center card-hover border border-blue-100/80 transition-all duration-300 hover:scale-105 group"
            >
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-2xl inline-flex mb-6 text-white group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Adaptive Workout Routines</h3>
              <p className="text-gray-700 leading-relaxed">
                Access structured strength training, yoga mobility, cardio fat burning, and hypertrophy splits with detailed exercises, sets, and rep ranges.
                <span className="text-blue-600 font-semibold text-sm block mt-3">View Exercise Plans →</span>
              </p>
            </Link>

            {/* AI Chat Assistant Card */}
            <div
              className="block bg-gradient-to-br from-green-50 to-purple-50 p-8 rounded-2xl shadow-sm hover:shadow-xl text-center card-hover border border-green-100/80 transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <div className="bg-gradient-to-r from-green-600 to-purple-600 p-4 rounded-2xl inline-flex mb-6 text-white group-hover:scale-110 transition-transform">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 AI Chat Coach</h3>
              <p className="text-gray-700 leading-relaxed">
                Get instant answers to your nutrition questions, ingredient swaps, and workout form tips directly from our intelligent assistant.
                <span className="text-green-600 font-semibold text-sm block mt-3">Click bottom right bubble to chat 💬</span>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-3">
            What Our Users Say
          </h2>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
            Real stories from members who reached their wellness milestones with FitAI.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center border border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-5 object-cover shadow-md border-4 border-purple-50 animation-float"
                  loading="lazy"
                />
                <p className="text-base text-gray-700 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-purple-600 font-medium">{testimonial.role}</p>
                <div className="flex justify-center mt-3 text-amber-400" aria-label="User rating: 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Start Your Transformation Today!
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join thousands achieving their health goals with AI-powered nutrition and workouts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth?mode=signup"
              className="px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Sign Up for Free
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
