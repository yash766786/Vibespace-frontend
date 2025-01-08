import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserState";
import { useAlert } from "../../context/AlertState";

import { RxCross2 } from "react-icons/rx";
import { ImSearch } from "react-icons/im";
import { FcHome } from "react-icons/fc";
import { MdAddPhotoAlternate } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { SlNotebook } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { IoBook } from "react-icons/io5";

function Navbar({ isOpen, setIsOpen }) {
  const { showAlert } = useAlert();
  const { logoutUser, user, checkUsernameExist } = useUser();
  const navigate = useNavigate();

  const [searchUsername, setSearchUsername] = useState("");

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.success) {
      navigate("/login");
      showAlert(response.message, "success");
    } else {
      showAlert(response.message, "danger");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchUsername.trim()) {
      const response = await checkUsernameExist(searchUsername);
      if (response.success) {
        navigate(`/u/${searchUsername}`);
        setSearchUsername("");
      } else {
        showAlert(response.message, "warning");
      }
    } else {
      showAlert("Please enter a username", "warning");
    }
  };

  return (
    <div className="relative right-0 z-10 ">
      
      {/* Slide-in Navbar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full bg-[rgb(var(--custom-color1))] transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden border-r-white border-r-[1px]`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost text-xl">
              {/* <img className="w-6" src="./favicon.ico" alt="favicon" /> */}
              VibeSpace
            </Link>
          </div>
          <div className="navbar-end">
            <button
              className="btn btn-ghost text-2xl text-white"
              onClick={() => setIsOpen(false)}
            >
              <RxCross2 />
            </button>
          </div>
        </div>

        {/* Search Input */}
        {user && user.isVerified && (
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full p-0"
          >
            <input
              type="text"
              placeholder="Search by username"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              className="flex-grow px-4 py-2 focus:outline-none"
              style={{
                border: "none",
                borderRadius: "0",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary text-lg"
              style={{
                borderRadius: "0",
                height: "100%",
                padding: "0 1rem 0 0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* 🔍 */}
              <ImSearch />
            </button>
          </form>
        )}

        <ul className="menu p-4 text-white text-lg">
          {user && user.isVerified && (
            <>
              <li>
                <Link to="/">
                  <FcHome />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create-post">
                  <MdAddPhotoAlternate />
                  Create Post
                </Link>
              </li>
              <li>
                <Link to="/create-note">
                  <AiOutlineFileAdd />
                  Create Note
                </Link>
              </li>
              <li>
                <Link to="/notes">
                  <SlNotebook />
                  Notes
                </Link>
              </li>
              <li>
                <Link to={`/u/${user.username}`}>
                  <CgProfile />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/setting">
                  <IoSettingsOutline />
                  Settings
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/about">
              <IoBook />
              About
            </Link>
          </li>
        </ul>

        <div className="mt-5 ml-6">
          {!user ? (
            <div className="flex flex-col mr-5">
              <Link className="btn mb-1" to="/signup">
                Sign UP
              </Link>
              <Link className="btn" to="/login">
                Sign In
              </Link>
            </div>
          ) : (
            <button className="btn" onClick={handleLogout}>
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Navbar for larger screens */}
      <div className="fixed top-0 left-0 w-64 h-full bg-[rgb(var(--custom-color1))] opacity-75 border-r-2 border-r-gray-400 shadow-lg hidden lg:block">
        <div className="flex items-center justify-center h-16">
          <Link to="/" className="text-2xl font-bold text-white flex">
            {/* <img className="w-8" src="./favicon.ico" alt="favicon" /> */}
            <span className="ml-2">VibeSpace</span>
          </Link>
        </div>

        {/* Search Input */}
        {user && (
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full p-0"
          >
            <input
              type="text"
              placeholder="Search by username"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              className="flex-grow px-4 py-2 focus:outline-none"
              style={{
                border: "none",
                borderRadius: "0",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary text-lg"
              style={{
                borderRadius: "0",
                height: "100%",
                padding: "0 1rem 0 0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* 🔍 */}
              <ImSearch />
            </button>
          </form>
        )}

        <ul className="menu p-4 text-white text-lg">
          {user && (
            <>
              <li>
                <Link to="/">
                  <FcHome />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create-post">
                  <MdAddPhotoAlternate />
                  Create Post
                </Link>
              </li>
              <li>
                <Link to="/create-note">
                  <AiOutlineFileAdd />
                  Create Note
                </Link>
              </li>
              <li>
                <Link to="/notes">
                  <SlNotebook />
                  Notes
                </Link>
              </li>
              <li>
                <Link to={`/u/${user.username}`}>
                  <CgProfile />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/setting">
                  <IoSettingsOutline />
                  Settings
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/about">
              <IoBook />
              About
            </Link>
          </li>
        </ul>
        <div className="mt-5 ml-6">
          {!user ? (
            <div className="flex flex-col mr-4">
              <Link className="btn mb-1" to="/signup">
                Sign UP
              </Link>
              <Link className="btn" to="/login">
                Sign In
              </Link>
            </div>
          ) : (
            <button className="btn" onClick={handleLogout}>
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
