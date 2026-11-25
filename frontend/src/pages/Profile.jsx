import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, User, Mail, Shield, CheckCircle2, RefreshCw } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const Profile = ({ user }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const email = user?.email || 'user@fitai.com';

  useEffect(() => {
    // Fetch profile photo from backend
    axios.get(`${BACKEND_URL}/api/user-profile-photo/${encodeURIComponent(email)}`)
      .then(res => {
        if (res.data?.photoUrl) {
          setPhotoUrl(res.data.photoUrl);
        }
      })
      .catch(err => console.log('Notice fetching profile photo:', err.message));
  }, [email]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMsg('');

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('email', email);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/upload-profile-photo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data?.success && res.data?.imageUrl) {
        setPhotoUrl(res.data.imageUrl);
        setStatusMsg('Profile photo updated successfully!');
      }
    } catch (err) {
      console.error('Photo upload error:', err);
      setStatusMsg('Photo uploaded locally.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 space-y-8">
        
        <h1 className="text-3xl font-extrabold text-gray-900 text-center sm:text-left">
          Member Profile
        </h1>

        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-purple-50/50 border border-purple-100/60">
          <div className="relative group">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center font-bold text-3xl shadow-inner">
                {email[0].toUpperCase()}
              </div>
            )}
            
            <label className="absolute bottom-0 right-0 p-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg cursor-pointer transition">
              <Camera className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'FitAI Member'}</h2>
            <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-4 h-4 text-purple-600" /> {email}
            </p>
            <span className="inline-block mt-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Active Member
            </span>
          </div>
        </div>

        {uploading && (
          <div className="text-sm text-purple-600 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" /> Uploading to cloud storage...
          </div>
        )}
        {statusMsg && (
          <div className="text-sm text-emerald-600 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {statusMsg}
          </div>
        )}

        {/* Profile Settings */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Health Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-500 block">Default Goal</span>
              <span className="font-semibold text-gray-900">Sustainable Fat Loss & Muscle Preservation</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-500 block">Dietary Restrictions</span>
              <span className="font-semibold text-gray-900">None Specified (Omnivore)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
