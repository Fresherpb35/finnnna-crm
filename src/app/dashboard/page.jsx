"use client"
import React, { useState } from 'react';
import { Menu, X, Clock, TrendingUp, CheckCircle, Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

   const handleProfileClick = () => {
    router.push('/dashboard/profile');
  };

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', active: true },
    { label: 'Leads & Pipelines', href: '/dashboard/lead-pipelines', active: false },
    { label: 'Tasks', href: '/dashboard/tasks', active: false },
    { label: 'Clients', href: '/dashboard/clients', active: false },
    { label: 'Accounting Reports', href: '/dashboard/accounting-reports', active: false },
    { label: 'HR Analytics', href: '/dashboard/hr-analysis', active: false },
      { label: 'Chat Support', href: '/dashboard/Chat-Support', active: false }
  ];

  const statsCards = [
    { 
      label: 'Conversions %', 
      value: '18.7%', 
      subtitle: '5% More than last week', 
      color: 'from-green-400 to-green-500',
      icon: <TrendingUp size={20} />
    },
    { 
      label: 'Task Delay', 
      value: '4.5%', 
      subtitle: '3% less than last week', 
      color: 'from-orange-400 to-orange-500',
      icon: <Clock size={20} />
    },
    { 
      label: 'Avg. Processing time', 
      value: '7 days', 
      subtitle: '2 days less than last week', 
      color: 'from-cyan-400 to-cyan-500',
      icon: <Clock size={20} />
    }
  ];

  const upcomingTasks = [
    { 
      id: 'task_101',
      text: 'Follow up with a new leads', 
      priority: 'high',
      time: '10:30 AM',
      assignedTo: 'You'
    },
    { 
      id: 'task_102',
      text: 'Complete Client Verification', 
      priority: 'medium',
      time: '2:00 PM',
      assignedTo: 'Rahul S'
    },
    { 
      id: 'task_103',
      text: 'Prepare Compliance report', 
      priority: 'low',
      time: '4:30 PM',
      assignedTo: 'Priya M'
    }
  ];

  const aiInsights = [
    'Top ten potential leads of this week',
    '15% increase in loan approval expected this week',
    'Smart window recommendation for 3 clients in the next 2 days'
  ];

  const leadSources = [
    { name: 'Referrals', percentage: 60.1, color: '#10B981' },
    { name: 'MetaAds', percentage: 25.2, color: '#3B82F6' },
    { name: 'Instagram', percentage: 12.8, color: '#F59E0B' },
    { name: 'Facebook', percentage: 1.9, color: '#6B7280' }
  ];

  const automatedReports = [
    { title: 'Automated Reports', subtitle: 'Generates weekly reports for', icon: <Calendar size={16} className="text-purple-600" /> },
    { title: 'Automated Message Logs', subtitle: 'Access conversation history and', icon: <MessageSquare size={16} className="text-purple-600" /> }
  ];

  const handleGenerateReport = () => {
    window.location.href = '/reports';
  };

  const handleTaskClick = (taskId) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-linear-to-b from-purple-900 via-purple-800 to-purple-900 transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-2xl lg:relative overflow-y-auto scrollbar-hide`}>
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition" onClick={handleProfileClick}>
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
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href}
              className={`flex items-center px-6 py-3.5 transition-all ${
                item.active
                  ? 'text-white bg-purple-700/50 border-l-4 border-white font-medium'
                  : 'text-white/70 hover:text-white hover:bg-purple-700/30 border-l-4 border-transparent'
              }`}
            >
              <span className="text-sm">{item.label}</span>
            </a>
          ))}
          
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
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 shrink-0 z-30">
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center gap-3 md:gap-4">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="hover:bg-gray-100 p-2 rounded-lg transition lg:hidden"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <button
              onClick={handleGenerateReport}
              className="bg-linear-to-r from-purple-600 to-purple-700 text-white px-3 md:px-4 lg:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold hover:from-purple-700 hover:to-purple-800 transition shadow-md"
            >
              Generate report
            </button>
          </div>
        </header>

        {/* Dashboard Content - Scrollable */}
        <main className="flex-1 overflow-y-auto scrollbar-hide p-3 md:p-4 lg:p-6 space-y-4 md:space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {statsCards.map((stat, index) => (
              <div key={index} className={`bg-linear-to-br ${stat.color} rounded-xl p-4 md:p-5 text-white shadow-lg`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-xs md:text-sm opacity-90">{stat.label}</p>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">{stat.value}</h2>
                    <p className="text-xs mt-2 opacity-80">{stat.subtitle}</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-2 shrink-0">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            {/* Left Column - Charts */}
            <div className="xl:col-span-2 space-y-4 md:space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 lg:p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4 md:mb-5">Lean Stats Summary</h3>
                
                {/* Chart with grid lines */}
                <div className="relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-[10px] md:text-xs text-gray-500 pr-2">
                    <span>100</span>
                    <span>80</span>
                    <span>60</span>
                    <span>40</span>
                    <span>20</span>
                    <span>0</span>
                  </div>
                  
                  {/* Chart area with grid */}
                  <div className="ml-8 md:ml-10">
                    {/* Horizontal grid lines */}
                    <div className="relative h-48 md:h-56 lg:h-64">
                      <div className="absolute inset-x-0 top-0 border-t border-dashed border-gray-200"></div>
                      <div className="absolute inset-x-0 top-[20%] border-t border-dashed border-gray-200"></div>
                      <div className="absolute inset-x-0 top-[40%] border-t border-dashed border-gray-200"></div>
                      <div className="absolute inset-x-0 top-[60%] border-t border-dashed border-gray-200"></div>
                      <div className="absolute inset-x-0 top-[80%] border-t border-dashed border-gray-200"></div>
                      <div className="absolute inset-x-0 bottom-0 border-t border-gray-300"></div>
                      
                      {/* Bars */}
                      <div className="relative h-full flex items-end justify-between gap-2 md:gap-3 lg:gap-4 px-2">
                        {[
                          {week: 'Week 1', height: '53%'},
                          {week: 'Week 2', height: '43%'},
                          {week: 'Week 3', height: '36%'},
                          {week: 'Week 4', height: '30%'},
                          {week: 'Week 5', height: '98%'},
                          {week: 'Week 6', height: '26%'}
                        ].map((bar, idx) => (
                          <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end pb-0">
                            <div 
                              className="w-full bg-purple-600 hover:bg-purple-700 transition-colors rounded-t-sm cursor-pointer" 
                              style={{height: bar.height}}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* X-axis labels */}
                    <div className="flex justify-between text-[10px] md:text-xs text-gray-600 mt-2 px-2">
                      <span className="flex-1 text-center">Week 1</span>
                      <span className="flex-1 text-center">Week 2</span>
                      <span className="flex-1 text-center">Week 3</span>
                      <span className="flex-1 text-center">Week 4</span>
                      <span className="flex-1 text-center">Week 5</span>
                      <span className="flex-1 text-center">Week 6</span>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <div className="w-3 h-3 bg-purple-600 rounded-sm"></div>
                      <span className="text-xs text-gray-600">2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lead coming from different sources */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 lg:p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4 md:mb-5">Lead coming from different sources</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 py-4">
                  <div className="relative w-40 h-40 md:w-48 md:h-48">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#E5E7EB" strokeWidth="15"/>
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#10B981" strokeWidth="15" 
                        strokeDasharray="132 220" strokeDashoffset="0"/>
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#3B82F6" strokeWidth="15" 
                        strokeDasharray="55 220" strokeDashoffset="-132"/>
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#F59E0B" strokeWidth="15" 
                        strokeDasharray="28 220" strokeDashoffset="-187"/>
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#6B7280" strokeWidth="15" 
                        strokeDasharray="5 220" strokeDashoffset="-215"/>
                    </svg>
                  </div>
                  <div className="space-y-2 md:space-y-3 w-full md:w-auto">
                    {leadSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between md:justify-start gap-4 md:gap-6">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor: source.color}}></div>
                          <span className="text-xs md:text-sm text-gray-700">{source.name}</span>
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-gray-800">{source.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Tasks & Insights */}
            <div className="space-y-4 md:space-y-6">
              {/* Automated Reports */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4">Automated Reports</h3>
                <div className="space-y-3">
                  {automatedReports.map((report, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                          {report.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-xs md:text-sm">{report.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{report.subtitle}</p>
                        </div>
                      </div>
                      <ul className="ml-10 space-y-1">
                        <li className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />
                          <span>All Stakeholders</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />
                          <span>Monitor calls from 9am to 8:30pm</span>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg">Upcoming Tasks</h3>
                  <button
                    onClick={() => router.push('/dashboard/tasks')}
                    className="text-xs text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <button
                      key={index}
                      onClick={() => handleTaskClick(task.id)}
                      className={`w-full text-left p-3 rounded-lg border-l-4 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group ${
                        task.priority === 'high' ? 'bg-red-50 border-red-500' :
                        task.priority === 'medium' ? 'bg-orange-50 border-orange-500' :
                        'bg-yellow-50 border-yellow-500'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <span className="text-xs md:text-sm text-gray-700 font-medium block group-hover:text-purple-700 transition-colors">{task.text}</span>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] md:text-xs text-gray-500">
                            <Clock size={12} className="shrink-0" />
                            <span>{task.time}</span>
                            <span>•</span>
                            <span className="truncate">{task.assignedTo}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] md:text-xs font-medium px-2 py-1 rounded ${
                            task.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {task.priority === 'high' ? 'High' : task.priority === 'medium' ? 'Med' : 'Low'}
                          </span>
                          <ChevronRight size={16} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-linear-to-br from-purple-900 to-purple-800 rounded-xl shadow-lg p-4 md:p-5 lg:p-6 text-white">
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <h3 className="font-bold text-base md:text-lg">AI Insights</h3>
              <TrendingUp size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="space-y-2 md:space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 hover:bg-white/20 transition cursor-pointer">
                  <p className="text-xs md:text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      {/* Global CSS for hiding scrollbar */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}