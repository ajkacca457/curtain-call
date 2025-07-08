import { Link } from "react-router-dom";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { IoTicket } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const handleBookingsClick = () => {
    if (!user) {
      openSignIn();
    } else {
      navigate("/my-bookings");
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="navbar max-w-[1600px] mx-auto px-6 py-3">
        {/* Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-md mt-3 w-52 p-2 border border-gray-200"
            >
              <li>
                <Link className="hover:text-indigo-500" to="/">Home</Link>
              </li>
              <li>
                <Link className="hover:text-indigo-500" to="/shows">Shows</Link>
              </li>
              <li>
                <Link className="hover:text-indigo-500" to="/my-favorite">My Favorite</Link>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="text-2xl font-playfair text-gray-800 hover:text-indigo-600 transition"
          >
            CurtainsCall
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-700 font-medium">
            <li>
              <Link className="hover:text-indigo-500 transition" to="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-indigo-500 transition" to="/shows">Shows</Link>
            </li>
            <li>
              <Link className="hover:text-indigo-500 transition" to="/my-favorite">My Favorite</Link>
            </li>
          </ul>
        </div>

        {/* End */}
        <div className="navbar-end">
          {!user ? (
            <button
              className="btn btn-outline border-indigo-500 text-indigo-600 hover:bg-indigo-50"
              onClick={openSignIn}
            >
              Login
            </button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<IoTicket />}
                  onClick={handleBookingsClick}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
