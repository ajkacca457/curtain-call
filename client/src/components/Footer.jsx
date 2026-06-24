import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111] border-t border-[#222] mt-20">
      <div className="max-w-[1600px] mx-auto px-6 pt-14 pb-8">

        {/* Main row */}
        <div className="flex flex-wrap gap-12 justify-between pb-10 border-b border-[#222]">

          {/* Brand */}
          <div className="max-w-xs">
            <h2 className="font-serif text-2xl font-bold text-[#f5f5f5] mb-4">
              Curtain<span className="text-[#d4af37]">Call</span>
            </h2>
            <div className="w-8 h-0.5 bg-[#d4af37] mb-4" />
            <p className="text-sm text-[#888] leading-relaxed">
              A seamless booking platform for theatre, concerts, and live events.
              Experience the stage like never before.
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            {/* Links */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-[#d4af37] mb-5">
                Company
              </h3>
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {[
                  { label: "About Us",       to: "/about-us" },
                  { label: "Contact",        to: "/contact" },
                  { label: "Privacy Policy", to: "/privacy-policy" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-[#888] no-underline hover:text-[#d4af37] transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="max-w-xs">
              <h3 className="text-xs font-medium uppercase tracking-widest text-[#d4af37] mb-5">
                Newsletter
              </h3>
              <p className="text-sm text-[#888] leading-relaxed mb-4">
                The latest shows, announcements, and offers — delivered weekly.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-[#1a1a1a] border border-[#333] rounded text-sm text-[#f5f5f5] outline-none focus:border-[#d4af37] transition-colors duration-200"
                />
                <button className="px-4 py-2 text-xs uppercase tracking-widest border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-[#555] mt-7">
          © {new Date().getFullYear()} CurtainCall. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;