import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { IoTicket, IoHome, IoFilm, IoHeart, IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleBookingsClick = () => {
    if (!user) openSignIn();
    else navigate("/my-bookings");
  };

  const navItems = [
    { label: "Home",      to: "/",           icon: <IoHome /> },
    { label: "Shows",     to: "/shows",      icon: <IoFilm /> },
    ...(user ? [{ label: "Favourites", to: "/my-favorite", icon: <IoHeart /> }] : []),
  ];

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#222]">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="no-underline">
            <span className="font-serif text-xl font-bold tracking-wide text-[#f5f5f5]">
              Curtain<span className="text-[#d4af37]">Call</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-medium uppercase tracking-widest transition-colors duration-200 no-underline
                  ${isActive(item.to)
                    ? "text-[#d4af37] border-b border-[#d4af37]"
                    : "text-[#888] hover:text-[#f5f5f5]"
                  }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {!user ? (
              <button
                onClick={openSignIn}
                className="px-5 py-2 text-xs font-medium uppercase tracking-widest border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors duration-200"
              >
                Sign In
              </button>
            ) : (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#0a0a0a]",
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
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-[#888] text-2xl bg-transparent border-none cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#222] py-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-2 py-3 text-sm no-underline border-b border-[#222]
                  ${isActive(item.to) ? "text-[#d4af37]" : "text-[#888]"}`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;