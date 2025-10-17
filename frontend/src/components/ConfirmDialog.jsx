import React from 'react';

const ConfirmDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Are you sure you want to delete this task?</h3>
        <div className="flex justify-end">
          <button onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;