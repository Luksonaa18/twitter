"use client";

import Nav from "@/app/bottom-nav/page";
import Composer from "@/app/composer-button/page";
import Header from "@/app/header/page";
import { usePostStore } from "@/app/zustand";
import React from "react";
import userImage from "../../../public/user.png";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  const posts = usePostStore((state) => state.posts);

  return (
    <>
      <Header />

      <div className="pb-20 overflow-y-auto  mt-15 lg:hidden sm:block">
        {posts
          .slice()
          .reverse()
          .map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="border-b border-gray-800 p-4 hover:bg-[#16181c] transition-colors cursor-pointer">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div>
                    <Image
                      alt="user"
                      src={userImage}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold text-sm">
                        {post.author}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ·{" "}
                        {new Date(post.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="text-white text-sm mt-1 whitespace-pre-wrap">
                      {post.comment}
                    </div>

                    {/* Post Image (optional) */}
                    {post.image && (
                      <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700 max-w-[500px]">
                        <Image
                          alt="post"
                          src={post.image}
                          width={500}
                          height={300}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div className="pb-20 overflow-y-auto lg:flex lg:flex-col lg:items-center lg:w-full hidden">
        {posts
          .slice()
          .reverse()
          .map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="border-b border-gray-800 p-4 hover:bg-[#16181c] transition-colors cursor-pointer w-full">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div>
                    <Image
                      alt="user"
                      src={userImage}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold text-sm">
                        {post.author}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ·{" "}
                        {new Date(post.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="text-white text-sm mt-1 whitespace-pre-wrap">
                      {post.comment}
                    </div>

                    {/* Post Image (optional) */}
                    {post.image && (
                      <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700 max-w-[500px]">
                        <Image
                          alt="post"
                          src={post.image}
                          width={500}
                          height={300}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>

      <Composer />
      <Nav />
    </>
  );
};

export default HomePage;
