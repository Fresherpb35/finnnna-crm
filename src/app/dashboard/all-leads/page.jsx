'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ArrowLeft, Phone, MessageCircle, Mail } from 'lucide-react';
import { useState } from 'react';

export default function AllLeadsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  const leads = [
    {
      id: 1,
      name: "Rakesh Kumar",
      initials: "RK",
      source: "Facebook",
      status: "Documents Collection",
      time: "15 min ago",
      score: 92,
      color: "bg-blue-500",
      phone: "98765 43210",
      email: "rakesh@example.com",
      details: "Interested in home loan. Needs docs guidance."
    },
    {
      id: 2,
      name: "Priya Sharma",
      initials: "PS",
      source: "Instagram",
      status: "Loan Approved",
      time: "2 hrs ago",
      score: 95,
      color: "bg-green-500",
      phone: "91234 56789",
      email: "priya@example.com",
      details: "Loan approved. Awaiting disbursement."
    },
    {
      id: 3,
      name: "Rahul Yadav",
      initials: "RY",
      source: "Referral",
      status: "Documents Collection",
      time: "4 hrs ago",
      score: 76,
      color: "bg-purple-500",
      phone: "99887 76655",
      email: "rahul@example.com",
      details: "Referred by existing client. Collecting KYC."
    },
    {
      id: 4,
      name: "Rahul Yadav",
      initials: "RY",
      source: "Referral",
      status: "Documents Collection",
      time: "4 hrs ago",
      score: 76,
      color: "bg-purple-500",
      phone: "99887 76655",
      email: "rahul@example.com",
      details: "Referred by existing client. Collecting KYC."
    },{
      id: 5,
      name: "Rahul Yadav",
      initials: "RY",
      source: "Referral",
      status: "Documents Collection",
      time: "4 hrs ago",
      score: 76,
      color: "bg-purple-500",
      phone: "99887 76655",
      email: "rahul@example.com",
      details: "Referred by existing client. Collecting KYC."
    },
    // ... add more with unique `id`
  ];

  const getBackgroundColor = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-blue-100';
    if (score >= 60) return 'bg-purple-100';
    return 'bg-red-100';
  };

  const handleLeadClick = (lead) => {
    // Encode lead data to pass safely in URL
    const encodedLead = encodeURIComponent(JSON.stringify(lead));
    router.push(`/dashboard/edit-leads/${lead.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.back()}
                className="hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <ArrowLeft size={20} className="text-gray-700" />
              </button>
              <h1 className="text-base sm:text-lg font-semibold text-gray-900">
                Leads from different Sources
              </h1>
            </div>
            <Link href="/dashboard/all-leads/newlead">
              <button className="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                Add new lead
              </button>
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {['all', 'hot', 'warm', 'cold'].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition capitalize ${
                  activeFilter === filter 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="space-y-3">
          {leads.map((lead) => (
            <div 
              key={lead.id}
              onClick={() => handleLeadClick(lead)}
              className={`${getBackgroundColor(lead.score)} rounded-xl p-4 sm:p k-5 transition hover:shadow-md cursor-pointer`}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left: Avatar + Info */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className={`${lead.color} w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0`}>
                    <span className="text-white font-bold text-sm sm:text-base">
                      {lead.initials}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                        {lead.name}
                      </h3>
                      <span className="text-xs font-semibold text-blue-600 shrink-0">
                        Score: {lead.score}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                      <span className="font-medium">Source: {lead.source}</span>
                      <span className="hidden sm:inline">|</span>
                      <span className={`font-medium ${
                        lead.status.includes('Approved') || lead.status.includes('Approval')
                          ? 'text-green-700'
                          : lead.status.includes('drop')
                          ? 'text-red-700'
                          : 'text-gray-700'
                      }`}>
                        {lead.status}
                      </span>
                      <span className="hidden sm:inline">|</span>
                      <span className="text-gray-500">{lead.time}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Action Icons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={(e) => { e.stopPropagation(); /* Call */ }}
                    className="p-2 hover:bg-white/60 rounded-lg transition group"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-blue-600" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); /* SMS */ }}
                    className="p-2 hover:bg-white/60 rounded-lg transition group"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-green-600" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); /* Email */ }}
                    className="p-2 hover:bg-white/60 rounded-lg transition group"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-purple-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}