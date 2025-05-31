"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaLink,
  FaMapMarkerAlt,
  FaEllipsisH,
  FaBell,
  FaEnvelope,
  FaHeart,
  FaRetweet,
  FaComment,
  FaShare,
  FaCamera,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Tweet {
  id: number;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  comments: number;
  isLiked: boolean;
  isRetweeted: boolean;
  images?: string[];
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  const [tweets] = useState<Tweet[]>([
    {
      id: 1,
      content:
        "Building the future of social media with Next.js and React! 🚀 The possibilities are endless when you combine great tools with creativity.",
      timestamp: "2h",
      likes: 1247,
      retweets: 89,
      comments: 23,
      isLiked: true,
      isRetweeted: false,
    },
    {
      id: 2,
      content:
        "Just shipped a new feature! The satisfaction of seeing your code come to life never gets old 💻✨",
      timestamp: "5h",
      likes: 892,
      retweets: 156,
      comments: 67,
      isLiked: false,
      isRetweeted: true,
    },
    {
      id: 3,
      content: "Coffee, code, repeat ☕️ What's your coding fuel today?",
      timestamp: "1d",
      likes: 456,
      retweets: 34,
      comments: 89,
      isLiked: false,
      isRetweeted: false,
    },
  ]);

  const tabs = [
    { id: "posts", label: "Posts", count: 1247 },
    { id: "replies", label: "Replies", count: 89 },
    { id: "highlights", label: "Highlights", count: 23 },
    { id: "media", label: "Media", count: 156 },
    { id: "likes", label: "Likes", count: 2.1 },
  ];

  const TweetCard = ({ tweet }: { tweet: Tweet }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-800 p-4 hover:bg-gray-950 transition-colors cursor-pointer"
    >
      <div className="flex space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
          JD
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-bold text-white">John Doe</h4>
            <span className="text-gray-500 text-sm">@johndoe</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">{tweet.timestamp}</span>
          </div>
          <p className="text-white mb-3 leading-relaxed">{tweet.content}</p>
          <div className="flex items-center justify-between max-w-md text-gray-500">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
            >
              <FaComment />
              <span className="text-sm">{tweet.comments}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center space-x-2 hover:text-green-500 transition-colors ${
                tweet.isRetweeted ? "text-green-500" : ""
              }`}
            >
              <FaRetweet />
              <span className="text-sm">{tweet.retweets}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${
                tweet.isLiked ? "text-red-500" : ""
              }`}
            >
              <FaHeart className={tweet.isLiked ? "fill-current" : ""} />
              <span className="text-sm">{tweet.likes}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-blue-500 transition-colors"
            >
              <FaShare />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.div
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-900 rounded-full transition-colors lg:hidden"
              onClick={() => router.back()}
            >
              <FaArrowLeft />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold">John Doe</h1>
              <p className="text-sm text-gray-500">1,247 posts</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-900 rounded-full transition-colors"
          >
            <FaEllipsisH />
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {/* Cover Image */}
        <motion.div
          className="h-48 md:h-64 relative bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt="Cover"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => coverInputRef.current?.click()}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          >
            <FaCamera />
          </motion.button>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            ref={coverInputRef}
            className="hidden"
          />
        </motion.div>

        {/* Profile Info */}
        <motion.div
          className="px-4 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-start -mt-16 mb-4">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-black object-cover"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-black flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                  JD
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => profileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-black border border-gray-600 hover:bg-gray-900 rounded-full transition-colors"
              >
                <FaCamera className="text-sm" />
              </motion.button>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
                ref={profileInputRef}
                className="hidden"
              />
            </div>

            <div className="flex space-x-2 mt-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 border border-gray-600 hover:bg-gray-900 rounded-full transition-colors"
              >
                <FaEnvelope />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 border border-gray-600 hover:bg-gray-900 rounded-full transition-colors"
              >
                <FaBell />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-full font-bold transition-colors ${
                  isFollowing
                    ? "bg-transparent border border-gray-600 text-white hover:bg-red-600 hover:border-red-600"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </motion.button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">John Doe</h2>
              <p className="text-gray-500">@johndoe</p>
            </div>
            <p className="text-white leading-relaxed">
              Full-stack developer passionate about creating amazing user
              experiences. Building the future with React, Next.js, and
              TypeScript ⚡️
            </p>
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              <div className="flex items-center space-x-1">
                <FaMapMarkerAlt />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaLink />
                <span className="text-blue-400 hover:underline cursor-pointer">
                  johndoe.dev
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <FaCalendarAlt />
                <span>Joined March 2020</span>
              </div>
            </div>
            <div className="flex space-x-6 text-sm">
              <div>
                <span className="font-bold text-white">1,247</span>
                <span className="text-gray-500 ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold text-white">5.6K</span>
                <span className="text-gray-500 ml-1">Followers</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="border-b border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 px-4 py-4 text-center relative transition-colors ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <div className="text-sm font-medium truncate">{tab.label}</div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "posts" && (
              <div>
                {tweets.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} />
                ))}
              </div>
            )}
            {activeTab !== "posts" && (
              <div className="p-8 text-center text-gray-500">
                <div className="text-6xl mb-4">
                  {activeTab === "replies" && "💬"}
                  {activeTab === "highlights" && "⭐"}
                  {activeTab === "media" && "🖼️"}
                  {activeTab === "likes" && "❤️"}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {activeTab === "replies" && "No replies yet"}
                  {activeTab === "highlights" && "No highlights yet"}
                  {activeTab === "media" && "No media yet"}
                  {activeTab === "likes" && "No likes yet"}
                </h3>
                <p>
                  {activeTab === "replies" &&
                    "When you reply to posts, they'll show up here."}
                  {activeTab === "highlights" &&
                    "Your highlighted posts will appear here."}
                  {activeTab === "media" &&
                    "Photos and videos you've posted will show up here."}
                  {activeTab === "likes" &&
                    "Your liked posts will appear here."}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;
