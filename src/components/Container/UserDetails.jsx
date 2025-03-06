import React, { useState } from "react";
import { useAlert } from "../../context/AlertState";
import { useUser } from "../../context/UserState";

function UserDetails({accountDetails, setAccountDetails}) {
  const { updateAccountDetails } = useUser();

  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  // const [accountDetails, setAccountDetails] = useState({
  //   username: "",
  //   fullname: "",
  // });

  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await updateAccountDetails(accountDetails);
    // console.log("Account details updation..", response);
    if(response.success) showAlert(response.message, "success");
    else showAlert(response.message, "danger");
    setIsLoading(false);
    
  };
  return (
    <div className="bg-[rgb(var(--custom-color2))] opacity-75 p-2 rounded-xl mb-3">
      <form onSubmit={handleUpdateAccount} className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Update Account Details</h3>

        {/* username field */}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={accountDetails.username}
            onChange={(e) => setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* fullname field */}
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={accountDetails.fullname}
            onChange={(e) => setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* email field */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={accountDetails.email}
            onChange={(e) => setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })}
            className="input input-bordered w-full"
            required
            disabled={true}
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
              Update Account
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
