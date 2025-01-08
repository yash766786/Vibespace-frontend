import React, { useState } from "react";
import { usePost } from "../context/PostState";
function CreatePost() {
  const { addPost } = usePost();

  const [post, setPost] = useState({
    postFile: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addPost(post);
    if (response.success) {
      console.log("Post created successfully!");
      // Optionally, reset form or navigate to another page
      setPost({
        postFile: null,
        description: "",
      });
    } else {
      console.log("Failed to create post");
    }
  };

  return (
    <div className="h-auto bg-[rgb(var(--custom-color1))] flex items-center justify-center mb-16 ">
      <div className="card w-full max-w-lg shadow-xl bg-[rgb(var(--custom-color2))] opacity-75">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold leading-tight text-primary">
            Create a New Post
          </h2>
          <form onSubmit={handleSubmit}>
            {/* File Upload Field */}
            <div className="form-control mb-4">
              <label htmlFor="postFile" className="label">
                <span className="label-text">
                  Upload File<span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="file"
                id="postFile"
                name="postFile"
                accept="image/*,video/*"
                className="input input-bordered w-full p-2"
                // onChange={handleFileChange}
                onChange={(e) =>
                  setPost({ ...post, postFile: e.target.files[0] })
                }
                required
              />
            </div>

            {/* Description Field */}
            <div className="form-control mb-4">
              <label htmlFor="description" className="label">
                <span className="label-text">
                  Description<span className="text-red-600">*</span>
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                value={post.description}
                placeholder="Enter description"
                className="textarea textarea-bordered w-full"
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full text-base"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
