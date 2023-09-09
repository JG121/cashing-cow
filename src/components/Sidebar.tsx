import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <nav
      className={`${
        isOpen ? "block" : "hidden"
      } md:block bg-gray-800 h-screen w-1/6 py-8 px-4`}
    >
      {/* Navigation Links */}
      <ul className="space-y-4">
        {/* Add your navigation links here */}
        <li>
            <a
              href="/"
              className="text-3xl font-semibold text-white hover:text-indigo-400 flex items-center my-4"
            >
              <RxDashboard className="mr-4 icon-lg" />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-3xl font-semibold text-white hover:text-indigo-400 flex items-center my-4"
            >
              <HiOutlineChartBar className="mr-4 icon-lg" />
            </a>
          </li>
          <li>
            <a
              href="settings"
              className="text-3xl font-semibold text-white hover:text-indigo-400 flex items-center my-4"
            >
              <FiSettings className="mr-4 icon-lg" />
            </a>
          </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
