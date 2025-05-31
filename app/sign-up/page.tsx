"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";
type SignUpData = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpData>();

  const router = useRouter();

  const onSubmit = async (data: SignUpData) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      reset();
      router.push("/sign-in");
    } catch (err: any) {
      console.log(err.message || "Failed to sign up.");
    }
  };
  if (loading) {
    return (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-white z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
            transition: {
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
            },
          }}
        >
          <FaXTwitter className="text-blue-600 text-6xl" />
        </motion.div>
      </motion.div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-12">
      <div className="w-full max-w-md">
        <FaXTwitter className="text-3xl mb-10 text-white" />

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Happening now
        </h1>
        <h2 className="text-2xl font-bold mb-6">Sign in to X</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Phone, email, or username"
              className="w-full px-4 py-3 rounded-md bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
