import { Link, useNavigate } from "react-router-dom";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { IoTicket, IoHome, IoFilm, IoHeart } from "react-icons/io5";

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

  const navItems = [
    { label: "Home", to: "/", icon: <IoHome className="inline mr-1" /> },
    { label: "Shows", to: "/shows", icon: <IoFilm className="inline mr-1" /> },
    ...(user
      ? [
          {
            label: "My Favorite",
            to: "/my-favorite",
            icon: <IoHeart className="inline mr-1" />,
          },
        ]
      : []),
  ];

  return (
    <div className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="navbar max-w-[1600px] mx-auto px-6 py-3">
        {/* Start */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden text-gray-700 hover:bg-indigo-50"
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
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-white/95 backdrop-blur-lg rounded-xl w-56 border border-gray-100"
            >
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    className="hover:text-indigo-600 flex items-center"
                    to={item.to}
                  >
                    {item.icon} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-semibold font-playfair text-gray-800 tracking-wide hover:text-indigo-600 transition-colors"
          >
            Curtains<span className="text-indigo-600">Call</span>
          </Link>
        </div>

        {/* Center (desktop links) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-700 font-medium space-x-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  className="hover:text-indigo-600 transition-colors flex items-center"
                  to={item.to}
                >
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* End (login/user button) */}
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
              >
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Bookings"
                    labelIcon={<IoTicket />}
                    onClick={handleBookingsClick}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
