import { Link } from "react-router-dom";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { IoTicket, IoHome, IoFilm, IoHeart } from "react-icons/io5";

const AdminNavbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

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

        <div>
          <span className="text-gray-300">Welcome, {user?.username || 'Admin'}</span>
        </div>

        {/* Admin Info */}
        <div className="flex items-center gap-4 text-sm">
          <div className="navbar-end">
            {!user ? (
              <button
                className="btn btn-sm btn-outline border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                onClick={openSignIn}
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "ring-2 ring-indigo-500 hover:ring-indigo-400 transition",
                    },
                  }}
                ></UserButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
