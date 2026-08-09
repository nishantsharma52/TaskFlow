import {
  LayoutDashboard,
  ListTodo,
  CheckCircle2,
  Clock3,
  LogOut,
  ClipboardCheck,
  X,
} from "lucide-react";

import React from 'react';
import { logoutUser, setLoading } from "../redux/authSlice";
import { clearTodos } from "../redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import API from "../utils/axios";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab, openSidebar, setOpenSidebar }) => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    dispatch(setLoading(true))
    try {
      const res = await API.post("/user/logout");
      dispatch(logoutUser())
      dispatch(clearTodos());
      toast.success(res.data.message);
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong")
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className={`fixed top-0 left-0 z-50 w-64 h-screen bg-[#1E293B]
border-r border-gray-700 flex flex-col justify-between
transform transition-transform duration-300
${openSidebar ? "translate-x-0" : "-translate-x-full"}
md:translate-x-0`}>

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-700">

          <div className="flex items-center gap-3">
            <ClipboardCheck
              className="text-blue-500"
              size={32}
            />

            <h1 className="text-2xl font-bold text-white">
              TaskFlow
            </h1>
          </div>

          <button
            onClick={() => setOpenSidebar(false)}
            className="md:hidden"
          >
            <X className="text-white" size={28} />
          </button>

        </div>



        {/* Menu */}
        <div className="mt-6 px-3 space-y-2">

          <button onClick={() => {
            setActiveTab("Dashboard");
            setOpenSidebar(false);
          }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg  text-white font-medium ${activeTab === "Dashboard"
            ? "bg-blue-600"
            : "hover:bg-gray-700"
            }`}>
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button onClick={() => {
            setActiveTab("All Tasks");
            setOpenSidebar(false);
          }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg  text-white font-medium ${activeTab === "All Tasks"
            ? "bg-blue-600"
            : "hover:bg-gray-700"
            }`}>
            <ListTodo size={20} />
            All Tasks
          </button>

          <button onClick={() => {
            setActiveTab("Completed");
            setOpenSidebar(false);
          }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg  text-white font-medium ${activeTab === "Completed"
            ? "bg-blue-600"
            : "hover:bg-gray-700"
            }`}>
            <CheckCircle2 size={20} />
            Completed
          </button>

          <button onClick={() => {
            setActiveTab("Pending");
            setOpenSidebar(false);
          }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg  text-white font-medium ${activeTab === "Pending"
            ? "bg-blue-600"
            : "hover:bg-gray-700"
            }`}>
            <Clock3 size={20} />
            Pending
          </button>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 p-4">

        {/* User */}
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h3 className="text-white font-semibold">
              {user?.name}
            </h3>
          </div>

        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </div>
  );
};

export default Sidebar;



