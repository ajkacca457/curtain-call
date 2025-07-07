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
  }


  return (
    <div>
      <div className="navbar max-w-[1600px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shows">Shows</Link>
              </li>
              <li>
                <Link to="/my-favorite">My Favorite</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shows">Shows</Link>
            </li>
            <li>
              <Link to="/my-favorite">My Favorite</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {!user ? (
            <button
              className="btn btn-outline btn-secondary"
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
