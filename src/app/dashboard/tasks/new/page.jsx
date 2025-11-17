'use client';

import { ArrowLeft, Calendar, Clock, Save, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTaskPage() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    time: '10:00',
    date: new Date().toISOString().split('T')[0],
    priority: 'MEDIUM',
    clientName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    serviceRequired: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }

    if (formData.age && (isNaN(formData.age) || formData.age < 1 || formData.age > 150)) {
      newErrors.age = 'Please enter a valid age';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.serviceRequired.trim()) {
      newErrors.serviceRequired = 'Service required is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newTaskId = Date.now();
      console.log('Task Created:', { ...formData, id: newTaskId, createdAt: new Date().toISOString() });
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/dashboard/tasks');
  };

  const handleBack = () => {
    if (formData.title || formData.clientName || formData.details) {
      const confirmLeave = window.confirm('You have unsaved changes. Do you want to leave?');
      if (!confirmLeave) return;
    }
    router.push('/dashboard/tasks');
  };

  const handleReset = () => {
    const confirmReset = window.confirm('Are you sure you want to clear all fields?');
    if (confirmReset) {
      setFormData({
        title: '',
        time: '10:00',
        date: new Date().toISOString().split('T')[0],
        priority: 'MEDIUM',
        clientName: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        serviceRequired: '',
        details: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-linear-to-r from-purple-900 via-purple-800 to-purple-900 px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleBack}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition backdrop-blur-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-white text-lg sm:text-xl font-bold tracking-wide">NEW TASK</h1>
              <p className="text-purple-200 text-xs sm:text-sm mt-0.5">Create a new task for client management</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition backdrop-blur-sm"
            title="Clear all fields"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Task Details Section */}
          <div className="bg-linear-to-r from-purple-50 to-blue-50 p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Clock size={18} className="text-white" />
              </div>
              Task Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Follow up with client about loan application"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                    <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <div className="relative">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                    <Clock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Priority Level *</label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: 'HIGH', label: 'HIGH', bgColor: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-600', selectedBg: 'bg-red-100' },
                    { value: 'MEDIUM', label: 'MEDIUM', bgColor: 'bg-green-50', borderColor: 'border-green-500', textColor: 'text-green-600', selectedBg: 'bg-green-100' },
                    { value: 'LOW', label: 'LOW', bgColor: 'bg-blue-50', borderColor: 'border-blue-500', textColor: 'text-blue-600', selectedBg: 'bg-blue-100' }
                  ].map(p => (
                    <label 
                      key={p.value} 
                      className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition ${
                        formData.priority === p.value 
                          ? `${p.selectedBg} ${p.borderColor}` 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={p.value}
                        checked={formData.priority === p.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.priority === p.value ? p.borderColor : 'border-gray-300'
                      } flex items-center justify-center`}>
                        {formData.priority === p.value && (
                          <div className={`w-2 h-2 rounded-full ${p.textColor.replace('text-', 'bg-')}`}></div>
                        )}
                      </div>
                      <span className={`text-sm font-semibold ${formData.priority === p.value ? p.textColor : 'text-gray-600'}`}>
                        {p.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Client Information Section */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">👤</span>
              </div>
              Client Information
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                  <input
                    type="text"
                    name="clientName"
                    placeholder="Full Name"
                    value={formData.clientName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.clientName ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                  />
                  {errors.clientName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.clientName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="150"
                    className={`w-full px-4 py-3 border ${errors.age ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.age}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                    className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Required *</label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.serviceRequired ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition`}
                >
                  <option value="">Select Service</option>
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="Business Loan">Business Loan</option>
                  <option value="Car Loan">Car Loan</option>
                  <option value="Education Loan">Education Loan</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Investment">Investment</option>
                  <option value="Other">Other</option>
                </select>
                {errors.serviceRequired && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.serviceRequired}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">📝</span>
              </div>
              Additional Details
            </h2>
            <textarea
              name="details"
              placeholder="Enter any additional information, notes, or special instructions for this task..."
              value={formData.details}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 p-4 sm:p-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 bg-linear-to-r from-purple-900 to-purple-800 text-white py-3 rounded-lg font-semibold hover:from-purple-800 hover:to-purple-700 transition shadow-lg flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Create Task
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scale-in">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Task Created Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your task "<strong>{formData.title}</strong>" has been created and added to your task list.
              </p>
              <button
                onClick={handleSuccessClose}
                className="w-full py-3 px-4 bg-linear-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-white font-semibold rounded-xl transition shadow-lg"
              >
                View Tasks
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}