import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { RxDashboard } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi"; // Import GiHamburgerMenu
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import "chart.js/auto";
import { Bar, Line, Chart } from "react-chartjs-2"; // Import Bar and Line charts
import NavBar from "../components/navbar";
import ExpenseModal from "@/components/ExpenseModal";
import IncomeModal from "@/components/IncomeModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("expense");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [chartType, setChartType] = useState("bar"); // State for chart type

  const user = useUser();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleChartType = () => {
    setChartType(chartType === "bar" ? "line" : "bar"); // Toggle between bar and line chart
  };

  // Dummy data for recent entries
  const recentEntries = [
    { name: "Rent", amount: 1000 },
    { name: "Groceries", amount: 200 },
    { name: "Utilities", amount: 300 },
    // Add more recent entries as needed
  ];

  // Chart data
  const chartData = {
    labels: recentEntries.map((entry) => entry.name),
    datasets: [
      {
        label: "Amount",
        data: recentEntries.map((entry) => entry.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          // Add more colors as needed
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navigation */}
      <NavBar />

      <div className="flex-1 md:flex">

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
<div className="px-4 md:px-12 space-y-4 md:space-y-0 md:space-x-4 flex flex-col sm:flex-row sm:space-x-4">
  <ExpenseModal />
  <IncomeModal />
  <Button onClick={toggleChartType}>Toggle Chart</Button>
</div>


            {/* Chart Section */}
            <div className="bg-gray-800 p-6 shadow-lg rounded-lg mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                {chartType === "bar" ? "Expense Bar Chart" : "Expense Line Chart"} {/* Conditional chart title */}
              </h2>
              <div>
                {/* Conditional rendering of chart */}
                {chartType === "bar" ? (
                  <Bar data={chartData} options={chartOptions} />
                ) : (
                  <Line data={chartData} options={chartOptions} />
                )}
              </div>
            </div>
          </section>

          {/* Recent Entries Section */}
          <section className="container mx-auto flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-4">
            {/* Recent Entries */}
            <div className="bg-gray-800 p-6 md:w-2/3">
              <h2 className="text-2xl font-semibold mb-4">Recent Entries</h2>
              <ul className="space-y-2">
                {recentEntries.map((entry, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{entry.name}</span>
                    <span>${entry.amount}</span>
                  </li>
                ))}
              </ul>
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
    </div>
  );
}
