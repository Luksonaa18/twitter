"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { GiFeather } from "react-icons/gi";

const Composer = () => {
  const router = useRouter();
  return (
    <div
      className="w-[40px] h-[40px] bg-blue-400 rounded-full flex items-center justify-center fixed bottom-20 right-4 z-50 cursor-pointer shadow-lg hover:bg-blue-500 transition-colors duration-300"
      onClick={() => router.push("/posting")}
    >
      <GiFeather className="text-white" />
    </div>
  );
};

export default Composer;
