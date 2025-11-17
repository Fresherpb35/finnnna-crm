'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Menu, X, Phone } from 'lucide-react';

export default function ChatSupportPage() {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Rakesh Kumar',
      avatar: 'RK',
      lastMessage: 'Thank you for the help!',
      time: '2:45 AM',
      unread: 2,
      tag: 'Hot',
      messages: [
        { id: 1, text: 'Hi, I need help with my loan application', sender: 'user', time: '2:30 AM' },
        { id: 2, text: 'Hello! I\'d be happy to help. What seems to be the issue?', sender: 'support', time: '2:32 AM' },
        { id: 3, text: 'I\'m having trouble uploading my documents', sender: 'user', time: '2:35 AM' },
        { id: 4, text: 'I can help you with that. Please try using the upload button again.', sender: 'support', time: '2:40 AM' },
        { id: 5, text: 'Thank you for the help!', sender: 'user', time: '2:45 AM' }
      ]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      avatar: 'PS',
      lastMessage: 'When will my loan be approved?',
      time: '1:15 AM',
      unread: 0,
      tag: 'Warm',
      messages: [
        { id: 1, text: 'When will my loan be approved?', sender: 'user', time: '1:15 AM' },
        { id: 2, text: 'Your application is under review. You should hear back within 2-3 business days.', sender: 'support', time: '1:20 AM' }
      ]
    },
    {
      id: 3,
      name: 'Amit Patel',
      avatar: 'AP',
      lastMessage: 'Can I update my phone number?',
      time: '12:50 PM',
      unread: 1,
      tag: 'Cold',
      messages: [
        { id: 1, text: 'Can I update my phone number?', sender: 'user', time: '12:50 PM' }
      ]
    },
    {
      id: 4,
      name: 'Nikita Khosla',
      avatar: 'NK',
      lastMessage: 'What documents do I need?',
      time: '11:30 PM',
      unread: 0,
      tag: 'Hot',
      messages: [
        { id: 1, text: 'What documents do I need?', sender: 'user', time: '11:30 PM' },
        { id: 2, text: 'You\'ll need ID proof, address proof, and income documents.', sender: 'support', time: '11:35 PM' }
      ]
    }
  ]);

  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const tabs = ['All', 'Hot', 'Warm', 'Cold'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const filteredChats = chats.filter(chat => {
    const matchesTab = activeTab === 'All' || chat.tag === activeTab;
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setIsSidebarOpen(false);
    
    setChats(prevChats => 
      prevChats.map(c => 
        c.id === chat.id ? { ...c, unread: 0 } : c
      )
    );
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'support',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChats(prevChats => 
        prevChats.map(chat => {
          if (chat.id === selectedChat.id) {
            const updatedChat = {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: message,
              time: 'Just now'
            };
            setSelectedChat(updatedChat);
            return updatedChat;
          }
          return chat;
        })
      );
      
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Chat List */}
      <div className={`fixed lg:relative inset-y-0 left-0 w-full sm:w-80 bg-white flex flex-col z-50 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-900 to-purple-900 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleBack}
                className="p-2 hover:bg-white/10 rounded-lg transition text-white"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-lg font-semibold text-white">Chat support</h1>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-50 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-indigo-900 bg-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-900" />
              )}
            </button>
          ))}
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto bg-white">
          {filteredChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className={`flex items-center gap-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                selectedChat?.id === chat.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  {chat.avatar}
                </div>
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {chat.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}

          {filteredChats.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <p className="text-gray-500 text-sm">No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-linear-to-r from-indigo-900 to-purple-900 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition text-white"
                  >
                    <Menu size={20} />
                  </button>
                  <ArrowLeft 
                    size={20} 
                    className="text-white cursor-pointer hover:opacity-80 transition lg:hidden"
                    onClick={() => setSelectedChat(null)}
                  />
                  <h2 className="font-semibold text-white text-base">{selectedChat.name}</h2>
                </div>
                <button 
                  onClick={() => alert(`Calling ${selectedChat.name}...`)}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <Phone size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Messages Area with Background Pattern */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239ca3af' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundColor: '#e5e7eb'
              }}
            >
              {/* Avatar in center at top */}
              <div className="flex justify-center mb-6 pt-6">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-800 to-purple-800 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                  {selectedChat.avatar}
                </div>
              </div>

              {/* Messages */}
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'support' ? 'justify-end' : 'justify-start'} mb-3`}
                >
                  <div className="max-w-xs lg:max-w-md">
                    <div
                      className={`rounded-2xl px-4 py-2.5 shadow ${
                        msg.sender === 'support'
                          ? 'bg-linear-to-br from-indigo-900 to-purple-900 text-white rounded-br-none'
                          : 'bg-white text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 px-2 ${msg.sender === 'support' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-gray-100 p-4">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-sm py-2"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-2.5 bg-linear-to-r from-indigo-900 to-purple-900 text-white rounded-full hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          // Empty State - Exact match to image
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden mb-6 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition border border-white/30 relative z-10"
            >
              Open Chats
            </button>

            {/* Illustration */}
            <div className="relative z-10 mb-8">
              <div className="text-9xl">🤝</div>
            </div>

            {/* Text */}
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">HELPING THE</h2>
              <h3 className="text-2xl font-semibold text-white/90 tracking-wide">COMMUNITY</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}