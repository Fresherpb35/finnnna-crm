'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function SignUpForm() {
   const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    employeeId: '',
    department: '',
    dateOfJoining: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!values.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!values.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!values.age || values.age < 18) newErrors.age = 'Age must be 18 or above';
    if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (values.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (values.password !== values.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!values.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!values.department.trim()) newErrors.department = 'Department is required';
    if (!values.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordConfirmChange = (e) => {
    handleChange(e);
    setShowPasswordCheck(
      e.target.value === values.password && e.target.value !== ''
    );
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        console.log('Form submitted:', values);
        // Redirect to dashboard after successful signup
        window.location.href = '/dashboard';
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-linear-to-br from-indigo-900 via-purple-900 to-indigo-800 relative overflow-hidden">
      {/* Background Image/Pattern (simulating coins) */}
      <div
  className="absolute inset-0 opacity-20 bg-cover bg-center"
  style={{
    backgroundImage: "url('/images/bg-image.jpg')"
  }}
></div>


      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      {/* Form Container */}
      <div className="relative w-full max-w-4xl">
        {/* Logo Circle - Top Right */}
        <div className="flex justify-end mb-4 sm:mb-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gray-200 rounded-full flex items-center justify-center shadow-2xl">
            <div className="text-center">
              <div className="text-gray-800 font-bold text-base sm:text-lg lg:text-xl">App logo</div>
              <div className="text-gray-600 text-xs sm:text-sm lg:text-base mt-1">and</div>
              <div className="text-gray-800 font-bold text-base sm:text-lg lg:text-xl">Tagline</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Sign up Title */}
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">Sign up</h1>

            {/* Form Grid - 2 columns on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* First Name */}
              <div className="w-full">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First name"
                  value={values.firstName}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                />
                {errors.firstName && (
                  <span className="text-red-300 text-xs sm:text-sm mt-1 block">{errors.firstName}</span>
                )}
              </div>
              
              {/* Last Name */}
              <div className="w-full">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last name"
                  value={values.lastName}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                />
                {errors.lastName && (
                  <span className="text-red-300 text-xs sm:text-sm mt-1 block">{errors.lastName}</span>
                )}
              </div>

              {/* Age */}
              <div className="w-full">
                <input
                  type="number"
                  name="age"
                  placeholder="Enter Age"
                  value={values.age}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                />
                {errors.age && (
                  <span className="text-red-300 text-xs sm:text-sm mt-1 block">{errors.age}</span>
                )}
              </div>

              {/* Email */}
              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                />
                {errors.email && (
                  <span className="text-red-300 text-xs sm:text-sm mt-1 block">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="w-full">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={values.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                />
                {errors.password && (
                  <span className="text-red-300 text-xs sm:text-sm mt-1 block">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative w-full">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handlePasswordConfirmChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full px-4 py-3 sm:py-3.5 pr-12 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                />
                {showPasswordCheck && !errors.confirmPassword && (
                  <div className="absolute right-3 top-3 sm:top-3.5 w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center animate-fadeIn">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                )}
                {errors.confirmPassword && (
                  <span className="text-red-300 text-xs sm:text-sm mt-1 block">{errors.confirmPassword}</span>
                )}
              </div>

              {/* Employee ID */}
              <div className="w-full">
                <input
                  type="text"
                  name="employeeId"
                  placeholder="Enter Employee Id"
                  value={values.employeeId}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                />
                {errors.employeeId && (
                  <span className="text-red-300 text-xs sm:text-sm mt-1 block">{errors.employeeId}</span>
                )}
              </div>

              {/* Department */}
              <div className="w-full">
                <input
                  type="text"
                  name="department"
                  placeholder="Enter Department"
                  value={values.department}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                />
                {errors.department && (
                  <span className="text-red-300 text-xs sm:text-sm mt-1 block">{errors.department}</span>
                )}
              </div>

              {/* Date of Joining - Full width on both layouts */}
              <div className="w-full sm:col-span-1">
                <input
                  type="text"
                  name="dateOfJoining"
                  placeholder="Enter date of joining"
                  value={values.dateOfJoining}
                  onChange={handleChange}
                  onFocus={(e) => e.target.type = 'date'}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = 'text';
                  }}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                />
                {errors.dateOfJoining && (
                  <span className="text-red-300 text-xs sm:text-sm mt-1 block">{errors.dateOfJoining}</span>
                )}
              </div>
            </div>

          {/* Submit Button */}
        <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full sm:w-80 py-3.5 sm:py-4 mt-4 sm:mt-6 bg-purple-400 hover:bg-purple-500 text-indigo-900 font-bold text-base sm:text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          'SIGN UP'
        )}
      </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}