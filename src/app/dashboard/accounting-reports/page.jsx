'use client';
import Link from "next/link";
import { useState } from 'react';
import { FileText, Menu, Search, X } from 'lucide-react';

export default function AccountingReportsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', active: false },
    { label: 'Leads & Pipelines', href: '/dashboard/lead-pipelines', active: false },
    { label: 'Tasks', href: '/dashboard/tasks', active: false },
    { label: 'Clients', href: '/dashboard/clients', active: false },
    { label: 'Accounting Reports', href: '/dashboard/accounting-reports', active: true },
    { label: 'HR Analytics', href: '/dashboard/hr-analysis', active: false }
  ];

  const financialStats = [
    { label: 'Total revenue', amount: '₹45.5L', change: '+8.2%', color: 'bg-green-50', textColor: 'text-green-600', icon: '💰' },
    { label: 'Commission Paid', amount: '₹8.5L', change: '+4.3%', color: 'bg-blue-50', textColor: 'text-blue-600', icon: '💳' },
    { label: 'Outstanding', amount: '₹10.3L', change: '-8.2%', color: 'bg-red-50', textColor: 'text-red-600', icon: '⏱️' },
    { label: 'GST Collected', amount: '₹6.8L', change: '+2.1%', color: 'bg-orange-50', textColor: 'text-orange-600', icon: '🧾' }
  ];

  const quickActions = [
    { title: 'Generate Quotation', bg: 'bg-white', textColor: 'text-gray-700', border: 'border border-gray-200' },
    { title: 'Export Report', bg: 'bg-white', textColor: 'text-gray-700', border: 'border border-gray-200' },
    { title: 'GST Summary', bg: 'bg-white', textColor: 'text-gray-700', border: 'border border-gray-200' },
    { title: 'Reconciliation', bg: 'bg-white', textColor: 'text-gray-700', border: 'border border-gray-200' }
  ];

  const recentInvoices = [
    { name: 'Rakesh Kumar', type: 'Loan Processing', date: '16 Apr 2025', amount: '₹2.5L', status: 'paid' },
    { name: 'Priya Sharma', type: 'Consultancy', date: '16 Apr 2025', amount: '₹1.8L', status: 'paid' },
    { name: 'Amit Patel', type: 'Loan Processing', date: '16 May 2025', amount: '₹3.3L', status: 'pending' },
    { name: 'Neha Singh', type: 'Loan Processing', date: '17 May 2025', amount: '₹55k', status: 'paid' },
    { name: 'Nikhil Srivastav', type: 'Consultancy', date: '21 May 2025', amount: '₹2L', status: 'paid' }
  ];

  const kpiData = [
    { label: 'Revenue', percentage: 85, color: 'bg-green-500' },
    { label: 'Profit Margin', percentage: 72, color: 'bg-green-500' },
    { label: 'Expenses', percentage: 45, color: 'bg-green-500' }
  ];

  const partnerCommissions = [
    { name: 'PARTNER A', loansProcessed: 18, commissionAmount: '₹2.8L', status: 'Paid', statusColor: 'text-green-600 bg-green-50' },
    { name: 'PARTNER B', loansProcessed: 25, commissionAmount: '₹3.6L', status: 'Pending', statusColor: 'text-orange-600 bg-orange-50' },
    { name: 'PARTNER C', loansProcessed: 16, commissionAmount: '₹2.1L', status: 'Paid', statusColor: 'text-green-600 bg-green-50' }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-linear-to-b from-purple-950 to-purple-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto scrollbar-hide`}>
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-purple-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img 
                  src="/images/user.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Welcome, User!</p>
              </div>
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="text-white hover:bg-purple-800 p-2 rounded-lg transition lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Menu Items */}
          <nav className="flex-1 py-2 pb-20">
            {menuItems.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className={`flex items-center px-6 py-3.5 text-sm transition-all ${
                  item.active
                    ? 'bg-purple-700/50 text-white font-medium border-l-4 border-white'
                    : 'text-white/70 hover:text-white hover:bg-purple-700/30 border-l-4 border-transparent'
                }`}
              >
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Settings at Bottom */}
          <div className="absolute bottom-4 left-0 right-0 px-6">
            <a href="/settings" className="flex items-center gap-2 text-white/70 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">Settings</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 shrink-0 z-30">
          <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <button 
                onClick={() => setMenuOpen(true)} 
                className="lg:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition shrink-0"
              >
                <Menu size={20} />
              </button>
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search clients, loans, documents..." 
                  className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
         <Link href="/dashboard/new-invoice">
  <button className="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-700 transition whitespace-nowrap shrink-0">
    <span className="hidden sm:inline">+ New Invoice</span>
    <span className="sm:hidden">+ Invoice</span>
  </button>
</Link>
          </div>
        </header>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Accounting and Finance</h1>

          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Financial Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {financialStats.map((stat, index) => (
                <div key={index} className={`${stat.color} rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100`}>
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <span className="text-xl sm:text-2xl">{stat.icon}</span>
                    <span className={`text-xs font-medium ${stat.change.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 ${stat.textColor}`}>{stat.amount}</h2>
                  <p className="text-[10px] sm:text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Invoices */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">Recent Invoices</h3>
                  <button className="text-xs sm:text-sm text-purple-600 font-medium hover:text-purple-700">VIEW ALL</button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {recentInvoices.map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-100">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                          <FileText size={16} className="text-blue-600 sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{invoice.name}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500 truncate">{invoice.type} • {invoice.date}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className="text-xs sm:text-sm font-bold text-gray-900">{invoice.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">Quick Actions</h3>
                <div className="space-y-2 sm:space-y-3">
                  {quickActions.map((action, index) => (
                    <button 
                      key={index}
                      className={`w-full ${action.bg} ${action.textColor} ${action.border} py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-50 transition text-left`}
                    >
                      {action.title}
                    </button>
                  ))}
                  <div className="pt-2">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-2 sm:mb-3">Financial KPIs</h4>
                      <div className="space-y-2 sm:space-y-3">
                        {kpiData.map((kpi, index) => (
                          <div key={index} className="flex items-center justify-between gap-2">
                            <span className="text-[10px] sm:text-xs text-gray-600">{kpi.label}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                <div className={`${kpi.color} h-full rounded-full`} style={{width: `${kpi.percentage}%`}}></div>
                              </div>
                              <span className="text-[10px] sm:text-xs font-semibold text-gray-700 w-7 sm:w-8 text-right">{kpi.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Commission Report */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">Partner Commission Report</h3>
                <button className="text-[10px] sm:text-xs bg-gray-200 text-gray-700 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
                  <span className="hidden xs:inline">Generate </span>Report
                </button>
              </div>
              
              {/* Mobile Card View */}
              <div className="block md:hidden space-y-3">
                {partnerCommissions.map((partner, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-gray-900">{partner.name}</span>
                      <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${partner.statusColor}`}>
                        {partner.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Loans:</span>
                        <span className="ml-1 font-medium text-gray-900">{partner.loansProcessed}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Commission:</span>
                        <span className="ml-1 font-semibold text-gray-900">{partner.commissionAmount}</span>
                      </div>
                    </div>
                    <button className="text-xs text-purple-600 hover:text-purple-700 font-medium mt-2">View Details →</button>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto -mx-5 px-5">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Partners Name</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Loans Processed</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Commission Amount</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerCommissions.map((partner, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900 font-medium">{partner.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{partner.loansProcessed}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 font-semibold">{partner.commissionAmount}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${partner.statusColor}`}>
                            {partner.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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