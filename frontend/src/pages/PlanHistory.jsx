import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Utensils, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const PlanHistory = ({ user }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = user?.email || 'guest@fitai.com';

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/plan-history/${encodeURIComponent(email)}`)
      .then(res => {
        if (res.data?.history) {
          setHistory(res.data.history);
        }
      })
      .catch(err => console.log('History notice:', err.message))
      .finally(() => setLoading(false));
  }, [email]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Plan History</h1>
            <p className="text-gray-600 text-sm mt-1">Review your previously generated nutrition and diet regimens.</p>
          </div>
          <Link to="/current-diet-plan" className="btn-primary text-sm">
            + Generate New Plan
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading plan history...</div>
        ) : history.length > 0 ? (
          <div className="space-y-4">
            {history.map((plan, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1">
                  <span className="text-xs text-purple-600 font-bold uppercase tracking-wider">
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    {plan.userProfile?.goal || 'Personalized Nutrition Plan'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Calories: {plan.nutritionOverview?.dailyCalories} | Protein: {plan.nutritionOverview?.protein}
                  </p>
                </div>
                <Link
                  to="/current-diet-plan"
                  className="px-4 py-2 bg-purple-50 text-purple-700 font-semibold text-sm rounded-xl hover:bg-purple-100 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl shadow-sm text-center border border-gray-100 space-y-4">
            <Utensils className="w-12 h-12 text-purple-400 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900">No Generated Plans Yet</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Ready to begin? Enter your biomarkers to generate your first custom 7-day AI diet plan!
            </p>
            <Link to="/current-diet-plan" className="btn-primary text-sm inline-block">
              Create Your First Plan
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default PlanHistory;
