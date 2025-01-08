import React, {useState} from "react";
import { useAlert } from "../../context/AlertState";
import { useUser } from "../../context/UserState";

function AvatarDetails({ user, setUser }) {

  const {  updateUserAvatar } = useUser();

  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();

    if (!avatar) {
      showAlert("Please select an avatar to upload.", "danger");
      return;
    } else {
      if (avatar.size > 8 * 1024 * 1024) {
        return showAlert("Avatar size should be less than 5MB.", "danger");
      }
      if (!["image/jpeg", "image/png", "image/gif"].includes(avatar.type)) {
        return showAlert("Invalid avatar file type. Use JPEG, PNG, or GIF.","danger");
      }
    }

    setIsLoading(true);
    const response = await updateUserAvatar(avatar);
    console.log("Avatar updation..", response);
    if(response.success) showAlert(response.message, "success");
    else showAlert(response.message, "danger");
    setUser(response.data);
    setIsLoading(false);
    setAvatar(null);
  };
  return (
    <div className="bg-[rgb(var(--custom-color2))] opacity-75 p-2 rounded-xl mb-3">
      <form onSubmit={handleUpdateAvatar} className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Update Avatar</h3>

        {/* current avatar */}
        <div className="mb-4">
          <label className="block mb-1">Current Avatar</label>
          <img
            src={user.avatar}
            alt="Current Avatar"
            className="w-24 h-24 rounded-full"
          />
        </div>

        {/* Avatar field */}
        <div className="mb-4">
          <label className="block mb-1">New Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="file-input w-full"
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
              Update Avatar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AvatarDetails;
