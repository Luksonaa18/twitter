"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { usePostStore } from "@/app/zustand";
import { v4 as uuidv4 } from "uuid";

const PostDetail = () => {
  const { id } = useParams();

  // Separate selectors for stable references
  const posts = usePostStore((state) => state.posts);
  const addComment = usePostStore((state) => state.addComment);

  const post = posts.find((p) => p.id === id);
  const [commentText, setCommentText] = useState("");

  if (!post) return <div className="text-white p-4">Post not found</div>;

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: uuidv4(),
      postId: post.id,
      text: commentText.trim(),
      date: new Date(),
    };

    addComment(post.id, newComment);
    setCommentText("");
  };

  return (
    <div className="text-white p-4 max-w-xl mx-auto">
      {/* Main post */}
      <div className="border-b border-gray-700 pb-4 mb-4">
        <div className="font-bold text-lg">{post.author}</div>
        <div className="mt-2 mb-2">{post.comment}</div>
        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="mt-2 rounded-xl max-w-full"
          />
        )}
        <div className="text-sm text-gray-400 mt-1">
          {post.date.toLocaleString()}
        </div>
      </div>

      {/* Comment input */}
      <div className="flex flex-col space-y-2 mb-6">
        <textarea
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="bg-black border border-gray-700 rounded-md p-2 text-white resize-none"
          rows={4}
        />
        <button
          onClick={handleCommentSubmit}
          className="self-end px-4 py-1 bg-blue-500 text-white rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={!commentText.trim()}
        >
          Comment
        </button>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {post.comments?.length ? (
          post.comments.map((c) => (
            <div
              key={c.id}
              className="border border-gray-800 p-3 rounded-lg hover:bg-gray-900 transition"
            >
              <div className="text-sm">{c.text}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(c.date).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No comments yet</div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
