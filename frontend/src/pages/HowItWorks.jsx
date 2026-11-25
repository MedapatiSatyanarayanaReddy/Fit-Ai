import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, Cpu, Utensils, TrendingUp, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Create Your Profile',
      desc: 'Tell us about your fitness goals, dietary preferences, allergies, and lifestyle parameters in under two minutes.',
      icon: UserCheck,
      color: 'purple'
    },
    {
      step: '02',
      title: 'AI Analyzes Your Metabolism',
      desc: 'Our Gemini AI engine calculates your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).',
      icon: Cpu,
      color: 'blue'
    },
    {
      step: '03',
      title: 'Get 7-Day Precision Plans',
      desc: 'Receive calibrated weekly menus with exact calories, macronutrients, recipes, and structured workout splits.',
      icon: Utensils,
      color: 'emerald'
    },
    {
      step: '04',
      title: 'Track, Adapt & Transform',
      desc: 'Chat anytime with your AI Fitness Coach to swap meals, adjust routines, and maintain continuous weekly progress.',
      icon: TrendingUp,
      color: 'pink'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header (Matches fitai_4.jpg: 'How AI FitPlanner Works') */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            How <span className="text-purple-600">AI Fit</span><span className="text-green-600">Planner</span> Works
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the simple 4-step process that transforms your health and fitness journey with the power of artificial intelligence.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-12">
          {steps.map((st, idx) => {
            const IconComponent = st.icon;
            return (
              <div
                key={st.step}
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-md transition"
              >
                <div className="text-5xl md:text-6xl font-black text-purple-600/90 font-mono tracking-tighter">
                  {st.step}
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900">{st.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{st.desc}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/current-diet-plan"
            className="btn-primary text-lg inline-flex items-center gap-2"
          >
            Generate Your Plan Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
