import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertState.jsx";
import { useUser } from "../context/UserState.jsx";

function Verify() {
  const navigate = useNavigate();
  const { verifyEmail } = useUser();
  const { showAlert } = useAlert();

  const [otp, setOtp] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      return showAlert("Please enter a valid 6-digit numeric OTP.", "danger");
    }

    setIsLoading(true);
    const response = await verifyEmail(otp);
    console.log("response..", response);

    if (response && response.success) {
      navigate("/");
      showAlert(`Welcome, ${response.data.fullname}! \n${response.message}`, "success");
    } else if(response && !response.success && response.statusCode===409){
      navigate("/");
      showAlert(response.message, "warning");
    } else{
      showAlert(response.message, "danger");
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[rgb(var(--custom-color1))]">
      <div className="card w-full max-w-md shadow-lg bg-[rgb(var(--custom-color2))] p-8">
        <h2 className="text-center text-2xl font-bold text-primary mb-4">
          Verify Your Email
        </h2>
        <p className="text-center text-base text-white/60 mb-6">
          Please enter the 6-digit OTP sent to your registered email address.
        </p>

        <form onSubmit={handleOtpSubmit} className="flex flex-col items-center">

          {/* OTP Input Field */}
          <div className="form-control mb-4">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input input-bordered w-full max-w-xs text-center text-lg mb-6"
              placeholder="Enter OTP"
              required
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
                Verify OTP
              </button>
            )}
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-white/60">
          Didn’t receive the OTP?&nbsp;
          <button
            onClick={() =>
              showAlert("Resend OTP functionality not implemented yet.", "info")
            }
            className="text-primary font-medium hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}

export default Verify;
