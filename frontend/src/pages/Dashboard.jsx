import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskModal from "../components/TaskModal.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks", axiosConfig);
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch tasks error:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3000/tasks/${confirmDelete}`, axiosConfig);
      setConfirmDelete(null);
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const filteredTasks = tasks
    .filter((task) =>
        filterStatus === "all" ? true : task.status === filterStatus
    )
    .sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      {/* Header / Navbar */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Filter + Add */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
            {/* Filter Status Dropdown */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-700 px-3 py-2 rounded"
            >
              <option value="all">Filter: All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-slate-700 px-3 py-2 rounded ml-4"
            >
                <option value="asc">Sort: Deadline (Soonest)</option>
                <option value="desc">Sort: Deadline (Latest)</option>
            </select>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
        >
          + Add Task
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-slate-900 rounded">
          <thead>
            <tr className="text-left bg-slate-700">
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Deadline</th>
              <th className="p-3">Created By</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.task_id} className="border-b border-slate-700">
                <td className="p-3">{task.title}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      task.status === "To Do"
                        ? "bg-gray-500"
                        : task.status === "In Progress"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="p-3">{task.created_by}</td>
                <td className="p-3 text-right">
                  <button
                    className="text-blue-400 mr-3"
                    onClick={() => {
                      setEditingTask(task);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-400"
                    onClick={() => setConfirmDelete(task.task_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-400">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => setShowModal(false)}
          onRefresh={fetchTasks}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
