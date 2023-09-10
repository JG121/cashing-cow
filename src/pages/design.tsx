import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar, Button } from "@nextui-org/react";
import { GiHamburgerMenu } from "react-icons/gi";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import ExpenseModal from "../components/ExpenseModal";
import IncomeModal from "../components/IncomeModal"
import FSS from '../components/fss';



type RecentEntry = {
  color: string;
  name: string; // Updated: Use "name" instead of "type"
  date: string;
  amount: number;
};

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const recentExpenses: RecentEntry[] = [
    {
      color: "blue",
      name: "Rent", // Updated: Use "name" instead of "type"
      date: "9/9/2023",
      amount: 3000,
    },
    {
      color: "green",
      name: "Gas", // Updated: Use "name" instead of "type"
      date: "9/10/2023",
      amount: 5997000,
    },
    // Add more recent entries here
  ];

  const chartData = {
    labels: recentExpenses.map((entry) => entry.name), // Updated: Use "name" instead of "type"
    datasets: [
      {
        data: recentExpenses.map((entry) => entry.amount),
        backgroundColor: recentExpenses.map((entry) => entry.color),
      },
    ],
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for larger screens */}
      <nav
        className={`${
          isNavOpen ? "left-0" : "-left-full"
        } md:left-0 bg-gray-800 h-screen w-1/8 py-8 px-8 fixed top-0 overflow-y-auto z-20 transition-transform duration-300 ease-in-out`}
      >
        {/* Close button */}
        <button
          onClick={toggleNav}
          className="md:hidden text-white hover:text-indigo-400 absolute top-4 right-4 z-30"
        >
          <GiHamburgerMenu className="text-2xl" />
        </button>
        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="text-3xl font-semibold text-white hover:text-indigo-400 flex items-center my-4"
            >
              {/* Add your icons here */}
            </a>
          </li>
          {/* Add more navigation links for other pages */}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-900">
        {/* Header Section */}
        <header className="bg-gray-900 p-4 md:p-8 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleNav}
              className="md:hidden text-white hover:text-indigo-400"
            >
              <GiHamburgerMenu className="text-2xl" />
            </button>
            <div className="text-3xl px-12 font-semibold">CashCow</div>
          </div>
          <div className="flex items-center">
            <Avatar isBordered radius="lg" src={user?.imageUrl} />
            <div className="ml-4">Hello, {user.firstName}</div>
          </div>
        </header>

        {/* Financial Summary Section */}
        <section className="container mx-auto py-8 px-4 flex flex-col md:flex-row">
          <div className="bg-gray-800 p-6 shadow-lg rounded-lg w-full md:w-1/4 text-center relative z-10">
            <div className="text-gray-400 text-lg">Total Balance</div>
            <div className="text-3xl font-semibold text-green-500">
              $
              {recentExpenses
                .reduce(
                  (total, entry) =>
                    entry.name === "Income"
                      ? total + entry.amount
                      : total - entry.amount,
                  0
                )
                .toLocaleString()}
            </div>
            <hr className="my-4 border-gray-700" />
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
                {/* Circle */}
              </div>
              <div className="ml-4">
                <div>Total Expenses</div>
                <div>
                  -$
                  {recentExpenses
                    .filter((entry) => entry.name === "Expense")
                    .reduce((total, entry) => total + entry.amount, 0)
                    .toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                {/* Circle */}
              </div>
              <div className="ml-4">
                <div>Total Income</div>
                <div>
                  +$
                  {recentExpenses
                    .filter((entry) => entry.name === "Income")
                    .reduce((total, entry) => total + entry.amount, 0)
                    .toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className=" space-x-4 md:ml-4 mt-4 md:mt-0 md:flex-grow flex flex-col md:flex-row">
            <ExpenseModal />
            <IncomeModal />
          </div>
        </section>

        {/* Recent Entries Section */}
        <section className="container mx-auto py-8 px-4 flex flex-col md:flex-row w-full lg:w-2/3">
          <div className="bg-gray-800 p-6 shadow-lg rounded-lg w-full md:w-1/4 text-center relative z-10 md:ml-auto md:mr-auto">
            <h2 className="text-2xl font-semibold mb-4">Recent Entries</h2>
            {recentExpenses.map((expense, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full bg-${expense.color}-500 flex items-center justify-center text-white`}
                  >
                    {/* Circle */}
                  </div>
                  <div className="ml-2">
                    <div className={`text-${expense.color}-500 font-bold`}>
                      {expense.name}
                    </div>
                    <div>
                      {expense.name === "Expense" ? "-$" : "+$"}
                      {expense.amount.toLocaleString()}
                    </div>
                    <div>Expense Date: {expense.date}</div>
                  </div>
                </div>
                {index < recentExpenses.length - 1 && (
                  <hr className="my-4 border-gray-700" />
                )}
              </div>
            ))}
          </div>

          {/* Doughnut Chart */}
          <div className="bg-gray-800 p-6 shadow-lg rounded-lg w-full md:w-1/3 text-center relative z-10 md:ml-auto md:mr-auto">
            <h2 className="text-2xl font-semibold mb-4">Financial Overview</h2>
            <Doughnut data={chartData} />
          </div>
        </section>
      </main>
    </div>
  );
}
