import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { CHECK_AUTH_URL } from "../constants";
import Utils from "../utils";

const Navbar = () => {
  const navigator = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignUpButtonPressed = () => {
    navigator("/register");
  };

  const handleLoginButtonPressed = () => {
    navigator("/login");
  };

  const checkLoggedIn = async () => {
    const utils = new Utils();
    utils.checkLogin().then((res) => {
      setLoggedIn(res[0]);
    });
  };

  const handleLogoutButtonPressed = async () => {
    localStorage.removeItem("token");

    setLoggedIn(false);
    navigator("/");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <nav className="px-4 py-2 flex items-center justify-between">
      <div
        className=" font-bold text-2xl"
        onClick={() => {
          navigator("/");
        }}
      >
        Collaborative Jamboard
      </div>

      <div className="space-x-4">
        {loggedIn ? (
          <div className="">
            <button
              onClick={() => {
                navigator("/");
              }}
              className="btn btn-outline mx-3 text-orange-400"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigator("/about");
              }}
              className="btn btn-outline mx-3 text-orange-400"
            >
              About
            </button>

            <button
              onClick={handleLogoutButtonPressed}
              className="btn btn-outline mx-3 text-orange-400"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="">
            <button
              onClick={() => {
                navigator("/");
              }}
              className="btn btn-outline mx-3 text-orange-400"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigator("/about");
              }}
              className="btn btn-outline mx-3 text-orange-400"
            >
              About
            </button>

            <button
              onClick={handleSignUpButtonPressed}
              className="btn btn-outline mx-3 text-orange-400"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginButtonPressed}
              className="btn btn-outline mx-3 text-orange-400"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
