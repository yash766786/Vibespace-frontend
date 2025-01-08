// src/pages/Setting.jsx
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserState";
import UserDetails from "../components/Container/UserDetails";
import AvatarDetails from "../components/Container/AvatarDetails";
import PasswordDetails from "../components/Container/PasswordDetails";

const Settings = () => {
  const { getCurrentUser } = useUser();
  
  const [user, setUser] = useState({});
  const [accountDetails, setAccountDetails] = useState({
    username: "",
    fullname: "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
        setAccountDetails({
          username: response.data.username,
          fullname: response.data.fullname,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <>
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      {/* Update Account Details Form */}
      <UserDetails 
        accountDetails={accountDetails}
        setAccountDetails={setAccountDetails}
      />

      {/* Update Avatar Form */}
      <AvatarDetails 
        user={user}
        setUser={setUser}
      />

      {/* Change Password Form */}
      <PasswordDetails />
    </div>
    {/* <Footer /> */}
    </>
  );
};

export default Settings;
