// src/pages/Signup.jsx
import React, { useState } from "react";
import { useUser } from "../context/UserState.jsx";
import { useAlert } from "../context/AlertState.jsx";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { showAlert } = useAlert();
  const { registerUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialUserState = {
    username: "",
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  };
  const [newUser, setNewUser] = useState(initialUserState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (newUser.password !== newUser.confirmPassword) {
      return showAlert("Passwords do not match.", "danger");
    }

    // Validate avatar file size(max size 5MB) and image type check
    console.log("newuser...",newUser.avatar)
    if (newUser.avatar) {
      if (newUser.avatar.size > 8 * 1024 * 1024) {
        return showAlert("Avatar size should be less than 5MB.", "danger");
      }
      if (!["image/jpeg", "image/png", "image/gif"].includes(newUser.avatar.type)) {
        return showAlert("Invalid avatar file type. Use JPEG, PNG, or GIF.","danger");
      }
    }

    setIsLoading(true);

    const response = await registerUser(newUser);
    console.log(response, "is response");

    if (response && response.success) {
      navigate("/verify");
      showAlert(`Welcome! ${response.data.fullname} `, "success");
    } else {
      showAlert(response.message, "danger");
    }

    setIsLoading(false);
    if (response && response.success)  setNewUser(initialUserState)
    
  };

  return (
    <div className="h-auto bg-[rgb(var(--custom-color1))] flex items-center justify-center mb-16">
      <div className="card  w-full max-w-lg shadow-xl bg-[rgb(var(--custom-color2))] opacity-75">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold leading-tight text-primary">
            Sign Up to Create Account
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Fullname Field */}
            <div className="form-control mb-4">
              <label htmlFor="fullname" className="label">
                <span className="label-text ">
                  Full Name<span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={newUser.fullname}
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setNewUser({ ...newUser, fullname: e.target.value })
                }
                required
              />
            </div>

            {/* Username Field */}
            <div className="form-control mb-4">
              <label htmlFor="username" className="label">
                <span className="label-text text-base">
                  Username<span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={newUser.username}
                placeholder="Enter username"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                required
              />
            </div>

            {/* Email Field */}
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
                value={newUser.email}
                placeholder="Enter email"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
            </div>

            {/* Avatar Field */}
            <div className="form-control mb-4">
              <label htmlFor="avatar" className="label">
                <span className="label-text">
                  Profile Picture<span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                className="input input-bordered w-full p-2"
                onChange={(e) =>
                  setNewUser({ ...newUser, avatar: e.target.files[0] })
                }
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
                value={newUser.password}
                placeholder="Enter password"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
                minLength={5}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="form-control mb-6">
              <label htmlFor="confirmPassword" className="label ">
                <span className="w-full text-base">
                  Confirm Password<span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={newUser.confirmPassword}
                placeholder="Confirm password"
                className="input input-bordered w-full text-base"
                onChange={(e) =>
                  setNewUser({ ...newUser, confirmPassword: e.target.value })
                }
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
                  Create Account
                </button>
              )}
            </div>
          </form>

          <p className="mt-2 text-center text-base text-white/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
