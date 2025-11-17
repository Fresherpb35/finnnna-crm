'use client';
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit2, Upload, Download, Eye, Trash2, Save, X, Check, FileText } from 'lucide-react';
import { useState } from 'react';

export default function LeadManagementApp() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState('hot');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "Amit Patel",
    loanType: "Personal Loan",
    source: "Facebook",
    age: "45",
    gender: "Male",
    stage: "Initial Contact",
    score: "72",
    email: "amitpatel@gmail.com",
    phone: "8450 XXXXXX",
    timestamp: "2:00 PM Friday",
    notes: `The Client enquired about the details of personal loan.
Contact via: Facebook DMs
Conversation duration: 23 mins
Service needed: Loan
Amount needed: 7.5 Lakhs
Address: 103, Shakti Nagar, Meerut
Bank: PnB
Nearest Bank available: 4 km`
  });

  const [originalFormData, setOriginalFormData] = useState({ ...formData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setOriginalFormData({ ...formData });
    setIsEditing(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => {
    setFormData({ ...originalFormData });
    setIsEditing(false);
  };

  const handleBack = () => {
    if (isEditing) {
      const confirmLeave = window.confirm('You have unsaved changes. Do you want to leave?');
      if (confirmLeave) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <Check size={20} />
          <span className="font-medium">Lead updated successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-linear-to-r from-purple-900 via-purple-800 to-purple-900 text-white sticky top-0 z-40 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleBack}
                className="hover:bg-purple-800 p-2 rounded-lg transition"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold">Lead No. X</h1>
                <p className="text-xs sm:text-sm text-purple-200 mt-0.5">Lead Management</p>
              </div>
            </div>
            
            {!isEditing ? (
              <button 
                onClick={handleEdit}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition backdrop-blur-sm"
              >
                <Edit2 size={18} />
                <span className="hidden sm:inline">Edit</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 px-3 sm:px-4 py-2 rounded-lg transition backdrop-blur-sm"
                >
                  <X size={18} />
                  <span className="hidden sm:inline">Cancel</span>
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 px-3 sm:px-4 py-2 rounded-lg transition backdrop-blur-sm"
                >
                  <Save size={18} />
                  <span className="hidden sm:inline">Save</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6">
        {/* Name and Timestamp Card */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-500 mb-2 block">Lead Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full text-lg sm:text-xl font-semibold text-gray-900 border-none outline-none bg-transparent ${
                  isEditing ? 'border-b-2 border-purple-500 pb-1' : ''
                }`}
              />
            </div>
            <div className="bg-purple-50 px-4 py-2 rounded-lg">
              <div className="text-xs text-purple-600 font-medium">Received</div>
              <div className="text-sm font-semibold text-purple-900">{formData.timestamp}</div>
            </div>
          </div>
        </div>

        {/* Loan Type and Source */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition">
            <label className="text-xs font-medium text-gray-500 mb-2 block">Loan Type</label>
            <input 
              type="text" 
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full text-base sm:text-lg font-medium text-gray-900 border-none outline-none bg-transparent ${
                isEditing ? 'border-b-2 border-purple-500 pb-1' : ''
              }`}
            />
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition">
            <label className="text-xs font-medium text-gray-500 mb-2 block">Source</label>
            <input 
              type="text" 
              name="source"
              value={formData.source}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full text-base sm:text-lg font-medium text-gray-900 border-none outline-none bg-transparent ${
                isEditing ? 'border-b-2 border-purple-500 pb-1' : ''
              }`}
            />
          </div>
        </div>

        {/* Age, Gender, Stage, Score */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition">
            <label className="text-xs font-medium text-gray-500 mb-2 block">Age</label>
            <input 
              type="text" 
              name="age"
              value={formData.age}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full text-base sm:text-lg font-semibold text-gray-900 border-none outline-none bg-transparent ${
                isEditing ? 'border-b-2 border-purple-500 pb-1' : ''
              }`}
            />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition">
            <label className="text-xs font-medium text-gray-500 mb-2 block">Gender</label>
            <input 
              type="text" 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full text-base sm:text-lg font-semibold text-gray-900 border-none outline-none bg-transparent ${
                isEditing ? 'border-b-2 border-purple-500 pb-1' : ''
              }`}
            />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition">
            <label className="text-xs font-medium text-gray-500 mb-2 block">Stage</label>
            <input 
              type="text" 
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full text-sm sm:text-base font-semibold text-gray-900 border-none outline-none bg-transparent ${
                isEditing ? 'border-b-2 border-purple-500 pb-1' : ''
              }`}
            />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition">
            <label className="text-xs font-medium text-gray-500 mb-2 block">Score</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                name="score"
                value={formData.score}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full text-base sm:text-lg font-semibold text-gray-900 border-none outline-none bg-transparent ${
                  isEditing ? 'border-b-2 border-purple-500 pb-1' : ''
                }`}
              />
              <span className="text-purple-600 font-bold">/100</span>
            </div>
          </div>
        </div>

        {/* Priority Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
          <label className="text-xs font-medium text-gray-500 mb-3 block">Priority Level</label>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => isEditing && setPriority('hot')}
              disabled={!isEditing}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 transition ${
                priority === 'hot' 
                  ? 'bg-red-50 border-red-500 shadow-md' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              } ${!isEditing ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${
                priority === 'hot' ? 'border-red-500' : 'border-gray-300'
              }`}>
                {priority === 'hot' && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500"></div>}
              </div>
              <span className={`text-sm sm:text-base font-semibold ${priority === 'hot' ? 'text-red-600' : 'text-gray-600'}`}>
                HOT
              </span>
            </button>

            <button 
              onClick={() => isEditing && setPriority('medium')}
              disabled={!isEditing}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 transition ${
                priority === 'medium' 
                  ? 'bg-green-50 border-green-500 shadow-md' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              } ${!isEditing ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${
                priority === 'medium' ? 'border-green-500' : 'border-gray-300'
              }`}>
                {priority === 'medium' && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500"></div>}
              </div>
              <span className={`text-sm sm:text-base font-semibold ${priority === 'medium' ? 'text-green-600' : 'text-gray-600'}`}>
                MEDIUM
              </span>
            </button>

            <button 
              onClick={() => isEditing && setPriority('low')}
              disabled={!isEditing}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 transition ${
                priority === 'low' 
                  ? 'bg-blue-50 border-blue-500 shadow-md' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              } ${!isEditing ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${
                priority === 'low' ? 'border-blue-500' : 'border-gray-300'
              }`}>
                {priority === 'low' && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500"></div>}
              </div>
              <span className={`text-sm sm:text-base font-semibold ${priority === 'low' ? 'text-blue-600' : 'text-gray-600'}`}>
                LOW
              </span>
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition">
            <label className="text-xs font-medium text-gray-500 mb-2 block">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full text-sm sm:text-base text-gray-900 border-none outline-none bg-transparent ${
                isEditing ? 'border-b-2 border-purple-500 pb-1' : ''
              }`}
            />
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition">
            <label className="text-xs font-medium text-gray-500 mb-2 block">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full text-sm sm:text-base text-gray-900 border-none outline-none bg-transparent ${
                isEditing ? 'border-b-2 border-purple-500 pb-1' : ''
              }`}
            />
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition">
          <label className="text-xs font-medium text-gray-500 mb-3 block">Lead Notes & Details</label>
          <textarea 
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            disabled={!isEditing}
            rows={12}
            className={`w-full text-sm sm:text-base text-gray-900 border-none outline-none bg-transparent resize-none whitespace-pre-wrap leading-relaxed ${
              isEditing ? 'border-2 border-purple-500 rounded-lg p-3' : ''
            }`}
          />
        </div>

        {/* Footer Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
          <div className="text-yellow-600 mt-0.5">⚠️</div>
          <p className="text-xs sm:text-sm text-yellow-800">
            <strong>Note:</strong> A lead without update for more than 10 days will automatically be marked as cold lead.
          </p>
        </div>

        {/* Documents Button */}
        <div className="flex justify-center sm:justify-end pt-4">
          <button
            onClick={() => router.push("/dashboard/edit-leads/documents")}
            className="w-full sm:w-auto bg-linear-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FileText size={20} />
            <span>View/Edit Documents</span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}