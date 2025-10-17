import React, { use, useEffect, useState } from "react";
import axios from "axios";

const TaskModal = ({ task, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do', // Status default
    deadline: '',
  });

  const token = localStorage.getItem('authToken');
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        deadline: new Date(task.deadline).toISOString().split('T')[0],
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'To Do',
        deadline: '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await axios.patch(`http://localhost:3000/tasks/${task.task_id}`, formData, axiosConfig);
      } else {
        await axios.post('http://localhost:3000/tasks', formData, axiosConfig);
      }
      onRefresh();
      onClose();
    } catch (err) {
      console.error('Save task error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-slate-800 p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl mb-4">{task ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          {/* ... Input fields ... */}
          <div className="mb-4">
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 bg-slate-700 rounded mt-1" required />
          </div>
          <div className="mb-4">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 bg-slate-700 rounded mt-1" />
          </div>
          <div className="mb-4">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 bg-slate-700 rounded mt-1">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Deadline</label>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full p-2 bg-slate-700 rounded mt-1" required />
          </div>
          
          {/* Tombol Aksi */}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;