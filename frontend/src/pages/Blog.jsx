import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      title: 'The Science of Protein Distribution: How Much Do You Really Need?',
      snippet: 'Learn why spreading protein evenly across 4 to 5 daily feedings maximizes muscle protein synthesis (MPS) versus eating one large evening meal.',
      author: 'FitAI Nutrition Team',
      date: 'Nov 20, 2026',
      readTime: '5 min read',
      tag: 'Nutrition Science',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: 'Zone 2 Cardio: The Secret to Mitochondrial Health and Fat Oxidation',
      snippet: 'Why exercising at 60-70% of your maximum heart rate burns significantly more subcutaneous fat while keeping cortisol levels in check.',
      author: 'Exercise Physiology Lab',
      date: 'Nov 14, 2026',
      readTime: '6 min read',
      tag: 'Workouts',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60'
    },
    {
      title: 'Overcoming Metabolic Adaptation During Long Caloric Deficits',
      snippet: 'Practical refeed days and diet breaks to normalize leptin hormones, sustain thyroid output, and prevent weight loss plateaus.',
      author: 'Dr. Evelyn Ward, RD',
      date: 'Nov 08, 2026',
      readTime: '8 min read',
      tag: 'Metabolism',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full">
            FitAI Journal & Research
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Evidence-Based Insights
          </h1>
          <p className="text-gray-600 text-lg">
            Stay informed with the latest breakthroughs in clinical nutrition, human performance, and metabolic health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-3">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-md">
                    {post.tag}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.snippet}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span>{post.date} · {post.readTime}</span>
                <Link to="/current-diet-plan" className="text-purple-600 font-bold hover:text-purple-700 flex items-center gap-1">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;
