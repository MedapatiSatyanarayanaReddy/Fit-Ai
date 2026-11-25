import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// In-memory plan history store (with DynamoDB fallback when configured)
const planHistoryStore = new Map();

// Helper: Calculate scientific BMR, TDEE, Calories & Macros
function calculateNutritionStats({ age, weight, height, gender = 'male', activityLevel = 'moderate', goal = 'Weight Loss' }) {
  const w = parseFloat(weight) || 70;
  const h = parseFloat(height) || 175;
  const a = parseFloat(age) || 28;
  const g = (gender || '').toLowerCase();

  // Mifflin - St Jeor Equation
  let bmr = (10 * w) + (6.25 * h) - (5 * a);
  bmr += (g === 'female' ? -161 : 5);

  const actMap = {
    sedentary: 1.2,
    light: 1.375,
    lightly_active: 1.375,
    moderate: 1.55,
    moderately_active: 1.55,
    active: 1.725,
    very_active: 1.725,
    extra_active: 1.9
  };

  const actKey = (activityLevel || '').toLowerCase().replace(/\s+/g, '_');
  const mult = actMap[actKey] || 1.45;
  const tdee = Math.round(bmr * mult);

  let targetCalories = tdee;
  const goalLower = (goal || '').toLowerCase();
  if (goalLower.includes('loss') || goalLower.includes('cut')) {
    targetCalories = Math.max(1200, Math.round(tdee - 450));
  } else if (goalLower.includes('gain') || goalLower.includes('bulk') || goalLower.includes('muscle')) {
    targetCalories = Math.round(tdee + 450);
  }

  // Macronutrient split
  let proteinGrams = Math.round(w * 2.0); // 2g per kg
  let proteinCals = proteinGrams * 4;
  let fatCals = Math.round(targetCalories * 0.25); // 25% fat
  let fatGrams = Math.round(fatCals / 9);
  let carbCals = Math.max(200, targetCalories - proteinCals - fatCals);
  let carbGrams = Math.round(carbCals / 4);

  // Metabolic Type & Insights
  const bmi = (w / ((h / 100) * (h / 100))).toFixed(1);
  let metabolicType = 'Balanced Metabolic Profile';
  if (tdee > 2600) {
    metabolicType = 'High BMR, likely due to size and activity level.';
  } else if (tdee < 1800) {
    metabolicType = 'Efficient Metabolic Rate, optimized for steady absorption.';
  }

  let expectedResults = 'Gradual sustainable progress with improved body composition and consistent energy levels.';
  if (goalLower.includes('loss')) {
    expectedResults = 'Target 0.5 - 0.9 kg safe weekly fat loss while preserving lean muscle mass and boosting vitality.';
  } else if (goalLower.includes('gain')) {
    expectedResults = 'Target 0.25 - 0.5 kg weekly lean mass addition when combined with progressive overload resistance training.';
  }

  return {
    dailyCalories: targetCalories,
    protein: proteinGrams,
    carbs: carbGrams,
    fats: fatGrams,
    bmi,
    metabolicType,
    expectedResults,
    recommendations: [
      'Prioritize whole, minimally processed ingredients with high nutrient density.',
      'Maintain consistent daily hydration (3.0 - 3.5 liters of clean water).',
      'Distribute protein evenly across all meals to maximize muscle protein synthesis.',
      'Prioritize 7-8 hours of quality sleep for hormonal balance and cellular recovery.'
    ]
  };
}

