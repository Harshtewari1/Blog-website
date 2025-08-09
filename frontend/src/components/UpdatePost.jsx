import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const UpdatePost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const res = await API.get(`/posts/getSinglePost/${postId}`);
            setFormData({
                title: res.data.title || "",
                content: res.data.content || ""
            });
        } catch (err) {
            console.error("Error fetching post:", err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.patch(`/posts/updatePost/${postId}`, formData);
            navigate("/profile");
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };

    return (
        <div className="min-h-screen bg-emerald-100 flex justify-center items-center px-4">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Post</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="5"
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Update Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePost;
