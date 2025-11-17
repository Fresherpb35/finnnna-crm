"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Download, Mail, Edit2 } from 'lucide-react';

export default function EmployeeInsightsPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // All employees database
  const employeesDatabase = {
    'rahul-mishra': {
      name: 'Rahul Mishra',
      employeeId: 'T101PD',
      role: 'Training Officer',
      department: 'Training',
      phone: '8964 XXXXXX',
      email: 'mishrarahul@work.com',
      workMode: 'Remote',
      dateOfJoining: '24 April 2025',
      salary: '35k',
      attendance: '97%',
      performance: '8.7/10',
      ratings: '⭐ 4.3',
      targetAchieved: '86%',
      initials: 'RM',
      color: 'bg-indigo-500',
      remarks: [
        'Has worked with over 85 clients.',
        'Has trained 13 new candidates.',
        'Performance has increased by 79% since the joining.',
        'Achieved 95% target last month.'
      ]
    },
    'ramesh-sharma': {
      name: 'Ramesh Sharma',
      employeeId: 'S102PD',
      role: 'Sales Executive',
      department: 'Sales',
      phone: '9876 XXXXXX',
      email: 'rameshsharma@work.com',
      workMode: 'Hybrid',
      dateOfJoining: '15 March 2024',
      salary: '42k',
      attendance: '96%',
      performance: '8.8/10',
      ratings: '⭐ 4.5',
      targetAchieved: '92%',
      initials: 'RS',
      color: 'bg-purple-500',
      remarks: [
        'Exceeded sales targets for 6 consecutive months.',
        'Closed deals worth ₹25 lakhs this quarter.',
        'Excellent client relationship management.',
        'Mentored 5 junior sales representatives.'
      ]
    },
    'priya-mehta': {
      name: 'Priya Mehta',
      employeeId: 'O103PD',
      role: 'Operation Lead',
      department: 'Operations',
      phone: '9123 XXXXXX',
      email: 'priyamehta@work.com',
      workMode: 'On-site',
      dateOfJoining: '10 January 2023',
      salary: '48k',
      attendance: '89%',
      performance: '8.5/10',
      ratings: '⭐ 4.2',
      targetAchieved: '88%',
      initials: 'PM',
      color: 'bg-blue-500',
      remarks: [
        'Streamlined operations workflow by 40%.',
        'Led team of 12 operations staff successfully.',
        'Implemented new project management system.',
        'Reduced operational costs by 15%.'
      ]
    },
    'amit-kumar': {
      name: 'Amit Kumar',
      employeeId: 'M104PD',
      role: 'Marketing Exec',
      department: 'Marketing',
      phone: '9988 XXXXXX',
      email: 'amitkumar@work.com',
      workMode: 'Remote',
      dateOfJoining: '5 June 2024',
      salary: '38k',
      attendance: '95%',
      performance: '9.5/10',
      ratings: '⭐ 4.7',
      targetAchieved: '95%',
      initials: 'AK',
      color: 'bg-pink-500',
      remarks: [
        'Launched 3 successful marketing campaigns.',
        'Increased social media engagement by 120%.',
        'Generated 500+ qualified leads.',
        'Won "Best Campaign" award this year.'
      ]
    },
    'nikhil-goyal': {
      name: 'Nikhil Goyal',
      employeeId: 'C105PD',
      role: 'Consultant',
      department: 'Consulting',
      phone: '9456 XXXXXX',
      email: 'nikhilgoyal@work.com',
      workMode: 'Hybrid',
      dateOfJoining: '20 August 2023',
      salary: '55k',
      attendance: '94%',
      performance: '9.2/10',
      ratings: '⭐ 4.6',
      targetAchieved: '94%',
      initials: 'NG',
      color: 'bg-cyan-500',
      remarks: [
        'Consulted for 15+ high-value clients.',
        'Expert in business strategy and planning.',
        'Published 3 industry research papers.',
        'Consistently delivers exceptional results.'
      ]
    }
  };

  useEffect(() => {
    // Get employee ID from URL path
    const pathParts = window.location.pathname.split('/');
    const employeeId = pathParts[pathParts.length - 1];
    
    if (employeeId && employeesDatabase[employeeId]) {
      setEmployeeData(employeesDatabase[employeeId]);
    } else {
      // Default to first employee if not found
      setEmployeeData(employeesDatabase['rahul-mishra']);
    }
    
    setLoading(false);
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const renderCalendar = () => {
    const days = [];
    const prevMonthDays = new Date(year, month, 0).getDate();
    const adjustedStartDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    
    // Previous month days
    for (let i = adjustedStartDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="aspect-square flex items-center justify-center text-xs sm:text-sm text-gray-400 bg-gray-100 rounded-lg">
          {prevMonthDays - i}
        </div>
      );
    }
    
    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`aspect-square flex items-center justify-center text-xs sm:text-sm rounded-lg transition ${
            isToday
              ? 'bg-indigo-900 text-white font-bold shadow-lg'
              : selectedDate === day
              ? 'bg-indigo-100 text-indigo-700 font-semibold'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {day}
        </button>
      );
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <div key={`next-${day}`} className="aspect-square flex items-center justify-center text-xs sm:text-sm text-gray-400 bg-gray-100 rounded-lg">
          {day}
        </div>
      );
    }
    
    return days;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (!employeeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-800 font-semibold mb-4">Employee not found</p>
          <button 
            onClick={handleBackClick}
            className="bg-indigo-900 text-white px-6 py-3 rounded-lg hover:bg-indigo-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-30 border-b-4 border-cyan-400">
        <div className="px-4 py-4 flex items-center gap-4">
          <button 
            onClick={handleBackClick}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Employee Insights</h1>
        </div>
      </header>

      <main className="p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile & Work Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Profile Photo */}
                  <div className="flex justify-center sm:justify-start shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border-4 border-indigo-300 shadow-xl flex items-center justify-center overflow-hidden">
                      <div className={`w-full h-full ${employeeData.color} flex items-center justify-center text-white text-2xl sm:text-3xl font-bold`}>
                        {employeeData.initials}
                      </div>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-300 pb-2">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Name</span>
                        <p className="text-gray-900">: {employeeData.name}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Employee ID</span>
                        <p className="text-gray-900">: {employeeData.employeeId}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Role</span>
                        <p className="text-gray-900">: {employeeData.role}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Department</span>
                        <p className="text-gray-900">: {employeeData.department}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Phone</span>
                        <p className="text-gray-900">: {employeeData.phone}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Email</span>
                        <p className="text-gray-900 truncate">: {employeeData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Information & Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Work Information */}
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 border-b-2 border-indigo-300 pb-2">
                    Work Information
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Work Mode</span>
                      <span className="text-gray-900">: {employeeData.workMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Date of Joining</span>
                      <span className="text-gray-900">: {employeeData.dateOfJoining}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Salary</span>
                      <span className="text-gray-900">: {employeeData.salary}</span>
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 border-b-2 border-blue-300 pb-2">
                    ANALYTICS
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Attendance</span>
                      <span className="text-gray-900">: {employeeData.attendance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Performance</span>
                      <span className="text-gray-900">: {employeeData.performance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Ratings</span>
                      <span className="text-gray-900">: {employeeData.ratings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Target Achieved</span>
                      <span className="text-gray-900">: {employeeData.targetAchieved}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 border-b-2 border-indigo-300 pb-2">
                  Remarks
                </h2>
                <ul className="space-y-2 text-sm text-gray-800">
                  {employeeData.remarks.map((remark, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>{remark}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Calendar & Actions */}
            <div className="space-y-6">
              {/* Calendar */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-2 border-cyan-400">
                <div className="text-center mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{monthNames[month]}</h3>
                  <p className="text-base sm:text-lg text-gray-600 font-semibold">{year}</p>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {renderCalendar()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition flex items-center justify-center gap-2">
                  <Download size={20} />
                  Download Report
                </button>

                <a
                  href={`mailto:${employeeData.email}`}
                  className="block w-full bg-indigo-900 hover:bg-indigo-800 text-white py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Mail size={20} />
                    Contact Employee
                  </div>
                </a>
              </div>

              {/* Add Feedback */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-2 border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 text-gray-700 font-semibold hover:text-indigo-600 transition">
                  Add Feedback <Edit2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}