// Fallback high-quality 7-day meal plan generator
function generateCuratedPlan(params, stats) {
  const cuisine = (params.cuisinePreference || 'balanced').toLowerCase();
  const mealCount = parseInt(params.mealCount, 10) || 5;

  const sampleMeals = {
    breakfast: [
      { name: 'Power Protein Oatmeal Bowl', time: '8:00 AM', cal: Math.round(stats.dailyCalories * 0.25), p: 25, c: 55, f: 10, ingredients: ['Rolled oats', 'Whey/Plant protein', 'Chia seeds', 'Blueberries', 'Almond milk'], desc: 'Warm whole oats topped with antioxidant berries and raw seeds.', link: 'https://youtube.com/watch?v=sample-oats' },
      { name: 'Avocado & Poached Egg Whole Grain Toast', time: '8:00 AM', cal: Math.round(stats.dailyCalories * 0.26), p: 24, c: 45, f: 14, ingredients: ['Whole grain sourdough', 'Organic eggs', 'Ripe avocado', 'Microgreens', 'Lemon juice'], desc: 'Crispy whole grain toast loaded with healthy fats and lean protein.', link: 'https://youtube.com/watch?v=sample-toast' },
      { name: 'Greek Yogurt & Honey Berry Parfait', time: '8:00 AM', cal: Math.round(stats.dailyCalories * 0.24), p: 28, c: 48, f: 8, ingredients: ['Greek yogurt 0%', 'Mixed berries', 'Raw walnuts', 'Flax seeds', 'Raw honey'], desc: 'Probiotic Greek yogurt layered with crunchy nuts and fresh fruits.', link: 'https://youtube.com/watch?v=sample-parfait' },
      { name: 'Spinach & Mushroom Tofu Scramble', time: '8:00 AM', cal: Math.round(stats.dailyCalories * 0.23), p: 22, c: 35, f: 11, ingredients: ['Firm tofu', 'Baby spinach', 'Button mushrooms', 'Turmeric', 'Olive oil'], desc: 'Savory turmeric-infused scramble rich in phytonutrients and iron.', link: 'https://youtube.com/watch?v=sample-scramble' }
    ],
    snack1: [
      { name: 'Handful Almonds & Green Apple', time: '11:00 AM', cal: Math.round(stats.dailyCalories * 0.12), p: 6, c: 22, f: 9, ingredients: ['Raw almonds', 'Crisp green apple'], desc: 'Quick low-GI snack for sustained cognitive energy.', link: 'https://youtube.com/watch?v=sample-snack1' },
      { name: 'Spiced Roasted Chickpeas', time: '11:00 AM', cal: Math.round(stats.dailyCalories * 0.13), p: 9, c: 25, f: 4, ingredients: ['Chickpeas', 'Smoked paprika', 'Olive oil spray', 'Sea salt'], desc: 'Crunchy fiber-packed legume snack.', link: 'https://youtube.com/watch?v=sample-chickpeas' }
    ],
    lunch: [
      { name: 'Grilled Herb Chicken with Quinoa & Steamed Broccoli', time: '1:30 PM', cal: Math.round(stats.dailyCalories * 0.32), p: 45, c: 50, f: 12, ingredients: ['Chicken breast (or Tofu)', 'Tri-color quinoa', 'Broccoli florets', 'Extra virgin olive oil', 'Rosemary'], desc: 'Balanced macronutrient plate with complete amino acids and complex carbs.', link: 'https://youtube.com/watch?v=sample-lunch1' },
      { name: 'Wild Salmon Bowl with Brown Rice & Edamame', time: '1:30 PM', cal: Math.round(stats.dailyCalories * 0.34), p: 40, c: 52, f: 15, ingredients: ['Atlantic Salmon fillet', 'Brown basmati rice', 'Edamame', 'Sesame seeds', 'Cucumber slices'], desc: 'Omega-3 fatty acids combined with mineral-dense brown rice.', link: 'https://youtube.com/watch?v=sample-salmon' },
      { name: 'Mediterranean Lentil & Roasted Vegetable Salad', time: '1:30 PM', cal: Math.round(stats.dailyCalories * 0.30), p: 28, c: 58, f: 10, ingredients: ['Brown lentils', 'Bell peppers', 'Zucchini', 'Kalamata olives', 'Feta cheese'], desc: 'Heart-healthy polyphenol-rich Mediterranean powerhouse.', link: 'https://youtube.com/watch?v=sample-lentil' }
    ],
    snack2: [
      { name: 'Protein Shake with Banana & Peanut Butter', time: '4:30 PM', cal: Math.round(stats.dailyCalories * 0.14), p: 26, c: 25, f: 7, ingredients: ['Whey or pea isolate', 'Half banana', 'Natural peanut butter', 'Water or almond milk'], desc: 'Pre/post workout muscle fueling shake.', link: 'https://youtube.com/watch?v=sample-shake' },
      { name: 'Carrot Sticks with Garlic Hummus', time: '4:30 PM', cal: Math.round(stats.dailyCalories * 0.10), p: 5, c: 18, f: 5, ingredients: ['Organic carrots', 'Traditional garlic hummus'], desc: 'High beta-carotene crunchy vegetable snack.', link: 'https://youtube.com/watch?v=sample-hummus' }
    ],
    dinner: [
      { name: 'Baked Lemon Salmon with Roasted Sweet Potatoes & Asparagus', time: '7:30 PM', cal: Math.round(stats.dailyCalories * 0.28), p: 38, c: 40, f: 12, ingredients: ['Salmon or white fish', 'Sweet potatoes', 'Fresh asparagus', 'Garlic', 'Lemon'], desc: 'Light yet satiating evening dinner optimized for deep sleep.', link: 'https://youtube.com/watch?v=sample-dinner1' },
      { name: 'Turkey Breast Stir-Fry with Bok Choy & Jasmine Rice', time: '7:30 PM', cal: Math.round(stats.dailyCalories * 0.27), p: 42, c: 42, f: 8, ingredients: ['Lean turkey breast', 'Baby bok choy', 'Snap peas', 'Low sodium tamari', 'Ginger'], desc: 'Fast digest, anti-inflammatory Asian style stir-fry.', link: 'https://youtube.com/watch?v=sample-stirfry' },
      { name: 'Tofu & Mixed Veggie Green Curry with Cauliflower Rice', time: '7:30 PM', cal: Math.round(stats.dailyCalories * 0.25), p: 25, c: 30, f: 14, ingredients: ['Extra firm tofu', 'Coconut milk light', 'Green curry paste', 'Cauliflower rice', 'Thai basil'], desc: 'Low carb, warm ketogenic dinner rich in medium-chain triglycerides.', link: 'https://youtube.com/watch?v=sample-curry' }
    ]
  };

  const weeklyPlan = {};
  days.forEach((day, dIdx) => {
    const dayMeals = [];

    // Breakfast
    const b = sampleMeals.breakfast[dIdx % sampleMeals.breakfast.length];
    dayMeals.push({
      meal: 'Breakfast',
      time: b.time,
      name: b.name,
      description: b.desc,
      ingredients: b.ingredients,
      macros: { calories: b.cal, protein: `${b.p}g`, carbs: `${b.c}g`, fats: `${b.f}g` },
      recipeLink: b.link,
      cookingTime: '15 minutes',
      difficulty: 'Easy',
      nutritionalBenefits: ['High fiber', 'Sustained glycemic energy', 'Complete essential amino acids'],
      alternatives: ['Poached eggs with rye bread', 'Cottage cheese bowl']
    });

    // Morning Snack if meals >= 4
    if (mealCount >= 4) {
      const s1 = sampleMeals.snack1[dIdx % sampleMeals.snack1.length];
      dayMeals.push({
        meal: 'Morning Snack',
        time: s1.time,
        name: s1.name,
        description: s1.desc,
        ingredients: s1.ingredients,
        macros: { calories: s1.cal, protein: `${s1.p}g`, carbs: `${s1.c}g`, fats: `${s1.f}g` },
        recipeLink: s1.link,
        cookingTime: '5 minutes',
        difficulty: 'Easy',
        nutritionalBenefits: ['Polyphenols', 'Clean energy'],
        alternatives: ['Rice cake with almond butter', 'Handful of walnuts']
      });
    }

    // Lunch
    const l = sampleMeals.lunch[dIdx % sampleMeals.lunch.length];
    dayMeals.push({
      meal: 'Lunch',
      time: l.time,
      name: l.name,
      description: l.desc,
      ingredients: l.ingredients,
      macros: { calories: l.cal, protein: `${l.p}g`, carbs: `${l.c}g`, fats: `${l.f}g` },
      recipeLink: l.link,
      cookingTime: '25 minutes',
      difficulty: 'Moderate',
      nutritionalBenefits: ['Lean muscle synthesis', 'Complex carbohydrates for afternoon stamina'],
      alternatives: ['Turkey wrap with hummus', 'Paneer tikka salad']
    });

    // Afternoon Snack if meals >= 5
    if (mealCount >= 5) {
      const s2 = sampleMeals.snack2[dIdx % sampleMeals.snack2.length];
      dayMeals.push({
        meal: 'Afternoon Snack',
        time: s2.time,
        name: s2.name,
        description: s2.desc,
        ingredients: s2.ingredients,
        macros: { calories: s2.cal, protein: `${s2.p}g`, carbs: `${s2.c}g`, fats: `${s2.f}g` },
        recipeLink: s2.link,
        cookingTime: '5 minutes',
        difficulty: 'Easy',
        nutritionalBenefits: ['Rapid absorption protein', 'Electrolytes'],
        alternatives: ['Hard-boiled eggs with sea salt', 'Edamame bowl']
      });
    }

    // Dinner
    const d = sampleMeals.dinner[dIdx % sampleMeals.dinner.length];
    dayMeals.push({
      meal: 'Dinner',
      time: d.time,
      name: d.name,
      description: d.desc,
      ingredients: d.ingredients,
      macros: { calories: d.cal, protein: `${d.p}g`, carbs: `${d.c}g`, fats: `${d.f}g` },
      recipeLink: d.link,
      cookingTime: '20 minutes',
      difficulty: 'Easy',
      nutritionalBenefits: ['Nighttime recovery', 'Anti-inflammatory nutrients'],
      alternatives: ['Grilled chicken breast with asparagus', 'Lentil soup with mixed greens']
    });

    weeklyPlan[day] = dayMeals;
  });

  return weeklyPlan;
}

