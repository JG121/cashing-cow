import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { RxDashboard } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi"; // Import GiHamburgerMenu
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("expense");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const user = useUser();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col md:flex-row">
      {/* Mobile Navigation Toggle */}
      <div className="md:hidden px-4 py-2">
        <button
          onClick={toggleNav}
          className="text-white hover:text-indigo-400"
        >
          {isNavOpen ? "Close" : <GiHamburgerMenu className="text-2xl" />} {/* Larger GiHamburgerMenu icon */}
        </button>
      </div>

      {/* Side Navigation */}
      <nav
        className={`${
          isNavOpen ? "block" : "hidden"
        } md:block bg-gray-800 h-screen w-1/2 md:w-1/6 py-8 px-4`}
      >
        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <a
              href="#"
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
          {/* Add more navigation links for other pages */}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-900">
        {/* Header Section */}
        <header className="bg-gray-900 p-4 md:p-8">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-3xl font-semibold">CashCow</div>
            <Avatar isBordered radius="lg" src={user.user?.imageUrl} />
          </div>
        </header>

        {/* Main Dashboard Section */}
        <section className="container mx-auto py-8 px-4">
          {/* Financial Summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
              <div className="text-gray-400 text-lg">Total Balance</div>
              <div className="text-3xl font-semibold text-green-500">$5,000</div>
            </div>
            <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
              <div className="text-gray-400 text-lg">Total Expenses</div>
              <div className="text-3xl font-semibold text-red-500">$3,000</div>
            </div>
            <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
              <div className="text-gray-400 text-lg">Total Income</div>
              <div className="text-3xl font-semibold text-blue-500">$2,000</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-4 md:px-12 space-y-4 md:space-y-0 md:space-x-4">
            <Button color="primary">Expense</Button>

            <Button color="primary">Income</Button>
          </div>

          {/* Graph Section */}
          <div className="bg-gray-800 p-6 shadow-lg rounded-lg mt-8">
            {/* Add your graph/chart component here */}
            <p className="text-white text-lg">Graph/Chart Area</p>
          </div>
        </section>

        {/* Recent Entries Section */}
        <section className="container mx-auto flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-4">
          {/* Recent Entries */}
          <div className="bg-gray-800 p-6 md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Recent Entries</h2>
            {/* Add your list of recent entries here */}
            <p className="text-white text-lg">Recent Entries List</p>
          </div>

          {/* Filter Entries */}
          <div className="bg-gray-800 p-6 md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Filter Entries</h2>
            {/* Add your filter options and controls here */}
            <p className="text-white text-lg">Filter Options</p>
          </div>
        </section>
      </main>
    </div>
  );
}
