import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <AdminNavbar />

      <div className="grid grid-cols-5 h-[calc(100vh-64px)]">
        <div className="col-span-1 h-full">
          <AdminSidebar />
        </div>

        <div className="col-span-4 h-full overflow-y-auto bg-gray-50 pb-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
