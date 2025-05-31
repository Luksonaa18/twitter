"use client";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
import { RiLogoutBoxRLine } from "react-icons/ri";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  MoreHorizontal,
  Settings,
  HelpCircle,
} from "lucide-react";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const userImage = "/api/placeholder/40/40";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };

  const router = useRouter();

  const sidebarItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Explore", path: "/explore" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Mail, label: "Messages", path: "/messages" },
    { icon: Bookmark, label: "Bookmarks", path: "/bookmarks" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: MoreHorizontal, label: "More", path: "/more" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden h-[70px] bg-black bg-opacity-90 backdrop-blur-md fixed top-0 left-0 right-0 border-b border-gray-800 z-10">
        <nav className="flex flex-row items-center p-4 justify-between">
          <FaUserAlt
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-xl text-white cursor-pointer hover:bg-gray-800 p-2 rounded-full transition-colors"
            size={32}
          />
          <FaXTwitter className="text-xl text-white" />
          <button className="border border-gray-600 px-3 py-1.5 rounded-full font-bold text-white text-sm hover:bg-gray-900 transition-colors">
            Get Premium
          </button>
        </nav>
      </header>

      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Left Sidebar */}
        <div className="fixed left-0 top-0 w-64 xl:w-80 h-full bg-black border-r border-gray-800 p-4">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="mb-8 p-3">
              <FaXTwitter className="text-2xl text-white" />
            </div>

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => router.push(item.path)}
                      className="flex items-center space-x-4 w-full p-3 rounded-full hover:bg-gray-900 transition-colors group"
                    >
                      <item.icon size={24} className="text-white" />
                      <span className="text-white text-xl font-light xl:block hidden">
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Post Button */}
              <button className="w-full bg-blue-500 text-white font-bold py-3 px-8 rounded-full mt-6 hover:bg-blue-600 transition-colors xl:block hidden">
                Post
              </button>
              <button className="w-12 h-12 bg-blue-500 text-white font-bold rounded-full mt-6 hover:bg-blue-600 transition-colors xl:hidden flex items-center justify-center">
                +
              </button>
            </nav>

            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-3 w-full p-3 rounded-full hover:bg-gray-900 transition-colors"
              >
                <Image
                  src={userImage}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="user"
                />
                <div className="xl:block hidden flex-1 text-left">
                  <div className="text-white font-medium">Luka Luka</div>
                  <div className="text-gray-400 text-sm">@luksonaa</div>
                </div>
                <MoreHorizontal
                  size={16}
                  className="text-gray-400 xl:block hidden"
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 w-full bg-black border border-gray-700 rounded-2xl shadow-2xl mb-2 overflow-hidden"
                  >
                    <div className="p-3 border-b border-gray-700">
                      <div className="text-white font-medium">Luka Luka</div>
                      <div className="text-gray-400 text-sm">@luksonaa</div>
                    </div>

                    <button
                      onClick={() => router.push("/profile")}
                      className="flex items-center space-x-3 w-full p-3 hover:bg-gray-900 transition-colors"
                    >
                      <User size={18} className="text-gray-400" />
                      <span className="text-white">Profile</span>
                    </button>

                    <button
                      onClick={() => router.push("/settings")}
                      className="flex items-center space-x-3 w-full p-3 hover:bg-gray-900 transition-colors"
                    >
                      <Settings size={18} className="text-gray-400" />
                      <span className="text-white">Settings</span>
                    </button>

                    <div className="border-t border-gray-700">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 w-full p-3 hover:bg-gray-900 transition-colors"
                      >
                        <RiLogoutBoxRLine size={18} className="text-gray-400" />
                        <span className="text-white">Log out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Trends, Who to Follow) */}
        <div className="fixed right-0 top-0 w-80 h-full bg-black border-l border-gray-800 p-4 hidden xl:block">
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-gray-900 rounded-full p-3 flex items-center space-x-3">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
              />
            </div>

            {/* Get Premium */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <h2 className="text-white font-bold text-xl mb-2">Get Premium</h2>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to unlock new features and if eligible, receive a
                share of ads revenue.
              </p>
              <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </div>

            {/* Trends */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <h2 className="text-white font-bold text-xl mb-4">
                What's happening
              </h2>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="hover:bg-gray-800 p-2 rounded cursor-pointer"
                  >
                    <div className="text-gray-400 text-sm">
                      Trending in Technology
                    </div>
                    <div className="text-white font-medium">React 19</div>
                    <div className="text-gray-400 text-sm">42.1K posts</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="md:hidden fixed top-0 left-0 w-64 h-full bg-black text-white p-4 z-50 border-r border-gray-800"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-row items-center justify-between mb-6">
                <Image
                  src={userImage}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="user"
                />
                <CiCirclePlus
                  onClick={() => router.push("/sign-up")}
                  className="text-2xl cursor-pointer hover:bg-gray-800 p-1 rounded-full"
                  size={32}
                />
              </div>

              <div className="flex flex-col mb-6">
                <h1 className="text-white font-bold">Luka Luka</h1>
                <span className="text-gray-400">@luksonaa</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => router.push("/profile")}
                  className="flex flex-row items-center gap-3 w-full p-3 hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <FaUserAlt className="text-lg" />
                  <span className="text-sm">Profile</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="flex flex-row items-center gap-3 w-full p-3 hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <RiLogoutBoxRLine className="text-xl" />
                  <span className="text-sm">Log out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