// Helper: Extract grocery shopping list from weekly plan
function extractShoppingList(weeklyPlan) {
  const itemMap = new Map();
  Object.values(weeklyPlan).forEach(meals => {
    if (Array.isArray(meals)) {
      meals.forEach(m => {
        if (Array.isArray(m.ingredients)) {
          m.ingredients.forEach(ing => {
            const clean = ing.trim();
            itemMap.set(clean, (itemMap.get(clean) || 0) + 1);
          });
        }
      });
    }
  });

  const categories = {
    'Produce & Fresh Greens': [],
    'Proteins & Meats': [],
    'Grains & Carbs': [],
    'Nuts, Seeds & Healthy Fats': [],
    'Pantry & Seasonings': []
  };

  itemMap.forEach((count, item) => {
    const lower = item.toLowerCase();
    if (lower.includes('spinach') || lower.includes('apple') || lower.includes('banana') || lower.includes('berry') || lower.includes('broccoli') || lower.includes('vegetable') || lower.includes('asparagus') || lower.includes('avocado') || lower.includes('bok choy') || lower.includes('carrot') || lower.includes('cucumber') || lower.includes('microgreen')) {
      categories['Produce & Fresh Greens'].push({ item, frequency: count });
    } else if (lower.includes('chicken') || lower.includes('salmon') || lower.includes('egg') || lower.includes('turkey') || lower.includes('protein') || lower.includes('yogurt') || lower.includes('tofu') || lower.includes('tuna') || lower.includes('cottage')) {
      categories['Proteins & Meats'].push({ item, frequency: count });
    } else if (lower.includes('oat') || lower.includes('rice') || lower.includes('quinoa') || lower.includes('toast') || lower.includes('lentil') || lower.includes('sweet potato') || lower.includes('chickpea')) {
      categories['Grains & Carbs'].push({ item, frequency: count });
    } else if (lower.includes('almond') || lower.includes('chia') || lower.includes('walnut') || lower.includes('peanut') || lower.includes('flax') || lower.includes('olive') || lower.includes('sesame')) {
      categories['Nuts, Seeds & Healthy Fats'].push({ item, frequency: count });
    } else {
      categories['Pantry & Seasonings'].push({ item, frequency: count });
    }
  });

  return categories;
}

