# 🧠 FitAI – AI Powered Fitness & Diet Recommendation System

A modern full-stack web application delivering personalized clinical nutrition, adaptive workout routines, and 24/7 intelligent health coaching using Google Gemini AI.

---

## 🌟 Key Features

1. **AI-Powered Nutrition Planner (`/current-diet-plan`)**:
   - Computes Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using Mifflin-St Jeor formulas.
   - Generates complete 7-day personalized meal plans with exact macros (Calories, Protein, Carbs, Fats), ingredients, preparation instructions, and YouTube recipe links.
   - Dynamic **Grocery Shopping List** categorized into Produce, Proteins, Carbs, Healthy Fats, and Pantry.
   - Clinical nutrition tips and metabolic adaptation guidance.

2. **Adaptive Workout Laboratory (`/ExercisesPage`)**:
   - Structured training programs across **Strength Training**, **Flexibility & Yoga**, **Cardio & Fat Incineration**, and **Hypertrophy Muscle Mass**.
   - Detailed sets, reps, timers, and intensity metrics.

3. **24/7 Floating AI Chat Coach**:
   - Interactive floating assistant powered by Google Gemini AI to answer questions about macros, food swaps, and exercise form.

4. **Biometric Profile & Cloud Photo Storage (`/profile`)**:
   - Profile management with photo uploads supporting AWS S3 & DynamoDB or local file storage.

5. **Saved Plan History (`/plan-history`)**:
   - Retrieve and review past generated fitness and diet plans.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router DOM, Lucide Icons, Axios
- **Backend**: Node.js, Express.js (ES Modules)
- **AI Engine**: Google Gemini API (`@google/generative-ai`)
- **Cloud & Database (Optional)**: AWS S3, AWS DynamoDB

---

## 🚀 Quick Start (Running Locally)

### Option A: One-Click Launcher (Windows)
Double-click `run-fitai.bat` or run in PowerShell:
```powershell
.\run-fitai.ps1
```

### Option B: Manual Command Line

#### 1. Start the Backend:
```bash
cd backend
npm start
```
*Backend runs on: `http://localhost:5001` (Health check: `http://localhost:5001/api/health`)*

#### 2. Start the Frontend:
```bash
cd frontend
npm run dev
```
*Frontend runs on: `http://localhost:3000`*

---

## 🔑 Adding Your Google Gemini API Key

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Open `backend/.env` and paste your key:
   ```env
   GEMINI_API_KEY=AIzaSy...your_actual_key_here
   ```
3. Restart the backend server.
*(Note: If no API key is provided, FitAI automatically uses its precision clinical nutrition fallback engine so you never encounter 500 errors!)*

---

## 🌐 Deploying Live to the Web

Follow the complete step-by-step instructions in [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) to deploy:
- **Backend API**: Render.com (Free Web Service)
- **Frontend App**: Vercel (Free Hosting)
