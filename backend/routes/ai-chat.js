import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ success: false, message: 'Message is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '' && !apiKey.includes('YOUR_') && apiKey.length > 20) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const systemPrompt = `You are FitAI Coach, a friendly, encouraging, and knowledgeable AI health, nutrition, and fitness assistant.
Keep answers concise, practical, encouraging, and medically responsible.
User asks: "${message}"`;

      const result = await model.generateContent(systemPrompt);
      const reply = result.response.text();
      return res.status(200).json({ success: true, reply, source: 'gemini' });
    } catch (err) {
      console.warn('⚠️ Gemini chat call note:', err.message);
    }
  }

  // Intelligent conversational fallback
  const lower = message.toLowerCase();
  let reply = "Hello! I am your FitAI health and nutrition assistant. How can I help you optimize your diet, workouts, or wellness goals today?";

  if (lower.includes('protein') || lower.includes('muscle')) {
    reply = "To support muscle recovery and growth, aim for 1.6 to 2.2 grams of protein per kilogram of body weight daily. Great sources include eggs, Greek yogurt, chicken breast, tofu, lentils, and whey/plant protein powders!";
  } else if (lower.includes('weight loss') || lower.includes('fat loss') || lower.includes('burn fat')) {
    reply = "For sustainable fat loss, maintain a moderate caloric deficit of 300-500 kcal below your TDEE, prioritize high-protein meals with plenty of fiber to stay satiated, and combine resistance training with daily steps (8k-10k).";
  } else if (lower.includes('water') || lower.includes('hydration')) {
    reply = "Hydration is essential for metabolic rate and digestion! A solid baseline is 30-35 ml of water per kg of body weight (around 2.5 to 3.5 liters per day), increasing if you exercise intensely.";
  } else if (lower.includes('keto') || lower.includes('low carb')) {
    reply = "A ketogenic or low-carb diet shifts your body toward using fat for fuel by limiting carbs to under 50g daily. Focus on healthy fats like avocados, olive oil, nuts, and clean proteins, while monitoring electrolytes!";
  } else if (lower.includes('workout') || lower.includes('exercise') || lower.includes('routine')) {
    reply = "You can view our complete structured workout routines in the Exercises tab! We offer strength training, yoga/flexibility, fat-burning cardio, and muscle hypertrophy splits.";
  } else if (lower.includes('plan') || lower.includes('diet')) {
    reply = "Head over to our 'Generate Diet Plan' page! Enter your age, weight, height, activity level, and goals, and I'll generate a complete 7-day personalized meal plan with ingredients and macros.";
  }

  return res.status(200).json({ success: true, reply, source: 'fitai-coach' });
});

export default router;
