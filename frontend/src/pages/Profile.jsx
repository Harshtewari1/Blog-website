import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null); // store post id for modal
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await API.get("/profile/me");
      setUser(userRes.data);

      const postsRes = await API.get("/posts/mypost");
      setPosts(postsRes.data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = (postId) => {
    setPostToDelete(postId); // open modal
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/posts/deletePost/${postToDelete}`);
      setPosts(posts.filter((post) => post._id !== postToDelete));
      setPostToDelete(null); // close modal
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/updatePost/${postId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  

  return (
    <div className="min-h-screen bg-emerald-100 flex flex-col items-center py-10 px-4 relative">
      {/* Back to Dashboard */}
      <button
        onClick={goToDashboard}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
      >
        <FaTimes size={24} />
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl border border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <FaUserCircle className="text-gray-400" size={96} />
          )}
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {user?.name || "Your Name"}
            </h1>
            <p className="flex justify-center sm:justify-start items-center gap-2 text-gray-600 text-sm sm:text-base">
              <MdEmail /> {user?.email || "youremail@example.com"}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Bio</h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            {user?.bio || "Write something about yourself..."}
          </p>
          <button className="mt-3 flex items-center gap-2 text-blue-600 hover:underline text-sm sm:text-base">
            <FaEdit /> Edit Bio
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 text-center">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{posts.length}</p>
            <p className="text-gray-500 text-sm sm:text-base">Posts</p>
          </div>
          
        </div>

        {/* My Posts */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">My Posts</h2>
          {posts.length > 0 ? (
            <ul className="space-y-3">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border hover:bg-gray-100 transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{post.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {post.content.slice(0, 80)}...
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-2">
                    <button
                      onClick={() => handleEdit(post._id)}
                      className="flex items-center justify-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm sm:text-base"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(post._id)}
                      className="flex items-center justify-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center sm:text-left">No posts yet.</p>
          )}

          {/* Logout Button */}
          <div className="mt-6 flex justify-center sm:justify-end">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-fadeIn">
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-800">Delete Post</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setPostToDelete(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
