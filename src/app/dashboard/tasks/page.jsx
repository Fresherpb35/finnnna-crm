'use client';
import React, { useState } from 'react';
import { Menu, X, CheckCircle, AlertCircle, Clock, TrendingUp, Lightbulb, ChevronRight } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function TaskManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  
  const taskStats = [
    { label: 'Completed', count: '24', color: 'from-green-400 to-green-500', icon: CheckCircle },
    { label: 'Overdue', count: '09', color: 'from-red-400 to-red-500', icon: AlertCircle },
    { label: 'Due Soon', count: '18', color: 'from-orange-400 to-orange-500', icon: Clock },
    { label: 'In Progress', count: '12', color: 'from-cyan-400 to-cyan-500', icon: TrendingUp }
  ];

  const todaysTasks = [
    { 
      id: 'task_001',
      title: 'Follow up with Rajesh Kumar', 
      time: '10:00 AM',
      assignedTo: 'You',
      status: 'urgent',
      color: 'bg-red-50 border-red-200',
      dotColor: 'bg-orange-400',
      description: 'Check loan application status and discuss next steps'
    },
    { 
      id: 'task_002',
      title: 'Complete CIBIL check for Priya', 
      time: '11:30 AM',
      assignedTo: 'Rahul S',
      status: 'on-time',
      color: 'bg-green-50 border-green-200',
      dotColor: 'bg-green-400',
      description: 'Verify credit score and generate report'
    },
    { 
      id: 'task_003',
      title: 'Upload bank statements for Amit', 
      time: '2:00 PM',
      assignedTo: 'Nakul B',
      status: 'on-time',
      color: 'bg-green-50 border-green-200',
      dotColor: 'bg-green-400',
      description: 'Collect and upload last 6 months statements'
    },
    { 
      id: 'task_004',
      title: 'Send loan Approval to Neha', 
      time: '3:30 PM',
      assignedTo: 'You',
      status: 'urgent',
      color: 'bg-red-50 border-red-200',
      dotColor: 'bg-orange-400',
      description: 'Prepare approval letter and send via email'
    },
    { 
      id: 'task_005',
      title: 'Verify ITR documents', 
      time: '11:00 PM',
      assignedTo: 'Priya M',
      status: 'processing',
      color: 'bg-blue-50 border-blue-200',
      dotColor: 'bg-blue-400',
      description: 'Review income tax returns for last 2 years'
    }
  ];

  const handleCreateTask = () => {
    router.push("/dashboard/tasks/new"); 
  };

  const handleTaskClick = (taskId) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-linear-to-b from-purple-900 via-purple-800 to-purple-900 transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl lg:relative`}>
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img src="/images/user.png" alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Welcome, User!</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="text-white hover:bg-purple-800 p-2 rounded-lg transition lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="py-2 pb-20">
          <a href="/dashboard" className="flex items-center px-6 py-3.5 text-white/70 hover:text-white hover:bg-purple-700/30 transition-all">
            <span className="text-sm">Dashboard</span>
          </a>
          <a href="/dashboard/lead-pipelines" className="flex items-center px-6 py-3.5 text-white/70 hover:text-white hover:bg-purple-700/30 transition-all">
            <span className="text-sm">Leads & Pipelines</span>
          </a>
          <a href="/dashboard/tasks" className="flex items-center px-6 py-3.5 text-white bg-purple-700/50 border-l-4 border-white transition-all">
            <span className="text-sm font-medium">Tasks</span>
          </a>
          <a href="/dashboard/clients" className="flex items-center px-6 py-3.5 text-white/70 hover:text-white hover:bg-purple-700/30 transition-all">
            <span className="text-sm">Clients</span>
          </a>
          <a href="/dashboard/accounting-reports" className="flex items-center px-6 py-3.5 text-white/70 hover:text-white hover:bg-purple-700/30 transition-all">
            <span className="text-sm">Accounting Reports</span>
          </a>
          <a href="/dashboard/hr-analytics" className="flex items-center px-6 py-3.5 text-white/70 hover:text-white hover:bg-purple-700/30 transition-all">
            <span className="text-sm">HR Analytics</span>
          </a>
          
          <div className="absolute bottom-4 left-0 right-0 px-6">
            <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">Settings</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30 border-b border-gray-200">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="hover:bg-gray-100 p-2 rounded-lg transition lg:hidden"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Task Management</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage and track all your tasks</p>
              </div>
            </div>
            <button
              onClick={handleCreateTask}
              className="bg-linear-to-r from-purple-600 to-purple-700 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition shadow-md text-sm md:text-base"
            >
              Create Task
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 space-y-6">
          {/* Task Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {taskStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className={`bg-linear-to-br ${stat.color} rounded-2xl p-5 text-white shadow-lg relative overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105`}>
                  <Icon size={24} className="absolute top-4 right-4 opacity-80" />
                  <h2 className="text-4xl font-bold mt-2 mb-1">{stat.count}</h2>
                  <p className="text-sm opacity-90 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Tasks */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 text-lg">Today's Tasks</h3>
                <span className="text-sm text-gray-500">{todaysTasks.length} tasks</span>
              </div>
              <div className="space-y-3">
                {todaysTasks.map((task, index) => (
                  <button
                    key={index}
                    onClick={() => handleTaskClick(task.id)}
                    className={`w-full text-left p-4 rounded-xl border ${task.color} transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">{task.title}</p>
                          <ChevronRight size={18} className="text-gray-400 group-hover:text-purple-600 transition-colors shrink-0 ml-2" />
                        </div>
                        <p className="text-xs text-gray-500 mb-2 line-clamp-1">{task.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{task.time}</span>
                          </div>
                          <span>•</span>
                          <span>Assigned to: {task.assignedTo}</span>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${task.dotColor} shrink-0 ml-3 mt-1`}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Monthly Progress */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-5 text-lg">Monthly Progress</h3>
                <div className="flex items-center justify-center py-6">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8"/>
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="none" 
                        stroke="url(#progressGradient)" 
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="50.24"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-4xl font-bold bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">80%</span>
                        <p className="text-xs text-gray-500 mt-1">Great Work!</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-linear-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 mt-4 border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={18} className="text-yellow-600" />
                    <p className="text-xs font-semibold text-gray-700">You're doing amazing! 80% milestone reached! Keep it up!</p>
                  </div>
                </div>
              </div>

              {/* Task States Legend */}
              <div className="bg-linear-to-br from-teal-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Task States Legend</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-sm">On time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                    <span className="text-sm">60 min before deadline</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-sm">Delayed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="text-sm">Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}