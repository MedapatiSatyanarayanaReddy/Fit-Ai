# 🚀 FitAI Live Deployment Guide (Step-by-Step)

This guide walks you through deploying **FitAI** to production for free in less than 10 minutes:
- **Backend**: Hosted on [Render.com](https://render.com) (Free Node.js Web Service)
- **Frontend**: Hosted on [Vercel.com](https://vercel.com) (Free Global Edge Hosting)

---

## Part 1: Push Project to GitHub

1. Open your terminal in `FitAI`:
```bash
git init
git add .
git commit -m "Complete FitAI fullstack application"
git branch -M main
```
2. Connect your GitHub repository:
```bash
git remote add origin https://github.com/YOUR_USERNAME/Fit-Ai.git
git push -u origin main --force
```

---

## Part 2: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
2. Connect your GitHub repository `Fit-Ai`.
3. Configure the service settings:
   - **Name**: `fitai-backend`
   - **Region**: Oregon (US West) or Ohio (US East)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
4. Add Environment Variables under **Environment**:
   - `PORT`: `5001`
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: *(Your key from Google AI Studio)*
   - *(Optional AWS keys if using S3/DynamoDB)*:
     - `AWS_REGION`: `us-east-1`
     - `AWS_ACCESS_KEY_ID`: *(Your AWS Key)*
     - `AWS_SECRET_ACCESS_KEY`: *(Your AWS Secret)*
     - `AWS_S3_BUCKET`: `fitai-profile-photos`
     - `DYNAMODB_TABLE_NAME`: `Users`
5. Click **Create Web Service**.
6. Render will build and deploy your backend. Once deployed, copy your backend URL (e.g., `https://fitai-backend-xxxx.onrender.com`).
7. Verify by opening in browser: `https://fitai-backend-xxxx.onrender.com/api/health`.

---

## Part 3: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New...** → **Project**.
2. Import your `Fit-Ai` repository.
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   - `VITE_BACKEND_URL`: Paste your Render backend URL (e.g. `https://fitai-backend-xxxx.onrender.com`)
   - `VITE_API_URL`: Paste the same Render URL
5. Click **Deploy**.
6. Vercel will build and provide your live production URL (e.g., `https://fit-ai.vercel.app`).

---

## Part 4: Testing Your Live Application

1. Open your live Vercel URL.
2. Click **Generate Diet Plan**, fill out the profile form, and click **Generate AI Plan**.
3. View the **Overview** metrics (Calories, Protein, Carbs, Fats, Insights).
4. Browse the **Meal Plan**, **Shopping List**, and **Exercises** tabs.
5. Click the bottom-right purple floating bubble to test the **AI Health Coach** chatbot!
