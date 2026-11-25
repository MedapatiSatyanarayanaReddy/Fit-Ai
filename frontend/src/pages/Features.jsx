import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Activity, Bot, Zap, ShieldCheck, HeartPulse, Check, ArrowRight } from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      title: 'Precision Gemini 1.5 Flash AI Engine',
      description: 'Calculates exact caloric expenditures, macronutrient distributions, and micronutrient balance in seconds.',
      icon: Zap,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: '7-Day Granular Meal Schedules',
      description: 'Breakfast, morning snack, lunch, afternoon fuel, and restorative dinners with detailed cooking steps.',
      icon: Utensils,
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      title: 'Adaptive Training & Mobility Splits',
      description: 'Targeted strength training, calisthenics, powerlifting, yoga flows, and metabolic cardio.',
      icon: Activity,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Smart Automated Shopping List',
      description: 'Ingredients are instantly classified into produce, lean proteins, carbs, and pantry items.',
      icon: HeartPulse,
      color: 'text-rose-600 bg-rose-100'
    },
    {
      title: 'Conversational Fitness Coach',
      description: 'Ask questions on the fly about portion sizing, restaurant substitutions, and workout form tips.',
      icon: Bot,
      color: 'text-indigo-600 bg-indigo-100'
    },
    {
      title: 'Privacy-First Architecture',
      description: 'Secure biometric storage with cloud backup on AWS S3 & DynamoDB with zero health data sharing.',
      icon: ShieldCheck,
      color: 'text-amber-600 bg-amber-100'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full">
            FitAI Platform Architecture
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Engineered for Sustainable Results
          </h1>
          <p className="text-gray-600 text-lg">
            Every feature is developed to remove guesswork, eliminate decision fatigue, and guide you directly toward your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${f.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-10 text-white text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to see your custom plan?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Generate your personalized 7-day nutrition and workout roadmap in less than 30 seconds.
          </p>
          <Link to="/current-diet-plan" className="px-8 py-3.5 bg-white text-purple-700 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition inline-block">
            Start Free Generation
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Features;