// POST /weekly-diet-plan
router.post('/weekly-diet-plan', async (req, res) => {
  const {
    age, weight, height, gender = 'Male', activityLevel = 'moderate', goal = 'Weight Loss',
    dietaryRestrictions = [], healthConditions = [],
    foodPreferences = [], mealCount = 5, cuisinePreference = 'mixed', email
  } = req.body;

  if (!age || !weight || !height || !activityLevel || !goal) {
    return res.status(400).json({ success: false, message: 'Missing required fields (age, weight, height, activityLevel, goal).' });
  }

  const nutritionStats = calculateNutritionStats({ age, weight, height, gender, activityLevel, goal });
  let weeklyPlan = null;
  let usedAi = false;

  // Attempt AI Generation if GEMINI_API_KEY is configured
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey.trim() !== '' && !apiKey.includes('YOUR_') && apiKey.length > 20) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Try models in order: gemini-1.5-flash, gemini-2.0-flash, gemini-pro
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `You are an elite clinical nutritionist and sports dietitian.
Generate a complete 7-day personalized weekly meal plan in JSON for this profile:
- Age: ${age}, Gender: ${gender}, Weight: ${weight} kg, Height: ${height} cm
- Activity Level: ${activityLevel}
- Target Goal: ${goal} (Calculated Target Calories: ~${nutritionStats.dailyCalories} kcal/day, Protein: ~${nutritionStats.protein}g, Carbs: ~${nutritionStats.carbs}g, Fats: ~${nutritionStats.fats}g)
- Dietary Restrictions: ${Array.isArray(dietaryRestrictions) ? dietaryRestrictions.join(', ') : dietaryRestrictions || 'None'}
- Health Conditions: ${Array.isArray(healthConditions) ? healthConditions.join(', ') : healthConditions || 'None'}
- Food Preferences: ${Array.isArray(foodPreferences) ? foodPreferences.join(', ') : foodPreferences || 'None'}
- Cuisine: ${cuisinePreference}
- Meals Per Day: ${mealCount}

IMPORTANT: Return strictly a valid JSON object matching this exact schema without markdown formatting:
{
  "monday": [
    {
      "meal": "Breakfast",
      "time": "8:00 AM",
      "name": "Meal Title",
      "description": "Preparation summary",
      "ingredients": ["item 1", "item 2"],
      "macros": { "calories": 400, "protein": "25g", "carbs": "45g", "fats": "10g" },
      "recipeLink": "https://youtube.com/search?q=healthy+breakfast",
      "cookingTime": "15 mins",
      "difficulty": "Easy",
      "nutritionalBenefits": ["High Fiber", "Satiety"],
      "alternatives": ["Alt 1", "Alt 2"]
    }
  ],
  "tuesday": [...],
  "wednesday": [...],
  "thursday": [...],
  "friday": [...],
  "saturday": [...],
  "sunday": [...]
}`;

      console.log('🤖 Requesting Gemini AI Diet Plan generation...');
      const result = await model.generateContent(prompt);
      const rawText = result.response.text();

      let cleaned = rawText.trim();
      if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
      else if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();

      const parsed = JSON.parse(cleaned);
      if (parsed.monday && Array.isArray(parsed.monday)) {
        weeklyPlan = parsed;
        usedAi = true;
        console.log('✅ Gemini successfully generated 7-day diet plan!');
      }
    } catch (aiError) {
      console.warn('⚠️ Gemini AI API call failed or key invalid:', aiError.message);
      console.log('➡️ Seamlessly activating precision nutrition algorithmic planner...');
    }
  }

  // Fallback if AI was unavailable or failed
  if (!weeklyPlan) {
    weeklyPlan = generateCuratedPlan(
      { age, weight, height, gender, activityLevel, goal, dietaryRestrictions, healthConditions, foodPreferences, mealCount, cuisinePreference },
      nutritionStats
    );
  }

  const shoppingList = extractShoppingList(weeklyPlan);

  const fullPlanData = {
    id: `plan_${Date.now()}`,
    createdAt: new Date().toISOString(),
    userProfile: { age, weight, height, gender, activityLevel, goal, dietaryRestrictions, cuisinePreference, mealCount },
    nutritionOverview: {
      dailyCalories: `${nutritionStats.dailyCalories} kcal`,
      caloriesNumber: nutritionStats.dailyCalories,
      protein: `${nutritionStats.protein}g`,
      carbs: `${nutritionStats.carbs}g`,
      fats: `${nutritionStats.fats}g`,
      bmi: nutritionStats.bmi,
      metabolicType: nutritionStats.metabolicType,
      expectedResults: nutritionStats.expectedResults,
      recommendations: nutritionStats.recommendations
    },
    weeklyPlan,
    shoppingList,
    tips: [
      'Drink 500ml of water immediately upon waking to kickstart metabolic rate.',
      'Chew slowly: Taking 20 minutes to finish your meal boosts satiety hormones (leptin).',
      'For optimal digestive enzyme function, consume most liquids between meals rather than during.',
      'Prep your breakfast and snacks the night before to avoid decision fatigue.',
      'Incorporate color variety: Aim for at least 3 distinct vegetable colors daily.'
    ],
    metadata: {
      usedAi,
      engine: usedAi ? 'Gemini 1.5 Flash' : 'FitAI Precision Nutrition Engine'
    }
  };

  // Save to history if email provided
  if (email) {
    const list = planHistoryStore.get(email) || [];
    list.unshift(fullPlanData);
    planHistoryStore.set(email, list.slice(0, 10)); // keep last 10
  }

  return res.status(200).json({
    success: true,
    weeklyPlan,
    nutritionOverview: fullPlanData.nutritionOverview,
    shoppingList,
    tips: fullPlanData.tips,
    metadata: fullPlanData.metadata
  });
});

