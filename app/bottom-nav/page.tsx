import React from "react";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { RiNotification2Line } from "react-icons/ri";

const Nav = () => {
  return (
    <nav className="lg:hidden flex flex-row fixed bottom-0 h-13 items-center justify-between border-t-1 w-full border-white p-2 bg-black">
      <MdHome className="text-2xl text-white" />
      <IoIosSearch className="text-2xl text-white" />
      <RiNotification2Line className="text-2xl text-white" />
      <FaRegEnvelope className="text-2xl text-white" />
    </nav>
  );
};

export default Nav;
