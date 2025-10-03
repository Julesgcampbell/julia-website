import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  onConfirm,
  onCancel
}) => {
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="w-8 h-8 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="w-8 h-8 text-blue-500" />;
      default:
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      default:
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
    }
  };

  const requiresInput = title.includes('Type "DELETE ALL"');

  const handleConfirm = () => {
    if (requiresInput && inputValue !== 'DELETE ALL') {
      return; // Don't allow confirmation without correct input
    }
    onConfirm();
    setInputValue('');
  };

  const handleCancel = () => {
    onCancel();
    setInputValue('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 whitespace-pre-line">{message}</p>
          
          {requiresInput && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type "DELETE ALL" to confirm:
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="DELETE ALL"
                autoFocus
              />
            </div>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={requiresInput && inputValue !== 'DELETE ALL'}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
              requiresInput && inputValue !== 'DELETE ALL'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : getButtonColor()
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;