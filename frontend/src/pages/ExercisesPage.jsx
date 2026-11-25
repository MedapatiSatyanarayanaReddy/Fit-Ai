import React, { useState } from 'react';
import { Dumbbell, Flame, Activity, Zap, Check, ChevronDown, ChevronUp } from 'lucide-react';

const ExercisesPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const categories = [
    {
      id: 'strength',
      title: 'Strength Training',
      subtitle: 'Focused on building functional strength, power, and muscular endurance.',
      color: 'emerald',
      bgGradient: 'from-emerald-50 to-green-50',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700',
      badge: 'bg-emerald-100 text-emerald-800',
      routines: [
        { name: 'Powerlifting', time: '75 min', intensity: 'Very high intensity', exercises: ['Barbell Squats: 5 sets x 5 reps', 'Flat Bench Press: 5 sets x 5 reps', 'Deadlifts: 3 sets x 5 reps', 'Overhead Barbell Press: 4 sets x 6 reps'] },
        { name: 'Olympic Weightlifting', time: '60 min', intensity: 'High intensity', exercises: ['Snatch High Pulls: 5 sets x 3 reps', 'Clean & Jerk Drills: 5 sets x 2 reps', 'Front Squats: 4 sets x 4 reps'] },
        { name: 'Circuit Training', time: '45 min', intensity: 'Moderate intensity', exercises: ['Kettlebell Swings: 4 sets x 15 reps', 'Box Jumps: 4 sets x 12 reps', 'Pull-ups: 4 sets x max', 'Battle Ropes: 4 rounds x 30s'] },
        { name: 'Calisthenics', time: '50 min', intensity: 'Moderate intensity', exercises: ['Muscle-ups / Bar Pull-ups: 4 sets x 8 reps', 'Parallel Bar Dips: 4 sets x 15 reps', 'Hollow Body Hold: 3 sets x 45s'] }
      ]
    },
    {
      id: 'flexibility',
      title: 'Flexibility & Yoga',
      subtitle: 'Improve mobility, balance, and mental wellbeing through mindful movement.',
      color: 'purple',
      bgGradient: 'from-purple-50 to-indigo-50',
      btnBg: 'bg-purple-600 hover:bg-purple-700',
      badge: 'bg-purple-100 text-purple-800',
      routines: [
        { name: 'Vinyasa Flow', time: '60 min', intensity: 'Low intensity', exercises: ['Sun Salutations A & B: 5 rounds', 'Warrior Series (I, II, III): 3 min/side', 'Extended Side Angle', 'Pigeon Pose hip opener: 3 min'] },
        { name: 'Yin Yoga', time: '75 min', intensity: 'Very low intensity', exercises: ['Dragon Pose: 5 min/side', 'Caterpillar Forward Fold: 5 min', 'Sphinx / Seal Pose: 4 min', 'Supine Spinal Twist: 5 min/side'] },
        { name: 'Dynamic Stretching', time: '30 min', intensity: 'Low intensity', exercises: ['Leg Swings (Front/Lateral): 20 reps/leg', 'Arm Circles & Thoracic Hugs: 30s', 'Inchworms to Cobra: 10 reps', 'World’s Greatest Stretch: 8 reps/side'] },
        { name: 'Pilates', time: '45 min', intensity: 'Moderate intensity', exercises: ['The Hundred: 100 pumps', 'Single Leg Stretch: 3 sets x 12 reps', 'Criss-Cross core twist: 3 sets x 15 reps', 'Teaser Progression: 3 sets x 8 reps'] }
      ]
    },
    {
      id: 'weight-loss',
      title: 'Cardio & Fat Incineration',
      subtitle: 'High-energy routines designed to maximize calorie burn and metabolic conditioning.',
      color: 'pink',
      bgGradient: 'from-pink-50 to-rose-50',
      btnBg: 'bg-pink-600 hover:bg-pink-700',
      badge: 'bg-pink-100 text-pink-800',
      routines: [
        { name: 'HIIT Tabata Protocol', time: '30 min', intensity: 'Maximum intensity', exercises: ['Sprint Intervals: 20s sprint / 10s rest x 8', 'Burpees with jump: 4 sets x 15 reps', 'Mountain Climbers: 4 sets x 45s'] },
        { name: 'Zone 2 Fat-Oxidation Cardio', time: '50 min', intensity: 'Low-to-moderate intensity', exercises: ['Treadmill Incline Walk (12% incline, 5 km/h)', 'Stationary Cycling at 65% max HR'] }
      ]
    },
    {
      id: 'weight-gain',
      title: 'Hypertrophy Muscle Builder',
      subtitle: 'Strategic volume training targeting optimal muscle protein synthesis.',
      color: 'blue',
      bgGradient: 'from-blue-50 to-cyan-50',
      btnBg: 'bg-blue-600 hover:bg-blue-700',
      badge: 'bg-blue-100 text-blue-800',
      routines: [
        { name: 'Push / Chest & Shoulders', time: '65 min', intensity: 'High intensity', exercises: ['Incline DB Press: 4 sets x 10 reps', 'Dumbbell Lateral Raises: 4 sets x 15 reps', 'Cable Tricep Pushdowns: 3 sets x 15 reps'] },
        { name: 'Legs / Quad & Glute Hypertrophy', time: '65 min', intensity: 'High intensity', exercises: ['Barbell Squats: 4 sets x 8 reps', 'Bulgarian Split Squats: 3 sets x 12 reps/leg', 'Leg Press: 4 sets x 15 reps'] }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Dumbbell className="w-4 h-4" /> Exercise & Movement Laboratory
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Adaptive Workout Routines
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose a training modality calibrated to your energy system and weekly availability.
          </p>
        </div>

        {/* Exercises Grid (Matches screenshot fitai_1.jpg!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between space-y-6 hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${cat.bgGradient}`}>
                    <Dumbbell className={`w-6 h-6 text-${cat.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{cat.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{cat.subtitle}</p>
                  </div>
                </div>

                {/* Sub-routines preview (Exact match to fitai_1.jpg layout!) */}
                <div className="mt-8 space-y-4">
                  {cat.routines.map((r, rIdx) => (
                    <div key={rIdx} className="border-b border-gray-100 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-base">{r.name}</span>
                        <span className="text-xs text-gray-400 font-medium">{r.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{r.time} · {r.intensity}</p>

                      {/* If expanded */}
                      {selectedPlan === `${cat.id}-${rIdx}` && (
                        <div className="mt-3 p-3 bg-slate-50 rounded-xl space-y-1.5 animate-in fade-in">
                          <p className="text-xs font-bold text-purple-700 uppercase">Prescribed Movements:</p>
                          {r.exercises.map((ex, eIdx) => (
                            <p key={eIdx} className="text-xs text-gray-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                              {ex}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button (Matches fitai_1.jpg: 'View Strength Plan', 'View Flexibility Plan') */}
              <button
                onClick={() => setSelectedPlan(selectedPlan ? null : `${cat.id}-0`)}
                className={`w-full py-4 text-white font-bold rounded-2xl shadow-md transition-all duration-200 text-center ${cat.btnBg}`}
              >
                {selectedPlan ? 'Collapse Plan' : `View ${cat.title.split(' ')[0]} Plan`}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExercisesPage;
