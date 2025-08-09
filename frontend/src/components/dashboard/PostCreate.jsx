import React, { useState } from "react";
import API from "../../utils/api";
import { IoClose } from "react-icons/io5"; // Close icon from react-icons

const PostCreate = ({ onPostCreated }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/posts/createPost", { title, content });

            const res = await API.get("/posts/getAllPost");
            const latestPost = res.data.posts[0];

            onPostCreated(latestPost);

            setTitle("");
            setContent("");
            setIsOpen(false);
        } catch (err) {
            console.error("Error creating post:", err);
            alert("Failed to create post");
        }
    };

    return (
        <div className="p-4 flex justify-center">
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:opacity-90 shadow-lg transition-all w-[40%]"
            >
                Create Post
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
                    <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 p-6 rounded-2xl shadow-2xl w-[90%] max-w-md">

                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        >
                            <IoClose size={24} />
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            Create a New Post
                        </h2>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                    placeholder="Enter your post title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Content
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                                    rows="4"
                                    placeholder="Write your post content..."
                                    required
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 shadow-md transition"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCreate;
