// Pofile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserState";
import { usePost } from "../context/PostState";
import { useFollow } from "../context/FollowState";
import { PostItem } from "../components/index.js";
import ModalForFollowers from "../components/Container/ModalForFollowers.jsx";
import ModalForFollowings from "../components/Container/ModalForFollowings";

const Profile = () => {
  const { username } = useParams();
  const { getPostByUsername } = usePost();
  const { getUserProfile, user } = useUser();
  const { toggleFollowUser, getFollowers, getFollowings } = useFollow();

  const [userProfile, setUserProfile] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPost, setLoadingPost] = useState(true);
  const [page, setPage] = useState(1);

  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(username);
        if (response && response.success) {
          setUserProfile(response.data);
          setLoadingProfile(false);
        }

        const getPost = await getPostByUsername(username);
        if (getPost && getPost.success) {
          setUserPost(getPost.data);
          setLoadingPost(false);
        }
        // console.log("userprofile", { response, getPost });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  const handleToggleFollow = async () => {
    const response = await toggleFollowUser(username);
    if (response && response.success) {
      const refreshedData = await getUserProfile(username);
      if (refreshedData && refreshedData.success) {
        setUserProfile(refreshedData.data);
      }
    }
  };

  const handleShowFollowers = async () => {
    try {
      const response = await getFollowers(username);
      setUserFollowers(response.data);
      setShowFollowerModal(true);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleShowFollowings = async () => {
    try {
      const response = await getFollowings(username);
      setUserFollowings(response.data); // Fix here
      setShowFollowingModal(true);
    } catch (error) {
      // console.log(error);
    }
  };

  const closeFollowerModal = () => setShowFollowerModal(false);
  const closeFollowingModal = () => setShowFollowingModal(false);

  if (loadingProfile)
    return (
      <>
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex flex-row items-center justify-around"></div>
          <div className="flex w-52 flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 justify-center mt-4">
          <div className="flex w-full flex-col gap-4 md:w-1/2 lg:w-1/3">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-full flex-col gap-4 md:w-1/2 lg:w-1/3">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      </>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-row items-center justify-around">
        {/* Avatar */}
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 sm:w-36">
            <img src={userProfile?.avatar} alt="User Avatar" />
          </div>
        </div>

        {/* User Info */}
        <div className="details">
          <h2 className="text-2xl font-bold mt-4 sm:text-3xl">
            {userProfile?.fullname}
          </h2>
          <p className="text-gray-500">@{userProfile?.username}</p>

          {/* Followers and Following */}
          <div className="flex space-x-4 mt-4 gap-2">
            <div className="text-center">
              <span className="text-lg font-bold">{userPost?.length}</span>
              {/* working */}
              <p className="text-gray-500">Posts</p>
            </div>
            <div
              className="text-center cursor-pointer"
              onClick={handleShowFollowers}
            >
              <span className="text-lg font-bold">
                {userProfile.followerCount}
              </span>
              <p className="text-gray-500">Followers</p>
            </div>
            <div
              className="text-center cursor-pointer"
              onClick={handleShowFollowings}
            >
              <span className="text-lg font-bold">
                {userProfile.followingCount}
              </span>
              <p className="text-gray-500">Following</p>
            </div>
          </div>

          <ModalForFollowers
            isOpen={showFollowerModal}
            userFollowers={userFollowers}
            onClose={closeFollowerModal}
          />

          <ModalForFollowings
            isOpen={showFollowingModal}
            userFollowings={userFollowings}
            onClose={closeFollowingModal}
          />

          {/* follow button */}
          {userProfile?.username == user?.username ? (
            <div className="mt-4  space-x-4 hidden"></div>
          ) : (
            <div className="mt-4 ml-3 flex  space-x-4">
              {userProfile?.isFollowed == false ? (
                <button
                  className="btn w-48 btn-outline btn-primary"
                  onClick={handleToggleFollow}
                >
                  follow
                </button>
              ) : (
                <button
                  className="btn w-48 btn-outline btn-neutral"
                  onClick={handleToggleFollow}
                >
                  unfollow
                </button>
              )}
            </div>
          )}
        </div>
      </div>


      {/* User's Posts */}
      <div className=" mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {userPost &&
          userPost.map((post) => <PostItem key={post._id} post={post} />)}
      </div>

      {/* skeleton for post */}
      {loadingPost && (
        <div className="flex flex-wrap gap-8 justify-center mt-4">
        <div className="flex w-full flex-col gap-4 md:w-1/2 lg:w-1/3">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-full flex-col gap-4 md:w-1/2 lg:w-1/3">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Profile;
