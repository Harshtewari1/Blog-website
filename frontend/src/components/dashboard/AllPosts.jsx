import React from "react";
import { FaQuoteLeft } from "react-icons/fa"; // for decorative quote icon

const gradients = [
    "bg-gradient-to-r from-white to-gray-50",
    "bg-gradient-to-r from-blue-50 to-white",
    "bg-gradient-to-r from-green-50 to-white",
    "bg-gradient-to-r from-yellow-50 to-white",
    "bg-gradient-to-r from-pink-50 to-white",
];

const AllPosts = ({ posts }) => {
    return (
        <div className="pt-8 flex justify-center w-full">
            {posts.length === 0 ? (
                <p className="text-gray-500">No posts available.</p>
            ) : (
                <div className="space-y-10 px-4 sm:px-12 lg:px-24 w-full lg:w-[70%]">
                    {posts.map((post, index) => {
                        const bgStyle = gradients[index % gradients.length];
                        return (
                            <div
                                key={post._id}
                                className={`${bgStyle} rounded-lg shadow-lg border border-gray-200 overflow-hidden relative hover:shadow-2xl transition-all duration-300`}
                            >
                                {/* Decorative Quote Icon */}
                                <FaQuoteLeft className="absolute top-4 left-4 text-gray-300 text-3xl opacity-40" />

                                <div className="p-6 flex flex-col space-y-4 relative z-10">
                                    {/* Author */}
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                            {post.userId?.email?.[0]?.toUpperCase() || "?"}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Posted by:{" "}
                                            <span className="font-medium text-gray-800">
                                                {post.userId?.email || "Unknown"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {post.title}
                                    </h2>

                                    {/* Content */}
                                    <p className="text-gray-700 leading-relaxed">
                                        {post.content}
                                    </p>

                                    {/* Read More
                                    <div>
                                        <button className="text-blue-600 font-medium hover:underline">
                                            Read more →
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AllPosts;
