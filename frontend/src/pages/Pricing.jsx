import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';

const Pricing = () => {
  const tiers = [
    {
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      description: 'Ideal for trying out AI meal plan generation and basic workout routines.',
      features: [
        'Full 7-Day AI Meal Plan Generation',
        'Daily Calorie & Macro Target Calculations',
        'Pre-made Workout Exercise Routines',
        'Basic Grocery Shopping List',
        'Community Nutrition Guidelines'
      ],
      highlight: false,
      btnText: 'Start Free',
      btnLink: '/current-diet-plan'
    },
    {
      name: 'FitAI Pro Athlete',
      price: '$12',
      period: 'per month',
      description: 'Advanced sports nutrition with real-time AI Coaching and progressive workout overload.',
      features: [
        'Unlimited AI Diet Plan Generations',
        'Real-time 24/7 AI Chat Coach with Gemini',
        'Customized Progressive Workout Generator',
        'Automated Grocery List Export to PDF',
        'Biometric Progress & Photo Tracking',
        'Priority Cloud DynamoDB Sync'
      ],
      highlight: true,
      btnText: 'Upgrade to Pro',
      btnLink: '/auth?mode=signup'
    },
    {
      name: 'Coaching & Clinical',
      price: '$39',
      period: 'per month',
      description: 'For trainers, coaches, and users managing specific metabolic or endocrine requirements.',
      features: [
        'Everything in Pro Plan',
        'Multi-client Profile Management',
        'Clinical Micronutrient Breakdown',
        'Custom Supplement Stack Formulation',
        'Dedicated 1-on-1 Certified Coach Review'
      ],
      highlight: false,
      btnText: 'Contact Specialist',
      btnLink: '/about'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full">
            Simple, Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Invest in Your Vitality
          </h1>
          <p className="text-gray-600 text-lg">
            Choose the tier that matches your fitness ambitions. No hidden charges. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.highlight
                  ? 'bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900 text-white shadow-2xl scale-105 border-2 border-purple-400'
                  : 'bg-white text-gray-900 shadow-sm border border-gray-100 hover:shadow-lg'
              }`}
            >
              <div className="space-y-6">
                {tier.highlight && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-purple-500/30 text-purple-300 border border-purple-400/30 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" /> Most Popular Choice
                  </span>
                )}
                <div>
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <p className={`text-sm mt-1.5 ${tier.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tier.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                  <span className={`text-sm font-medium ${tier.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                    /{tier.period}
                  </span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-gray-200/20 text-sm">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${tier.highlight ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to={tier.btnLink}
                  className={`block w-full py-3.5 text-center font-bold rounded-xl shadow-md transition-all ${
                    tier.highlight
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  {tier.btnText}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Pricing;
