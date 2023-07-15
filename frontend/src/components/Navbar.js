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
    let res = await utils.checkLogin();
    setLoggedIn(res[0]);
  };

  const handleLogoutButtonPressed = async () => {
    const utils = new Utils();
    let res = await utils.logout();
    if (res[0]) {
      setLoggedIn(false);
      navigator("/");
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <nav className="px-4 py-2 flex items-center justify-between">
      <div className="text-white font-bold text-2xl">
        Collaborative Jamboard
      </div>
      <div className="space-x-4">
        {loggedIn ? (
          <div className="">
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