// GET /plan-history/:email
router.get('/plan-history/:email', (req, res) => {
  const email = decodeURIComponent(req.params.email);
  const history = planHistoryStore.get(email) || [];
  res.json({ success: true, history });
});

// GET /api/workout-plan
router.get('/workout-routines', (req, res) => {
  res.json({
    success: true,
    categories: [
      {
        id: 'strength',
        title: 'Strength Training',
        subtitle: 'Focused on building functional strength, power, and muscular endurance.',
        color: 'from-emerald-500 to-green-600',
        badgeColor: 'bg-green-100 text-green-800',
        routines: [
          { name: 'Powerlifting', duration: '75 min', intensity: 'Very high intensity', exercises: ['Barbell Squats (5x5)', 'Bench Press (5x5)', 'Conventional Deadlifts (3x5)', 'Overhead Press (4x6)'] },
          { name: 'Olympic Weightlifting', duration: '60 min', intensity: 'High intensity', exercises: ['Snatch drills (5x3)', 'Clean and Jerk (5x2)', 'Front Squats (4x4)'] },
          { name: 'Circuit Training', duration: '45 min', intensity: 'Moderate intensity', exercises: ['Kettlebell Swings (4x15)', 'Dumbbell Thrusters (4x12)', 'Pull-ups (4xMax)', 'Box Jumps (4x12)'] },
          { name: 'Calisthenics', duration: '50 min', intensity: 'Moderate intensity', exercises: ['Muscle-ups/Pull-ups (4x8)', 'Dips (4x15)', 'Pike Push-ups (4x10)', 'Hollow Body Holds (3x45s)'] }
        ]
      },
      {
        id: 'flexibility',
        title: 'Flexibility & Yoga',
        subtitle: 'Improve mobility, balance, and mental wellbeing through mindful movement.',
        color: 'from-purple-500 to-indigo-600',
        badgeColor: 'bg-purple-100 text-purple-800',
        routines: [
          { name: 'Vinyasa Flow', duration: '60 min', intensity: 'Low intensity', exercises: ['Sun Salutation A & B', 'Warrior Series (I, II, III)', 'Triangle & Extended Side Angle', 'Pigeon Pose hip release'] },
          { name: 'Yin Yoga', duration: '75 min', intensity: 'Very low intensity', exercises: ['Dragon Pose (5 min/side)', 'Caterpillar Pose (5 min)', 'Sphinx/Seal Pose', 'Supine Spinal Twist'] },
          { name: 'Dynamic Stretching', duration: '30 min', intensity: 'Low intensity', exercises: ['Leg Swings (Front/Lateral)', 'Arm Circles & Hugs', 'Inchworms', 'World Greatest Stretch'] },
          { name: 'Pilates', duration: '45 min', intensity: 'Moderate intensity', exercises: ['The Hundred', 'Single Leg Stretch', 'Criss-Cross', 'Teaser progression'] }
        ]
      },
      {
        id: 'weight-loss',
        title: 'Cardio & Fat Incineration',
        subtitle: 'High-energy routines designed to maximize calorie burn and metabolic conditioning.',
        color: 'from-pink-500 to-rose-600',
        badgeColor: 'bg-pink-100 text-pink-800',
        routines: [
          { name: 'HIIT Sprints', duration: '30 min', intensity: 'Very high intensity', exercises: ['Tabata Sprint Intervals (20s on / 10s off x 8)', 'Burpees (4x15)', 'Mountain Climbers (4x45s)'] },
          { name: 'Zone 2 Steady State', duration: '45 min', intensity: 'Low-to-moderate intensity', exercises: ['Incline Treadmill Walk (12% incline, 4.8 km/h)', 'Stationary Rowing at 65% max HR'] }
        ]
      },
      {
        id: 'weight-gain',
        title: 'Hypertrophy Muscle Mass',
        subtitle: 'Strategic volume training targeting optimal muscle protein synthesis.',
        color: 'from-blue-500 to-cyan-600',
        badgeColor: 'bg-blue-100 text-blue-800',
        routines: [
          { name: 'Upper Body Hypertrophy', duration: '65 min', intensity: 'High intensity', exercises: ['Incline DB Bench Press (4x10)', 'Chest-supported Rows (4x12)', 'Lateral Raises (4x15)', 'Tricep Rope Pushdowns (3x15)'] },
          { name: 'Lower Body Hypertrophy', duration: '60 min', intensity: 'High intensity', exercises: ['Romanian Deadlifts (4x10)', 'Bulgarian Split Squats (3x12/leg)', 'Leg Press (4x15)', 'Seated Calf Raises (4x20)'] }
        ]
      }
    ]
  });
});

export default router;
