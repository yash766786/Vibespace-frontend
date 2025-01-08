import React, { useState } from "react";
import { useAlert } from "../../context/AlertState";
import { useUser } from "../../context/UserState";

function PasswordDetails() {
  const { changeCurrentPassword } = useUser();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const handleChangePassword = async (e) => {
      e.preventDefault();
       console.log("changing password..", passwordDetails)
  
      // Validate password match
      if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
        console.log("Passwords do not match.")
        return showAlert("Passwords do not match.", "danger");
      }
  
      console.log("password matched")
      setIsLoading(true);
      const response = await changeCurrentPassword(passwordDetails);
      console.log("password updation..", response);
      if(response.success) showAlert(response.message, "success");
      else showAlert(response.message, "danger");
  
      setIsLoading(false);
      setPasswordDetails({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
    };

  return (
    <div className="bg-[rgb(var(--custom-color2))] opacity-75 p-2 rounded-xl mb-3">
      <form onSubmit={handleChangePassword}>
        <h3 className="text-xl font-semibold mb-2">Change Password</h3>

         {/* old Password Field */}
        <div className="mb-4">
          <label className="block mb-1">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordDetails.oldPassword}
            onChange={(e) => setPasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value })}
            className="input input-bordered w-full"
            required
            minLength={5}
          />
        </div>

        {/* new Password Field */}
        <div className="mb-4">
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordDetails.newPassword}
            onChange={(e) => setPasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value })}
            className="input input-bordered w-full"
            required
            minLength={5}
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label  className="block mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordDetails.confirmPassword}
            onChange={(e) => setPasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value })}
            className="input input-bordered w-full"
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
              Change Password
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PasswordDetails;
