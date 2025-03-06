import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserState.jsx";
import { useAlert } from "../context/AlertState.jsx";

function Login() {
  const { showAlert } = useAlert();
  const { loginUser, getEmailForResetPassword } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await loginUser(user);

    if (response && response.success) {
      if (response.data.isVerified) {
        navigate("/");
        showAlert(`Welcome back! ${response.data.username}`, "info");
      } else {
        navigate("/verify");
      }
    } else {
      navigate("/login");
      showAlert(response.message, "danger");
    }

    setIsLoading(false);
    setUser({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    navigate("/password-reset");
  };

  useEffect(() => {
    async function onloading() {
      try {
        const response = await getEmailForResetPassword();
        // console.log("fetching email for reseting password.", response);
        if (response && response.success) navigate("/password-reset");
      } catch (error) {
        console.error("Error in onLoading:", error);
      }
    }
    onloading();
  }, [navigate]);

  return (
    // <div className="h-auto bg-base-300 flex items-center justify-center mb-16">
    <div className="h-auto bg-[rgb(var(--custom-color1))] flex items-center justify-center mb-16">
      <div className="card w-full max-w-lg shadow-xl bg-base-300 opacity-75">
        {/* <div className="card w-full max-w-lg shadow-xl bg-[rgb(var(--custom-color1))] opacity-75"> */}
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold leading-tight text-primary">
            Sign In to your Account
          </h2>

          <form onSubmit={handleSubmit}>
            {/* email Field */}
            <div className="form-control mb-4">
              <label htmlFor="email" className="label">
                <span className="label-text">
                  Email address<span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                placeholder="Enter email"
                className="input input-bordered w-full"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control mb-4">
              <label htmlFor="password" className="label">
                <span className="label-text">
                  Password<span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                placeholder="Enter password"
                className="input input-bordered w-full"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                minLength={5}
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              {isLoading ? (
                <button
                  type="submit"
                  className="btn btn-primary w-full text-base"
                  disabled
                >
                  <span className="loading loading-dots loading-md"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary w-full text-base"
                >
                  Sign Up
                </button>
              )}
            </div>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <button
              onClick={handleForgetPassword}
              className="text-sm font-medium text-primary transition-all duration-200 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <p className="mt-2 text-center text-base text-white/60">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
