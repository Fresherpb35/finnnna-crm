"use client"

import React, { useState, useEffect } from 'react';
import { FileText, Video, Menu } from 'lucide-react';

export default function HRManagementPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', active: false },
    { label: 'Leads & Pipelines', href: '/dashboard/lead-pipelines', active: false },
    { label: 'Tasks', href: '/dashboard/tasks', active: false },
    { label: 'Clients', href: '/dashboard/clients', active: false },
    { label: 'Accounting Reports', href: '/dashboard/accounting-reports', active: false },
    { label: 'HR Analytics', href: '/dashboard/hr-analysis', active: true }
  ];

  // Timer countdown
  useEffect(() => {
    if (otpModalOpen && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpModalOpen, timer]);

  const handleResendOtp = () => {
    setTimer(60);
    setCanResend(false);
    console.log('OTP Resent');
  };

  const handleVerifyOtp = () => {
    console.log('OTP Verified:', otp);
    console.log('Downloading document:', selectedDocument);
    alert(`Document "${selectedDocument}" is now downloading!`);
    setOtpModalOpen(false);
    setSelectedDocument(null);
    setOtp('');
    setTimer(60);
    setCanResend(false);
  };

  const handleDocumentClick = (docTitle) => {
    setSelectedDocument(docTitle);
    setOtpModalOpen(true);
    setTimer(60);
    setCanResend(false);
  };

  const handleEmployeeClick = (employee) => {
    // Create URL-friendly ID from employee name
    const employeeId = employee.name.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `/dashboard/hr-analysis/${employeeId}`;
  };

  const handleNavigation = (href) => {
    window.location.href = href;
  };

  const statsCards = [
    { label: 'Employees', value: '25', icon: '👥', color: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Avg Attendance', value: '85%', icon: '✅', color: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Avg Performance', value: '89%', icon: '📊', color: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Training Completed', value: '8', icon: '🎓', color: 'bg-orange-50', textColor: 'text-orange-600' }
  ];

  const employees = [
    { name: 'Rahul Mishra', role: 'Training Officer', attendance: '97%', performance: '87%', initials: 'RM', color: 'bg-indigo-500', status: 'Active' },
    { name: 'Ramesh Sharma', role: 'Sales Executive', attendance: '96%', performance: '88%', initials: 'RS', color: 'bg-purple-500', status: 'Active' },
    { name: 'Priya Mehta', role: 'Operation Lead', attendance: '89%', performance: '85%', initials: 'PM', color: 'bg-blue-500', status: 'Active' },
    { name: 'Amit Kumar', role: 'Marketing Exec', attendance: '95%', performance: '95%', initials: 'AK', color: 'bg-pink-500', status: 'Active' },
    { name: 'Nikhil Goyal', role: 'Consultant', attendance: '94%', performance: '92%', initials: 'NG', color: 'bg-cyan-500', status: 'Active' }
  ];

  const documents = [
    { title: 'Employees Resume', subtitle: 'All Documents', icon: FileText },
    { title: 'Offer Letters', subtitle: 'HR Documents', icon: FileText },
    { title: 'Company Policies', subtitle: 'HR Documents', icon: FileText }
  ];

  const trainingResources = [
    { title: 'SOP Training Module', subtitle: 'AI generated MCQ tests', type: 'Watch Test →', color: 'bg-blue-50', textColor: 'text-blue-600' },
    { title: 'Video Tutorials', subtitle: 'Training series', type: 'Watch Videos →', color: 'bg-green-50', textColor: 'text-green-600' },
    { title: 'Document Library', subtitle: 'Reference materials', type: 'Download PDFs →', color: 'bg-purple-50', textColor: 'text-purple-600' }
  ];

  const departmentPerformance = [
    { name: 'Sales', team: '8 people', percentage: 92, color: 'bg-blue-500' },
    { name: 'Operation', team: '12 people', percentage: 98, color: 'bg-cyan-500' },
    { name: 'Marketing', team: '5 people', percentage: 86, color: 'bg-purple-500' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-purple-950 to-purple-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="p-4 sm:p-6 border-b border-purple-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
                U
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Welcome, User!</p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <nav className="flex-1 py-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`block w-full px-6 py-3 text-sm transition-all ${
                  item.active
                    ? 'bg-purple-700 text-white font-medium border-l-4 border-cyan-400'
                    : 'text-gray-300 hover:bg-purple-700/50 hover:text-white border-l-4 border-transparent hover:border-cyan-400'
                }`}
              >
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Settings at Bottom */}
          <div className="border-t border-purple-700">
            <button className="w-full flex items-center justify-center px-6 py-4 text-white hover:bg-purple-800 transition">
              <span className="text-2xl">⚙️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setMenuOpen(true)} className="lg:hidden text-gray-700">
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold text-gray-800">HR Management</h1>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition whitespace-nowrap">
              Add employee
            </button>
          </div>
        </header>

        <main className="p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsCards.map((stat, index) => (
                <div key={index} className={`${stat.color} rounded-xl p-4 shadow-sm border border-gray-100`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-bold mb-1 ${stat.textColor}`}>{stat.value}</h2>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Documents & Training */}
              <div className="space-y-6">
                {/* HR Document Locker */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={18} className="text-gray-700" />
                    <h3 className="font-bold text-gray-900 text-base">HR document Locker</h3>
                  </div>
                  <div className="space-y-3">
                    {documents.map((doc, index) => (
                      <button
                        key={index}
                        onClick={() => handleDocumentClick(doc.title)}
                        className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                          <doc.icon size={18} className="text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-semibold text-gray-900 text-sm truncate">{doc.title}</p>
                          <p className="text-xs text-gray-500 truncate">{doc.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-center text-gray-500">
                      Protected by OTP
                    </p>
                  </div>
                </div>

                {/* Training Resources */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Video size={18} className="text-gray-700" />
                    <h3 className="font-bold text-gray-900 text-base">Training Resources</h3>
                  </div>
                  <div className="space-y-3">
                    {trainingResources.map((resource, index) => (
                      <button key={index} className={`w-full ${resource.color} border border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition text-left`}>
                        <p className="font-semibold text-gray-900 text-sm mb-1">{resource.title}</p>
                        <p className="text-xs text-gray-600 mb-2">{resource.subtitle}</p>
                        <p className={`text-xs font-medium ${resource.textColor}`}>{resource.type}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Employees & Performance */}
              <div className="lg:col-span-2 space-y-6">
                {/* Employee Overview */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-base md:text-lg">Employee Overview</h3>
                    <a
                      href="/dashboard/employees"
                      className="text-xs sm:text-sm text-purple-600 font-medium hover:text-purple-700 cursor-pointer"
                    >
                      VIEW ALL
                    </a>
                  </div>
                  <div className="space-y-3">
                    {employees.map((employee, index) => (
                      <button
                        key={index}
                        onClick={() => handleEmployeeClick(employee)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 ${employee.color} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md`}>
                            {employee.initials}
                          </div>
                          <div className="min-w-0 flex-1 text-left">
                            <p className="font-semibold text-gray-900 text-sm truncate">{employee.name}</p>
                            <p className="text-xs text-gray-500">{employee.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-2">
                          <div className="text-center hidden sm:block">
                            <p className="text-xs font-bold text-gray-900">{employee.attendance}</p>
                            <p className="text-xs text-gray-500">Attendance</p>
                          </div>
                          <div className="text-center hidden sm:block">
                            <p className="text-xs font-bold text-gray-900">{employee.performance}</p>
                            <p className="text-xs text-gray-500">Performance</p>
                          </div>
                          <span className="inline-block px-2 py-1 rounded-md text-xs font-medium text-green-600 bg-green-50">
                            {employee.status}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Department Performance */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 text-base md:text-lg">Department Performance</h3>
                  <div className="space-y-4">
                    {departmentPerformance.map((dept, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{dept.name}</p>
                            <p className="text-xs text-gray-500">{dept.team}</p>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{dept.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div className={`${dept.color} h-full rounded-full transition-all duration-500`} style={{width: `${dept.percentage}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* OTP Modal */}
      {otpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl sm:text-4xl">🔒</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Verify OTP</h3>
              <p className="text-sm text-gray-600">
                Enter OTP to download:
              </p>
              <p className="text-sm font-semibold text-purple-700 mt-1 truncate px-2">
                "{selectedDocument}"
              </p>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="w-full px-4 py-3 sm:py-4 text-center text-2xl sm:text-3xl font-bold border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none tracking-widest"
              />
            </div>

            <div className="mb-6 text-center">
              {canResend ? (
                <button 
                  onClick={handleResendOtp}
                  className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Resend the OTP
                </button>
              ) : (
                <p className="text-sm text-gray-600">
                  Resend the OTP in{' '}
                  <span className="font-semibold text-purple-600">
                    {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
                  </span>
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setOtpModalOpen(false);
                  setSelectedDocument(null);
                  setOtp('');
                  setTimer(60);
                  setCanResend(false);
                }}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6}
                className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}