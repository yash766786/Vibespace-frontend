// App.jsx
import { useEffect, useState } from "react";
import { Navbar, Footer, AlertBox } from "./index.js";
import { Outlet, useNavigate } from "react-router";
import { useUser } from "./context/UserState.jsx";
import { Link } from "react-router-dom";

import { LuAlignJustify } from "react-icons/lu";

function App() {
  const { getCurrentUser } = useUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function onloading() {
      try {
        const response = await getCurrentUser();
        console.log("fetching user detail..", response)
        if (!response)  navigate("/login");
        else if(!response.success) navigate("/login");
        else if(!response.data.isVerified) navigate("/verify")
        
      } catch (error) {
        console.error("Error in onLoading:", error);
        navigate("/login");
      }
    }

    onloading();
  }, [navigate]);

  return (
    <>
      <div className="app-container bg-[rgb(var(--custom-color1))]">
        {/* Hamburger Icon for Mobile */}
        <div className="navbar bg-black lg:hidden relative">
          <div className="navbar-start">
            <button
              className="btn btn-ghost text-2xl text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <LuAlignJustify />
            </button>

            <Link to="/" className="btn btn-ghost text-xl">
              {/* <img src="./assets/Vibespace.svg" alt="" /> */}
              {/* <img className="w-6" src="./favicon.ico" alt="favicon" /> */}
              VibeSpace
            </Link>
          </div>
        </div>

        <div className="flex">
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex-grow lg:ml-56">
            <AlertBox />
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
