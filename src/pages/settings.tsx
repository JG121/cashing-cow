import React, { useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import { GiHamburgerMenu } from "react-icons/gi";
import NavBar from "../components/navbar"; // Import your NavBar component

const Settings = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
    

      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-900 p-8">
        {/* Header Section */}
        <header className="container mx-auto flex justify-between items-center mb-8">
          <div className="text-3xl font-semibold">CashCow</div>
          {/* Add user avatar or any other header content */}
        </header>

        {/* Page Content */}
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-4">Account Settings</h1>
          {/* Your account settings content goes here */}
          <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
            {/* Sign Out Button */}
            <h2 className="text-xl font-semibold mb-2">Sign Out</h2>
            <p className="text-gray-400">
              Click the button below to sign out of your account.
            </p>
            <SignOutButton>
              <button className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
