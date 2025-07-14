import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="grid grid-cols-5">
        <AdminSidebar />

        <div className="col-span-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
