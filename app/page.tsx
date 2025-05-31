"use client";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import HomePage from "./components/Homepage/page";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  if (!user && !loading) {
    return router.push("/sign-in");
  }

  console.log(user);
  return (
    <>
      <HomePage />
    </>
  );
}
