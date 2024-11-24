import React from "react";
import "./nav.css";
import "../461954a9-580c-4bb5-91b1-0b13e1107d69.webp";
import "../logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CreateAuth } from "../context/Authcontext";
import toast from "react-hot-toast";
const Navbar = ({ name, count }) => {
  const [auth, setAuth] = CreateAuth();
  const logOut = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("logout success");
  };
  return (
    <>
      <nav>
        <div className="nav-left">
          <div className="site-logo">
            <Link to="/">
              <img src={require("../logo.jpg")} alt="logo here" />
            </Link>
          </div>

          <ul>
            <li>
              {!auth.user ? (
                <>
                  {" "}
                  <Link to="/Login">
                    <button className="long-btn">Login</button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/Login">
                    <button className="long-btn" onClick={logOut}>
                      Logout
                    </button>
                  </Link>
                </>
              )}
            </li>
            {/* <li>
              <Link to="/Register">
                <button className="long-btn">Register</button>
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="nav-right">
          <div className="logos">
            <ul>
              <li>
                <Link to={"Dashboard/Orders"}>
                  <button className="short-btn">
                    <FontAwesomeIcon icon={faCartShopping} />
                    {count}
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/Liked">
                  <button className="short-btn">
                    <FontAwesomeIcon icon={faHeart} />
                    {count}
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  to={`Dashboard/${
                    auth?.user?.role === 1 ? "admin" : "Profile"
                  }`}
                >
                  <button className="short-btn">
                    <FontAwesomeIcon icon={faCircleUser} />
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          {auth.user && (
            <div className="username">
              <h1>Welcome,</h1>
              <h2>{auth.user.name}</h2>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
