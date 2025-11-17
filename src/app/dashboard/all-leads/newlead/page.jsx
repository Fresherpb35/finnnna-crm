"use client"
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";


export default function NewLeadForm() {
  const router = useRouter();
  const [priority, setPriority] = useState('');
  const [formData, setFormData] = useState({
    clientName: '',
    serviceRequired: '',
    source: '',
    age: '',
    gender: '',
    stage: '',
    score: '',
    email: '',
    phoneNumber: '',
    details: ''
  });

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.clientName || !formData.serviceRequired || !formData.source) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Submit form and redirect to documents page
    console.log('Form submitted:', { ...formData, priority });
    window.location.href = '/documents';
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-4 flex items-center justify-center sticky top-0 z-10 shadow-lg relative">
        <button
          onClick={handleBack}
          className="absolute left-4 p-2 hover:bg-white/10 rounded-lg transition active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg sm:text-xl font-semibold tracking-wide">NEW LEAD</h1>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4">
        {/* Client Name and Timestamp */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Client's Name"
            className="flex-1 w-full p-3 sm:p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <div className="text-right text-gray-600 whitespace-nowrap">
            <div className="font-semibold text-sm sm:text-base">2:00 PM</div>
            <div className="text-xs sm:text-sm">Friday</div>
          </div>
        </div>

        {/* Service Required and Source */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="serviceRequired"
            value={formData.serviceRequired}
            onChange={handleChange}
            placeholder="Service Required"
            className="p-3 sm:p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Source"
            className="p-3 sm:p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Age, Gender, Stage, Score */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="p-3 sm:p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="p-3 sm:p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <input
            type="text"
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            placeholder="Stage"
            className="p-3 sm:p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <input
            type="text"
            name="score"
            value={formData.score}
            onChange={handleChange}
            placeholder="Score"
            className="p-3 sm:p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Priority Selection */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button
            onClick={() => setPriority('HIGH')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg border-2 transition-all duration-200 ${
              priority === 'HIGH'
                ? 'bg-red-50 border-red-500 shadow-md'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              priority === 'HIGH' ? 'border-red-500' : 'border-gray-300'
            }`}>
              {priority === 'HIGH' && <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>}
            </div>
            <span className={`text-sm sm:text-base font-medium ${
              priority === 'HIGH' ? 'text-red-600' : 'text-gray-600'
            }`}>
              HIGH
            </span>
          </button>

          <button
            onClick={() => setPriority('MEDIUM')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg border-2 transition-all duration-200 ${
              priority === 'MEDIUM'
                ? 'bg-green-50 border-green-500 shadow-md'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              priority === 'MEDIUM' ? 'border-green-500' : 'border-gray-300'
            }`}>
              {priority === 'MEDIUM' && <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>}
            </div>
            <span className={`text-sm sm:text-base font-medium ${
              priority === 'MEDIUM' ? 'text-green-600' : 'text-gray-600'
            }`}>
              MEDIUM
            </span>
          </button>

          <button
            onClick={() => setPriority('LOW')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg border-2 transition-all duration-200 ${
              priority === 'LOW'
                ? 'bg-blue-50 border-blue-500 shadow-md'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              priority === 'LOW' ? 'border-blue-500' : 'border-gray-300'
            }`}>
              {priority === 'LOW' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
            </div>
            <span className={`text-sm sm:text-base font-medium ${
              priority === 'LOW' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              LOW
            </span>
          </button>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 sm:p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="p-3 sm:p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Details Textarea */}
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Details..."
          rows="8"
          className="w-full p-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-sm"
        />

        {/* Review Application Button */}
        <div className="flex justify-end pt-4 pb-6">
          <button
            onClick={() => router.push("/dashboard/edit-leads/documents")}
            className="bg-purple-900 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg"
          >
            Review <br /> Applications
          </button>
        </div>
      </div>
    </div>
  );
}