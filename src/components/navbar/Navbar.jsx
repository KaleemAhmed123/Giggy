import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const downMenuItems = [
    "Graphics & Design",
    "Video & Animation",
    "Writing & Translation",
    "AI Services",
    "Digital Marketing",
    "Music & Audio",
    "Programming & Tech",
    "Business",
    "Lifestyle",
  ];
  const [active, setActive] = useState(false); // for scroll evemt false on start
  const [open, setOpen] = useState(false); // for profile menu

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // const currentUser = null

  const currentUser = {
    id: 1,
    username: "Shaam",
    isSeller: true,
  };

  return (
    <div className={`navbar ${active || pathname !== "/" ? "active" : ""}`}>
      <div className="container">
        {/* left logo */}
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">liverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        {/* right links */}
        <div className="links">
          <span>Liverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {/* if not logged in show signin and join button else pic and name */}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="user-profile"
              />
              <span>{currentUser?.username}</span>
              {/* open absolute profile menu- if seller then only Gigs and Add Gigs */}
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" to="/">
                    Logout
                  </Link>
                </div>
                // end menu end
              )}
            </div>
          ) : (
            <>
              <span>Sign in</span>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
        {/* links end */}
      </div>
      {/* container end */}
      {(active || pathname !== "/") && (
        <>
          <hr />
          {/*  */}
          <div className="menu">
            {downMenuItems.map((item, i) => {
              return (
                <Link key={i} className="link" to="/">
                  {item}
                </Link>
              );
            })}
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
