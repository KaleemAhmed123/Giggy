import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/axiosUtil";

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
  const [active, setActive] = useState(false); // for scroll event, false on start
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

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // This will delete the cookie
      await newRequest.post("/auth/logout");
      // And we'll delete from local storage
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleExploreClick = () => {
    // Programmatically navigate to the "/gigs" route when "Explore" is clicked
    navigate("/gigs");
  };

  return (
    <div className={`navbar ${active || pathname !== "/" ? "active" : ""}`}>
      <div className="container">
        {/* left logo */}
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Giggy</span>
          </Link>
          <span className="dot">.</span>
        </div>
        {/* right links */}
        <div className="links">
          <span>Giggy Business</span>
          <span onClick={handleExploreClick}>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {/* if not logged in show signin and join button else pic and name */}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={currentUser.img || "/img/noavatar.jpg"}
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
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link className="link" to="/login">
                <button>Sign In</button>
              </Link>
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
