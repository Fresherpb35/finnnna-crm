"use client"

import React, { useState } from 'react';
import { ArrowLeft, Edit2, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  
  const [profileData, setProfileData] = useState({
    name: 'Rahul Mishra',
    employeeId: 'E18 I101',
    department: 'Training',
    role: 'Training Officer',
    dateOfJoining: '12.10.2025',
    age: '45',
    gender: 'M',
    attendance: '97%',
    performance: '87%',
    rating: '4.3',
    avatar: 'RM'
  });

  const handleBack = () => {
    window.history.back();
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      window.location.href = '/login';
    }
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      alert('Profile updated successfully!');
    }
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = () => {
    window.location.href = '/dashboard/profile/change-password';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-900 via-purple-900 to-purple-800 text-white shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent"></div>
        <div className="relative px-4 sm:px-6 py-6 sm:py-8">
          <button
            onClick={handleBack}
            className="mb-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
          </button>
          
          {/* Curved white section at bottom */}
          <div className="absolute -bottom-1 left-0 right-0 h-16 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-t-[50px]"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center border border-gray-100">
                {/* Profile Image */}
                <div className="relative inline-block mb-4">
                  <input
                    type="file"
                    id="profileImageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="profileImageUpload"
                    className="cursor-pointer block"
                  >
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-lg border-4 border-white overflow-hidden relative group">
                      {profileImage ? (
                        <>
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Edit2 size={24} className="text-white" />
                          </div>
                        </>
                      ) : (
                        <>
                          {profileData.avatar}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Edit2 size={24} className="text-white" />
                          </div>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">{profileData.rating}</span>
                </div>

                {/* Edit Profile Button */}
                <button
                  onClick={handleEditProfile}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition shadow-md ${
                    isEditing
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                  }`}
                >
                  <Edit2 size={18} />
                  {isEditing ? 'Save Profile' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Right Column - Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                <div className="space-y-4 sm:space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-700 text-sm sm:text-base"
                    />
                  </div>

                  {/* Employee ID */}
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-2">Employee ID</label>
                    <input
                      type="text"
                      name="employeeId"
                      value={profileData.employeeId}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 text-sm sm:text-base"
                    />
                  </div>

                  {/* Change Password Link */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleChangePassword}
                      className="text-sm sm:text-base text-purple-600 hover:text-purple-700 font-semibold transition underline"
                    >
                      Change Password
                    </button>
                  </div>

                  {/* Department and Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={profileData.department}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-700 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Role</label>
                      <input
                        type="text"
                        name="role"
                        value={profileData.role}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-700 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Date, Age, Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Date of Joining</label>
                      <input
                        type="text"
                        name="dateOfJoining"
                        value={profileData.dateOfJoining}
                        disabled
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Age</label>
                      <input
                        type="text"
                        name="age"
                        value={profileData.age}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-700 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Gender</label>
                      <input
                        type="text"
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-700 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Attendance and Performance */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Attendance</label>
                      <input
                        type="text"
                        name="attendance"
                        value={profileData.attendance}
                        disabled
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Performance</label>
                      <input
                        type="text"
                        name="performance"
                        value={profileData.performance}
                        disabled
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Logout Button */}
                  <div className="pt-4">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-linear-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 text-white py-3 sm:py-4 rounded-xl font-semibold transition shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>LOG OUT</span>
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}