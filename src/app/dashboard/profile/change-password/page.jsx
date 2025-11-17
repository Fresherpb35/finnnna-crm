"use client"
import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [errors, setErrors] = useState({});

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!passwords.current) {
      newErrors.current = 'Current password is required';
    }

    if (!passwords.new) {
      newErrors.new = 'New password is required';
    } else if (passwords.new.length < 6) {
      newErrors.new = 'Password must be at least 6 characters';
    }

    if (!passwords.confirm) {
      newErrors.confirm = 'Please confirm your password';
    } else if (passwords.new !== passwords.confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    if (passwords.current && passwords.new && passwords.current === passwords.new) {
      newErrors.new = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Password change submitted:', {
        current: passwords.current,
        new: passwords.new
      });
      alert('Password changed successfully!');
      router.back();
    }
  };

  const handleForgotPassword = () => {
    router.push('/dashboard/profile/forgot');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Header with curved design */}
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
          <div className="absolute -bottom-1 left-0 right-0 h-24 sm:h-32 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-t-[60px]"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-16 sm:-mt-24 px-4 sm:px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Password Change Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border-4 border-blue-500">
            <div className="space-y-5 sm:space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    name="current"
                    value={passwords.current}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                    className={`w-full px-4 py-3 pr-12 border ${
                      errors.current ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.current && (
                  <p className="mt-1 text-sm text-red-600">{errors.current}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end -mt-2">
                <button
                  onClick={handleForgotPassword}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? 'text' : 'password'}
                    name="new"
                    value={passwords.new}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-3 pr-12 border ${
                      errors.new ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.new && (
                  <p className="mt-1 text-sm text-red-600">{errors.new}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? 'text' : 'password'}
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handleInputChange}
                    placeholder="Re-enter new password"
                    className={`w-full px-4 py-3 pr-12 border ${
                      errors.confirm ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirm && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs text-gray-700 font-medium mb-2">Password Requirements:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className={passwords.new.length >= 6 ? 'text-green-600' : 'text-gray-400'}>
                      {passwords.new.length >= 6 ? '✓' : '○'}
                    </span>
                    At least 6 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={passwords.new && passwords.new !== passwords.current ? 'text-green-600' : 'text-gray-400'}>
                      {passwords.new && passwords.new !== passwords.current ? '✓' : '○'}
                    </span>
                    Different from current password
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={passwords.new && passwords.confirm && passwords.new === passwords.confirm ? 'text-green-600' : 'text-gray-400'}>
                      {passwords.new && passwords.confirm && passwords.new === passwords.confirm ? '✓' : '○'}
                    </span>
                    Passwords match
                  </li>
                </ul>
              </div>

              {/* Done Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-linear-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 text-white py-3 sm:py-4 rounded-xl font-semibold transition shadow-lg text-base sm:text-lg"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}