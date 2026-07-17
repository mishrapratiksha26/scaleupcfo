import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import CalBookingButton from "./DemoBookingButton";
import logo from "../assets/ScaleupCFO_transparent.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesTimeout = useRef(null);

  return (
    <nav>
      {/* Announcement strip — full-bleed inside the fixed navbar */}
      <Link
        to="/ai-native-services"
        style={{
          display: "block",
          background: "linear-gradient(90deg, #0F766E 0%, #0D5F58 100%)",
          color: "#fff",
          textAlign: "center",
          fontSize: "13px",
          fontWeight: 600,
          padding: "8px 16px",
          textDecoration: "none",
          letterSpacing: "0.01em",
          margin: "-0.75rem -1.5rem 0.75rem -1.5rem",
        }}
      >
        ✨ We're now live with AI-native services — see what's new →
      </Link>

      <div className="nav-inner">
        {/* LEFT SIDE */}
        <div className="nav-left">
          {/* Hamburger (mobile only) */}
          <button
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>

          {/* Logo */}


<div className="logo">
  <Link to="/" className="flex items-center gap-2 bg-primary rounded-lg px-2 py-1">
    <img src={logo} alt="ScaleupCFO logo" className="h-8 w-8" />
    <span className="font-bold text-white">ScaleupCFO AI</span>
  </Link>
</div>

          {/* Desktop Navigation */}
          <ul className="nav-links-desktop">
            <li>
              <HashLink smooth to="/#products">Products</HashLink>
            </li>
            <li>
              <Link to="/ai-native-services">Services</Link>
            </li>
            <li>
              <HashLink smooth to="/#comparison">Why Us</HashLink>
            </li>
            <li
              style={{ position: "relative" }}
              onMouseEnter={() => {
                clearTimeout(resourcesTimeout.current);
                setResourcesOpen(true);
              }}
              onMouseLeave={() => {
                resourcesTimeout.current = setTimeout(() => setResourcesOpen(false), 150);
              }}
            >
              <span style={{ cursor: "pointer", color: "var(--text-dark)", fontSize: "0.9rem", fontWeight: 500, transition: "all 0.25s ease" }}>Resources ▾</span>
              {resourcesOpen && (
                <ul style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "var(--bg-white)",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 10px 30px rgba(10,15,28,0.1)",
                  borderRadius: "8px",
                  padding: "8px 0",
                  minWidth: "160px",
                  zIndex: 1000,
                  listStyle: "none",
                  margin: 0,
                }}>
                  <li style={{ padding: "8px 16px" }}>
                    <Link to="/resources" onClick={() => setResourcesOpen(false)}>
                      Resources for CA Firms
                    </Link>
                  </li>
                  <li style={{ padding: "8px 16px" }}>
                    <Link to="/blogs" onClick={() => setResourcesOpen(false)}>
                      Blogs for Founders
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE CTA (desktop only) */}
        <div className="nav-ctas">
          <CalBookingButton
            title="Schedule Demo"
            module_name="Navbar scheduleDemo"
            className="btn-primary-nav"
          />
        </div>
      </div>

      {/* MOBILE SLIDE MENU (LEFT) */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <ul className="nav-links-mobile">
          <li>
            <HashLink smooth to="/#products" onClick={() => setIsOpen(false)}>
              Products
            </HashLink>
          </li>
          <li>
            <Link to="/ai-native-services" onClick={() => setIsOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <HashLink smooth to="/#comparison" onClick={() => setIsOpen(false)}>
              Why Us
            </HashLink>
          </li>
          <li>
            <span
              style={{ cursor: "pointer", color: "var(--text-dark)", fontSize: "1rem", fontWeight: 500 }}
              onClick={() => setResourcesOpen(!resourcesOpen)}
            >
              Resources ▾
            </span>
            {resourcesOpen && (
              <ul style={{ paddingLeft: "16px", listStyle: "none", margin: "4px 0 0 0" }}>
                <li style={{ padding: "6px 0" }}>
                  <Link to="/resources" onClick={() => { setIsOpen(false); setResourcesOpen(false); }}>
                    Resources for CA Firms
                  </Link>
                </li>
                <li style={{ padding: "6px 0" }}>
                  <Link to="/blogs" onClick={() => { setIsOpen(false); setResourcesOpen(false); }}>
                    Blogs for Founders
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
          </li>
        </ul>

        <div className="mt-6 md:hidden">
  <CalBookingButton
    title="Schedule Demo"
    module_name="Navbar scheduleDemo mobile"
    onClick={() => setIsOpen(false)}
    className="
      w-full
      rounded-xl
      bg-primary
      py-4
      text-center
      font-semibold
      text-primary-foreground
      hover:brightness-110
      transition
    "
  />
</div>

      </div>
    </nav>
  );
}
