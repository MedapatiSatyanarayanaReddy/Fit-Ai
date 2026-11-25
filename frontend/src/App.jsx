import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AiChatBubble from './components/AiChatBubble';

import Home from './pages/Home';
import DietPlanner from './pages/DietPlanner';
import ExercisesPage from './pages/ExercisesPage';
import HowItWorks from './pages/HowItWorks';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import PlanHistory from './pages/PlanHistory';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Blog from './pages/Blog';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fitai_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem('fitai_user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('fitai_user');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onSignOut={handleSignOut} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/current-diet-plan" element={<DietPlanner user={user} />} />
          <Route path="/generate-diet-plan" element={<DietPlanner user={user} />} />
          <Route path="/ExercisesPage" element={<ExercisesPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/meal-plans" element={<DietPlanner user={user} />} />
          <Route path="/features/workout-routines" element={<ExercisesPage />} />
          <Route path="/features/ai-chat-assistant" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/plan-history" element={<PlanHistory user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/auth" element={<Auth onSignIn={handleSignIn} />} />
          <Route path="/signup" element={<Auth onSignIn={handleSignIn} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <AiChatBubble />
    </div>
  );
}

export default App;
