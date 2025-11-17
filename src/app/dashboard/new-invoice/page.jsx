'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function NewInvoicePage() {
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    invoiceNumber: `INV-${Date.now()}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [
      { description: '', quantity: 1, rate: 0, amount: 0 }
    ],
    notes: '',
    terms: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    
    // Calculate amount
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setInvoiceData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!invoiceData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    
    if (!invoiceData.clientEmail.trim()) {
      newErrors.clientEmail = 'Client email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invoiceData.clientEmail)) {
      newErrors.clientEmail = 'Invalid email format';
    }
    
    if (!invoiceData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    const hasEmptyItems = invoiceData.items.some(item => !item.description.trim());
    if (hasEmptyItems) {
      newErrors.items = 'All items must have a description';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Invoice Data:', invoiceData);
      // Add your API call here to save the invoice
      alert('Invoice created successfully!');
      router.push('/dashboard/accounting-reports');
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/accounting-reports');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Invoice</h1>
                <p className="text-sm text-gray-500 mt-1">Fill in the details below to generate an invoice</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Client Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="clientName"
                placeholder="Client Name"
                value={invoiceData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                error={errors.clientName}
              />
              <Input
                type="email"
                name="clientEmail"
                placeholder="Client Email"
                value={invoiceData.clientEmail}
                onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                error={errors.clientEmail}
              />
              <Input
                type="tel"
                name="clientPhone"
                placeholder="Client Phone (Optional)"
                value={invoiceData.clientPhone}
                onChange={(e) => handleInputChange('clientPhone', e.target.value)}
              />
            </div>
          </div>

          {/* Invoice Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="text"
                name="invoiceNumber"
                placeholder="Invoice Number"
                value={invoiceData.invoiceNumber}
                onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                disabled
              />
              <Input
                type="date"
                name="invoiceDate"
                placeholder="Invoice Date"
                value={invoiceData.invoiceDate}
                onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
              />
              <Input
                type="date"
                name="dueDate"
                placeholder="Due Date"
                value={invoiceData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                error={errors.dueDate}
              />
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Items</h2>
              <Button
                onClick={addItem}
                variant="link"
                className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
              >
                <Plus size={16} /> Add Item
              </Button>
            </div>
            
            {errors.items && (
              <p className="text-red-500 text-sm mb-2">{errors.items}</p>
            )}

            <div className="space-y-3">
              {invoiceData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-start">
                  <div className="col-span-5">
                    <Input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="text"
                      placeholder="Amount"
                      value={`₹${item.amount.toFixed(2)}`}
                      disabled
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-center pt-3">
                    {invoiceData.items.length > 1 && (
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="mb-8 flex justify-end">
            <div className="w-full md:w-1/2 lg:w-1/3 space-y-2 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST (18%):</span>
                <span className="font-semibold">₹{calculateGST().toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between">
                <span className="font-bold text-gray-900">Total:</span>
                <span className="font-bold text-lg text-purple-600">₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                rows={4}
                placeholder="Additional notes..."
                value={invoiceData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
              <textarea
                rows={4}
                placeholder="Payment terms and conditions..."
                value={invoiceData.terms}
                onChange={(e) => handleInputChange('terms', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Create Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}