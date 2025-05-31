"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import {
  ArrowLeft,
  Image as ImageIcon,
  Calendar,
  Smile,
  BarChart3,
  MapPin,
  Hash,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePostStore } from "../zustand";
import { v4 as uuidv4 } from "uuid";

type FormData = {
  comment: string;
};

const Composer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const comment = watch("comment", "");
  const router = useRouter();
  const addPost = usePostStore((state) => state.addPost);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePostAdd = (data: FormData) => {
    const newPost = {
      author: "Luka Luka",
      comment: data.comment,
      id: uuidv4(),
      date: new Date(),
      image: imagePreview || "",
    };
    addPost(newPost);
    reset();
    setImagePreview(null);
    router.push("/");
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <nav className="flex justify-between items-center p-4">
          <button className="p-1 hover:bg-gray-900 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-white" onClick={()=>router.back()}/>
          </button>

          <div className="flex items-center space-x-4">
            <button className="text-blue-400 font-medium text-sm hover:underline">
              Drafts
            </button>
            <button
              onClick={handleSubmit(handlePostAdd)}
              disabled={!comment?.trim() && !imagePreview}
              className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all ${
                comment?.trim() || imagePreview
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-900 text-gray-500 cursor-not-allowed"
              }`}
            >
              Post
            </button>
          </div>
        </nav>
      </header>

      {/* Composer Body */}
      <div className="p-4">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-lg">
              I
            </div>
          </div>

          <div className="flex-1">
            <textarea
              {...register("comment", { required: false })}
              placeholder="What's happening?"
              className="w-full bg-transparent text-white text-xl placeholder-gray-500 resize-none border-none outline-none min-h-[120px] font-normal"
              rows={6}
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative mt-4 w-full max-w-md rounded-2xl overflow-hidden border border-neutral-700">
                <img src={imagePreview} alt="preview" className="w-full object-cover" />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-black/80"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reply Settings */}
        <div className="mt-4 ml-15">
          <button className="flex items-center text-blue-400 text-sm font-medium hover:underline">
            <div className="w-4 h-4 rounded-full border border-blue-400 flex items-center justify-center mr-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
            Everyone can reply
          </button>
        </div>

        {/* Toolbar */}
        <div className="mt-6 ml-15 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-gray-900 rounded-full transition-colors group"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon size={20} className="text-blue-400 group-hover:text-blue-300" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </button>
            <button className="p-2 hover:bg-gray-900 rounded-full transition-colors group">
              <Hash size={20} className="text-blue-400 group-hover:text-blue-300" />
            </button>
            <button className="p-2 hover:bg-gray-900 rounded-full transition-colors group">
              <Smile size={20} className="text-blue-400 group-hover:text-blue-300" />
            </button>
            <button className="p-2 hover:bg-gray-900 rounded-full transition-colors group">
              <Calendar size={20} className="text-blue-400 group-hover:text-blue-300" />
            </button>
            <button className="p-2 hover:bg-gray-900 rounded-full transition-colors group">
              <BarChart3 size={20} className="text-blue-400 group-hover:text-blue-300" />
            </button>
            <button className="p-2 hover:bg-gray-900 rounded-full transition-colors group">
              <MapPin size={20} className="text-blue-400 group-hover:text-blue-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Composer;
