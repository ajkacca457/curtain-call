import React from "react";
import { NavLink } from "react-router-dom";
import { IoHome, IoAddCircle, IoList, IoTicket } from "react-icons/io5";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: <IoHome /> },
  { label: "Add Show Timings", path: "/admin/add-show-times", icon: <IoAddCircle /> },
  { label: "List Shows", path: "/admin/list-shows", icon: <IoList /> },
  { label: "Bookings", path: "/admin/list-bookings", icon: <IoTicket /> },
];

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-100 h-screen w-full p-4 border-r border-gray-300">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
