import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

router.post('/weekly-diet-plan', async (req, res) => {
  const {
    age, weight, height, activityLevel, goal,
    dietaryRestrictions = [], healthConditions = [],
    foodPreferences = [], mealCount = 6, cuisinePreference = 'mixed'
  } = req.body;

  if (!age || !weight || !height || !activityLevel || !goal) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  try {
    const weeklyPlan = {};

    for (const day of days) {
      const prompt = `
        You are a certified nutritionist. Create a personalized meal plan for one day (${day}) based on:
        - Age: ${age}, Weight: ${weight} kg, Height: ${height} cm
        - Activity Level: ${activityLevel}
        - Goal: ${goal}
        - Dietary Restrictions: ${dietaryRestrictions.join(', ') || 'None'}
        - Health Conditions: ${healthConditions.join(', ') || 'None'}
        - Food Preferences: ${foodPreferences.join(', ') || 'None'}
        - Cuisine Preference: ${cuisinePreference}
        - Meals per day: ${mealCount}

        Return a JSON array with meals (Breakfast, Snack, Lunch, Snack, Dinner) and include:
        - meal
        - time
        - name
        - description
        - ingredients
        - macros (calories, protein, carbs, fats)
        - recipeLink
        - cookingTime
        - difficulty
        - nutritionalBenefits
        - alternatives

        Format output as valid JSON:
        [
          {
            "meal": "Breakfast",
            "time": "8:00 AM",
            "name": "Oats with Fruits",
            "description": "Cook oats and top with banana and chia seeds.",
            "ingredients": ["Oats", "Banana", "Chia seeds"],
            "macros": {
              "calories": 350,
              "protein": "15g",
              "carbs": "50g",
              "fats": "8g"
            },
            "recipeLink": "https://youtube.com/...",
            "cookingTime": "10 minutes",
            "difficulty": 2,
            "nutritionalBenefits": ["Rich in fiber", "High in antioxidants"],
            "alternatives": ["Poha", "Upma"]
          }
        ]
        `;

      const result = await model.generateContent(prompt);
      const rawText = result.response.text();

      let jsonPart = rawText.match(/```json([\s\S]*?)```/)?.[1] ||
                      rawText.match(/```([\s\S]*?)```/)?.[1] ||
                      rawText.match(/\[.*\]/s)?.[0] || rawText;

      try {
        weeklyPlan[day] = JSON.parse(jsonPart.trim());
      } catch (e) {
        console.error(`❌ Error parsing ${day}'s plan`, e);
        weeklyPlan[day] = [];
      }
    }

    return res.status(200).json({ success: true, weeklyPlan });
  } catch (error) {
    console.error('❌ Error generating weekly diet plan:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;