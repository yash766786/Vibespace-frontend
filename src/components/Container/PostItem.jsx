// PostItem.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertState";
import { usePost } from "../../context/PostState";
import { useUser } from "../../context/UserState";
import { useLike } from "../../context/LikeState";
import { useComment } from "../../context/CommentState";
import { timeAgo } from "../../utils/timeAgo";
import { useColor } from "color-thief-react";

import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { ModalForPost, ModalForComments, ModalForLikes } from "../index.js";

const PostItem = ({ post }) => {
  const {
    _id,
    postFile,
    description,
    likeCount,
    commentCount,
    isLikedByCurrentUser,
    owner,
    createdAt,
  } = post;

  const navigate = useNavigate();
  const { user } = useUser();
  const { showAlert } = useAlert();
  const { updatePost, deletePost } = usePost();
  const { togglePostLike, getPostLikes } = useLike();
  const { getPostComments, addComment } = useComment();

  const [likes, setLikes] = useState([]); // State for likes data
  const [isLikedByUser, setIsLikedByUser] = useState(isLikedByCurrentUser);
  const [currentTotalLikeCount, setCurrentTotalLikeCount] = useState(likeCount);
  
  const [comments, setComments] = useState([]); // State for comments data
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [currentTotalCommentCount, setCurrentTotalCommentCount] = useState(commentCount)
  
  const [currentDescription, setCurrentDescription] = useState(description)
  const [newDescription, setNewDescription] = useState(description);
  
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false); // State for like model
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false); // State for comment modal


  const handleUpdatePost = async () => {
    try {
      const response = await updatePost(_id, newDescription);
      if (response.success) {
        showAlert(response.message, "info");
        setNewDescription(response.data.description);
        setCurrentDescription(response.data.description);
        setIsPostModalOpen(false);
      }
    } catch (error) {
      // console.log("Error updating post:", error);
      showAlert("Failed to update post", "error");
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await deletePost(_id);
      if (response.success) {
        showAlert("Post deleted successfully", "info");
        setIsPostModalOpen(false);
        // Optionally remove the post from the UI if needed
      }
    } catch (error) {
      // console.log("Error deleting post:", error);
      showAlert("Failed to delete post", "error");
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await addComment(_id, commentContent);
      if (response.success) {
        showAlert(response.message, "info");
        setCommentContent(""); 
        setCurrentTotalCommentCount(currentTotalCommentCount+1)
        setShowComments(false);
        await getPostComments(_id);
      }
    } catch (error) {
      // console.log("Error adding comment:", error);
    }
  };

  const handleToggleLikePost = async () => {
    try {
      isLikedByUser ? setCurrentTotalLikeCount(currentTotalLikeCount - 1) : setCurrentTotalLikeCount(currentTotalLikeCount + 1);
      setIsLikedByUser(!isLikedByUser);

      const response = await togglePostLike(_id);
      if (!response.success) {
        showAlert(response.message, "danger");
        isLikedByUser ? setCurrentTotalLikeCount(currentTotalLikeCount - 1) : setCurrentTotalLikeCount(currentTotalLikeCount + 1);
        setIsLikedByUser(!isLikedByUser);
      }
      else{
        isLikedByUser ? showAlert(response.message, "warning") : showAlert(response.message, "info");
        setIsLikedByUser(!isLikedByUser);
      }
      // console.log(response);
    } catch (error) {
      // console.log("Error toggling like:", error);
    }
  };

  const handleOpenLikesModal = async () => {
    try {
      const response = await getPostLikes(_id); // Fetch likes data from API
      if (response.success) {
        setLikes(response.data); // Store likes data
        setIsLikesModalOpen(true); // Open likes modal
      } else {
        showAlert(response.message, "danger");
      }
    } catch (error) {
      // console.log("Error fetching likes:", error);
    }
  };

  const handleOpenCommentsModal = async () => {
    try {
      const response = await getPostComments(_id); // Fetch comments from API
      if (response.success) {
        setComments(response.data.comments); // Store comments data
        setIsCommentsModalOpen(true); // Open comments modal
      } else {
        showAlert(response.message, "danger");
      }
    } catch (error) {
      // console.log("Error fetching comments:", error);
    }
  };

  const handleAnyCommentDeleted = async () => handleOpenCommentsModal();
  const handleProfileNavigation = (username) => navigate(`/u/${username}`);
  const { data: dominantColor } = useColor(postFile, "hex", {crossOrigin: "anonymous"});

  return (
    <div className="card shadow-md hover:shadow-lg transition-all p-4 rounded-lg h-auto border border-gray-900 bg-[rgb(var(--custom-color3))] max-w-[430px] md:max-w-none">
      {/* Likes Modal */}
      <ModalForLikes
        isOpen={isLikesModalOpen}
        onClose={() => setIsLikesModalOpen(false)}
        likes={likes}
        timeAgo={timeAgo}
      />

      {/* Comments Modal */}
      <ModalForComments
        isOpen={isCommentsModalOpen}
        onClose={() => setIsCommentsModalOpen(false)}
        comments={comments}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        handleAddComment={handleAddComment}
        onDelete={handleAnyCommentDeleted}
      />

      {/* Post Modal */}
      <ModalForPost
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSave={handleUpdatePost}
        onDelete={handleDeletePost}
        description={newDescription}
        setDescription={setNewDescription}
      />

      {/* Owner Information */}
      <div className="flex items-center gap-2  mb-4">
        <img
          src={owner.avatar}
          alt={`${owner.username}'s avatar`}
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => handleProfileNavigation(owner.username)}
        />
        <div>
          <p
            className="text-sm font-semibold text-gray-200 cursor-pointer"
            onClick={() => handleProfileNavigation(owner.username)}
          >
            {owner.fullname}
          </p>
          {/* Display time ago */}
          <p className="text-sm text-gray-400">{timeAgo(createdAt)}</p>{" "}
        </div>

        {/* If the current user is the post owner */}
        {user && user.username === owner.username && (
          <div className="flex gap-2 ml-auto">
            {/* Edit icon to open ModalForPost */}
            <BiEdit
              className="text-gray-200 cursor-pointer"
              onClick={() => {
                // console.log("Opening modal");
                setIsPostModalOpen(true);
              }}
            />
          </div>
        )}
      </div>

      {/* Post Content */}
      <img
        src={postFile}
        alt="Post"
        className="rounded-md max-w-[600px] w-full max-h-[50vh] md:max-h-[80vh] h-auto object-fill my-2 image-shadow"
        style={{
          boxShadow: `0px 4px 15px ${dominantColor || "rgba(0, 0, 0, 0.3)"}`, // Fallback shadow color
        }}
        onDoubleClick={handleToggleLikePost}
      />
      <p className="text-gray-300 mb-2">
        <span
          className="text-sm font-semibold text-gray-200 cursor-pointer"
          onClick={() => handleProfileNavigation(owner.username)}
        >{owner.username}</span>&nbsp;{currentDescription}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="ml-2 flex flex-col justify-center items-center">
            <div className="tooltip" data-tip="View Likes">
              <span className="cursor-pointer" onClick={handleOpenLikesModal}>
                {currentTotalLikeCount}
              </span>
            </div>
            {isLikedByUser ? (
              <FcLike
                onClick={handleToggleLikePost}
                className="size-6 cursor-pointer"
              />
            ) : (
              <CiHeart
                onClick={handleToggleLikePost}
                className="size-6 cursor-pointer"
              />
            )}
          </div>

          <div className="ml-2 flex flex-col justify-center items-center">
            <div className="tooltip" data-tip="View Comments">
              <span className="cursor-pointer" onClick={handleOpenCommentsModal}>
                {currentTotalCommentCount}
              </span>
            </div>
            <div className="tooltip" data-tip="Add Comment">
              <FaRegCommentDots
                onClick={() => setShowComments(!showComments)}
                className="size-6 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4">
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Add a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button
            className="btn btn-success btn-sm mb-2"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default PostItem;
