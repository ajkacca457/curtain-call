import { Link } from 'react-router-dom';
import {useUser} from '@clerk/clerk-react';

const AdminNavbar = () => {

  const { user } = useUser();
  console.log("User Info:", user);

  return (
    <header className="w-full bg-gray-900 text-white shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <Link
          to="/admin"
          className="text-2xl font-bold tracking-wide text-white hover:text-indigo-400 transition"
        >
          CurtainsCall
        </Link>

        {/* Admin Info */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-300">Welcome, {user?.username || 'Admin'}</span>
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
