"use client"
import React, { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle, Circle, Eye, Trash2, Download, X, FileText, AlertCircle } from 'lucide-react';

export default function DocumentsManagementUI() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Application\nForm', uploaded: true, fileName: 'application_form.pdf', fileSize: '2.4 MB', uploadDate: '12 Nov 2024' },
    { id: 2, name: 'Aadhaar\nCard', uploaded: true, fileName: 'aadhaar.pdf', fileSize: '1.8 MB', uploadDate: '12 Nov 2024' },
    { id: 3, name: 'Address\nProof', uploaded: true, fileName: 'address_proof.pdf', fileSize: '2.1 MB', uploadDate: '13 Nov 2024' },
    { id: 4, name: 'Income\nProof', uploaded: false, fileName: null, fileSize: null, uploadDate: null },
    { id: 5, name: 'Bank\nStatements', uploaded: false, fileName: null, fileSize: null, uploadDate: null },
    { id: 6, name: 'Purpose\nLetter', uploaded: false, fileName: null, fileSize: null, uploadDate: null },
    { id: 7, name: 'Digital\nSignature', uploaded: true, fileName: 'signature.png', fileSize: '0.5 MB', uploadDate: '14 Nov 2024' },
    { id: 8, name: 'Passport-size\nPhotograph', uploaded: true, fileName: 'photo.jpg', fileSize: '0.8 MB', uploadDate: '14 Nov 2024' },
    { id: 9, name: 'Collateral\nDocuments', uploaded: false, fileName: null, fileSize: null, uploadDate: null },
  ]);

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState('');

  const handleBack = () => {
    window.history.back();
  };

  const showMessage = (message) => {
    setShowSuccessMessage(message);
    setTimeout(() => setShowSuccessMessage(''), 3000);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleUpload = (id) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Simulate upload progress
        setUploadProgress({ ...uploadProgress, [id]: 0 });
        
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const currentProgress = prev[id] || 0;
            if (currentProgress >= 100) {
              clearInterval(interval);
              // Update document after upload completes
              setDocuments(docs =>
                docs.map(doc =>
                  doc.id === id ? { 
                    ...doc, 
                    uploaded: true, 
                    fileName: file.name,
                    fileSize: formatFileSize(file.size),
                    uploadDate: getCurrentDate()
                  } : doc
                )
              );
              showMessage(`${file.name} uploaded successfully!`);
              return { ...prev, [id]: undefined };
            }
            return { ...prev, [id]: currentProgress + 10 };
          });
        }, 100);
      }
    };
    input.click();
  };

  const handleView = (doc) => {
    if (doc.uploaded) {
      setSelectedDoc(doc);
      setShowPreviewModal(true);
    }
  };

  const handleDownload = (doc) => {
    if (doc.uploaded) {
      showMessage(`Downloading ${doc.fileName}...`);
      // Simulate download
      setTimeout(() => {
        showMessage(`${doc.fileName} downloaded successfully!`);
      }, 1000);
    }
  };

  const handleDeleteClick = (doc) => {
    if (doc.uploaded) {
      setDocToDelete(doc);
      setShowDeleteConfirm(true);
    }
  };

  const confirmDelete = () => {
    if (docToDelete) {
      setDocuments(docs =>
        docs.map(doc =>
          doc.id === docToDelete.id ? { 
            ...doc, 
            uploaded: false, 
            fileName: null,
            fileSize: null,
            uploadDate: null
          } : doc
        )
      );
      showMessage(`${docToDelete.fileName} deleted successfully!`);
      setShowDeleteConfirm(false);
      setDocToDelete(null);
    }
  };

  const handleToggleStatus = (id) => {
    const doc = documents.find(d => d.id === id);
    if (doc.uploaded) {
      handleDeleteClick(doc);
    } else {
      handleUpload(id);
    }
  };

  const uploadedCount = documents.filter(d => d.uploaded).length;
  const totalCount = documents.length;
  const progressPercentage = Math.round((uploadedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <CheckCircle size={20} />
          <span className="font-medium">{showSuccessMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-linear-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white p-4 sm:p-5 flex items-center justify-center sticky top-0 z-40 shadow-lg">
        <button
          onClick={handleBack}
          className="absolute left-4 p-2 hover:bg-white/20 rounded-lg transition active:scale-95 backdrop-blur-sm"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold">Documents Management</h1>
          <p className="text-sm text-purple-200 mt-1">Upload and manage lead documents</p>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Progress Summary at Top */}
        <div className="mb-6 sm:mb-8 bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Upload Progress</h3>
              <p className="text-sm sm:text-base text-gray-600">
                <span className="font-semibold text-indigo-600">{uploadedCount}</span> of <span className="font-semibold">{totalCount}</span> documents uploaded
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-1 sm:w-48 bg-gray-200 rounded-full h-3 sm:h-4">
                <div
                  className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 sm:h-4 rounded-full transition-all duration-500 shadow-md"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-base sm:text-lg font-bold text-gray-700 whitespace-nowrap min-w-[50px]">
                {progressPercentage}%
              </span>
            </div>
          </div>
          
          {/* Status indicators */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              <span className="text-sm text-gray-600">Uploaded: {uploadedCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-orange-500" />
              <span className="text-sm text-gray-600">Pending: {totalCount - uploadedCount}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                doc.uploaded 
                  ? 'bg-linear-to-br from-green-50 to-emerald-50 border-green-200' 
                  : 'bg-linear-to-br from-purple-50 to-blue-50 border-purple-200'
              }`}
            >
              {/* Document Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <FileText size={40} className={doc.uploaded ? 'text-green-600' : 'text-purple-600'} />
                    {doc.uploaded && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                        <CheckCircle size={16} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-gray-800 font-semibold text-sm sm:text-base leading-tight whitespace-pre-line">
                      {doc.name}
                    </h3>
                    {doc.uploaded && (
                      <p className="text-xs text-gray-500 mt-1">{doc.uploadDate}</p>
                    )}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  doc.uploaded 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {doc.uploaded ? 'Done' : 'Pending'}
                </div>
              </div>

              {/* File Info */}
              {doc.uploaded && (
                <div className="mb-4 p-3 bg-white/70 rounded-lg">
                  <p className="text-xs text-gray-600 truncate">{doc.fileName}</p>
                  <p className="text-xs text-gray-500 mt-1">{doc.fileSize}</p>
                </div>
              )}

              {/* Upload Progress */}
              {uploadProgress[doc.id] !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress[doc.id]}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-linear-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress[doc.id]}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2">
                {doc.uploaded ? (
                  <>
                    <button
                      onClick={() => handleView(doc)}
                      className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition-all duration-200 active:scale-95"
                      title="View document"
                    >
                      <Eye size={18} className="text-indigo-600" />
                      <span className="text-sm font-medium text-gray-700">View</span>
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-2.5 bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition-all duration-200 active:scale-95"
                      title="Download document"
                    >
                      <Download size={18} className="text-green-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(doc)}
                      className="p-2.5 bg-white rounded-lg shadow hover:shadow-md hover:bg-red-50 transition-all duration-200 active:scale-95"
                      title="Delete document"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleUpload(doc.id)}
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 active:scale-95"
                  >
                    <Upload size={18} />
                    <span className="font-semibold">Upload</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Missing Documents Alert */}
        {uploadedCount < totalCount && (
          <div className="mt-6 sm:mt-8 bg-linear-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-5 sm:p-6 flex items-start gap-3 sm:gap-4">
            <AlertCircle size={24} className="text-orange-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Missing Documents</h4>
              <p className="text-sm text-gray-600">
                Please upload all required documents to proceed with the loan application. 
                {totalCount - uploadedCount} document{totalCount - uploadedCount !== 1 ? 's' : ''} remaining.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreviewModal && selectedDoc && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-linear-to-r from-indigo-900 to-purple-900 text-white p-4 sm:p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold">{selectedDoc.name.replace('\n', ' ')}</h3>
                <p className="text-sm text-purple-200 mt-1">{selectedDoc.fileName}</p>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="bg-gray-100 rounded-xl p-8 sm:p-12 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <FileText size={80} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Document Preview</p>
                  <p className="text-sm text-gray-500">{selectedDoc.fileName}</p>
                  <p className="text-sm text-gray-500">{selectedDoc.fileSize}</p>
                  <button
                    onClick={() => handleDownload(selectedDoc)}
                    className="mt-6 flex items-center gap-2 mx-auto px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition"
                  >
                    <Download size={18} />
                    <span>Download Document</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && docToDelete && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Document?</h3>
              <p className="text-gray-600">Are you sure you want to delete <strong>{docToDelete.fileName}</strong>? This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 px-4 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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