import React, { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import NavBar from "../components/navbar";
import ExpenseModal from "@/components/ExpenseModal";
import IncomeModal from "@/components/IncomeModal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/components/firebase";

interface ExpenseType {
  name: string;
  amount: number;
  date?: string;
  type: string;
}

export default function Home() {
  const expenseData: ExpenseType[] = [];
  // State variables
  const [activeTab, setActiveTab] = useState("expense");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [chartType, setChartType] = useState("bar");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [recentEntries, setRecentEntries] = useState(expenseData);
  const currentUser = useUser().user?.emailAddresses[0].emailAddress;

  // Calculated totals
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("currentUser", currentUser);
        const querySnapshot = await getDocs(
          query(collection(db, "expense 2"), where("username", "==", currentUser))
        );
        let dataa = querySnapshot?.docs?.map((doc) => {
          const data = doc.data();
          // Ensure the date is in the correct format
          const formattedDate = data.date ? new Date(data.date).toISOString().split("T")[0] : null;

          return {
            name: data.name,
            amount: data.amount,
            type: data.type,
            date: formattedDate,
          };
        });

        const totalSum = dataa.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.amount;
        }, 0);

        setTotalExpenses(totalSum);
        setRecentEntries(dataa as ExpenseType[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser, setTotalExpenses, totalExpenses]);

  // User data
  const user = useUser();

  // Toggle navigation sidebar
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Toggle chart type
  const toggleChartType = () => {
    setChartType(chartType === "bar" ? "line" : "bar");
  };

  // Calculate and update totals based on filters
  const updateTotals = () => {
    const filteredExpenses = recentEntries.filter((entry) => {
      const entryDate = new Date(entry.date ?? "");
      const selectedYearInt = parseInt(selectedYear, 10);
      const selectedMonthStr = selectedMonth.padStart(2, "0");

      if (selectedDate && entry.date !== selectedDate) {
        return false;
      }
      if (selectedYear && entryDate.getFullYear() !== selectedYearInt) {
        return false;
      }
      if (selectedMonth && entryDate.getMonth() + 1 !== parseInt(selectedMonthStr, 10)) {
        return false;
      }
      if (selectedType !== "all" && entry.type !== selectedType) {
        return false;
      }
      return true;
    });

    const totalExpensesValue = filteredExpenses
      .filter((entry) => entry.type === "expense")
      .reduce((total, entry) => total + entry.amount, 0);

    const totalIncomeValue = recentEntries
      .filter((entry) => entry.type === "income")
      .reduce((total, entry) => total + entry.amount, 0);

    const totalBalanceValue = totalIncomeValue - totalExpensesValue;

    setTotalExpenses(totalExpensesValue);
    setTotalIncome(totalIncomeValue);
    setTotalBalance(totalBalanceValue);
  };

  // Use useEffect to recalculate totals whenever filters change
  useEffect(() => {
    updateTotals();
  }, [selectedDate, selectedYear, selectedMonth, selectedType]);

  // Chart data and options
  const chartData = {
    labels: ["Expense", "Income"],
    datasets: [
      {
        label: "Total",
        data: [totalExpenses, totalIncome],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
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

  // CSS class for red text when totalBalance is not positive
  const totalBalanceClass = totalBalance < 0 ? "text-red-500" : "text-green-500";

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
              <Avatar isBordered src={user.user?.imageUrl} />
            </div>
          </header>

          {/* Main Dashboard Section */}
          <section className="container mx-auto py-8 px-4">
            {/* Financial Summaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`bg-gray-800 p-6 shadow-lg rounded-lg ${totalBalanceClass}`}>
                <div className="text-gray-400 text-lg">Total Balance</div>
                <div className="text-3xl font-semibold">${totalBalance.toLocaleString()}</div>
              </div>
              <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
                <div className="text-gray-400 text-lg">Total Expenses</div>
                <div className="text-3xl font-semibold text-red-500">${totalExpenses.toLocaleString()}</div>
              </div>
              <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
                <div className="text-gray-400 text-lg">Total Income</div>
                <div className="text-3xl font-semibold text-green-500">${totalIncome.toLocaleString()}</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="px-4 md:px-12 space-y-8 md:space-y-0 md:space-x-4 flex flex-col sm:flex-row sm:space-x-4">
              <ExpenseModal />
              <IncomeModal />
              <Button onClick={toggleChartType} color="secondary">
                Toggle Chart
              </Button>
            </div>

            {/* Chart Section */}
            <div className="bg-gray-800 p-6 shadow-lg rounded-lg mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                {chartType === "bar" ? "Expense Bar Chart" : "Expense Line Chart"}{" "}
              </h2>
              <div>
                {chartType === "bar" ? (
                  <Bar data={chartData} options={chartOptions} />
                ) : (
                  <Line data={chartData} options={chartOptions} />
                )}
              </div>
            </div>
          </section>

          {/* Filter Section */}
          <section className="container mx-auto mt-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Filter Entries</h2>
              <div className="space-y-4">
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="text-white text-lg">Filter by Date:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="text-black rounded-md p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white text-lg">Filter by Year:</label>
                  <input
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="text-black rounded-md p-2"
                  />
                </div>
                {/* Month Filter */}
                <div className="space-y-2">
                  <label className="text-white text-lg">Filter by Month:</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="text-black rounded-md p-2"
                  >
                    <option value="">All</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                {/* Type Filter */}
                <div className="space-y-2">
                  <label className="text-white text-lg">Filter by Type:</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="text-black rounded-md p-2"
                  >
                    <option value="all">All</option>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Entries Section */}
          <section className="container mx-auto mt-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Recent Entries</h2>
              <ul className="space-y-2">
                {recentEntries
                  .filter((entry) => {
                    const entryDate = entry.date ? new Date(entry.date) : null; // Convert to Date if available
                    const selectedYearInt = parseInt(selectedYear, 10);
                    const selectedMonthStr = selectedMonth.padStart(2, "0");

                    if (selectedType !== "all" && entry.type !== selectedType) {
                      return false;
                    }
                    if (selectedDate && entryDate?.toISOString().split("T")[0] !== selectedDate) {
                      return false;
                    }
                    if (selectedYear && entryDate?.getFullYear() !== selectedYearInt) {
                      return false;
                    }
                    if (
                      selectedMonth &&
                      entryDate?.getMonth() + 1 !== parseInt(selectedMonthStr, 10)
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map((entry, index) => {
                    const entryDate = entry.date ? new Date(entry.date) : null; // Move this line inside the map function
                    return (
                      <li key={index} className="flex justify-between">
                        <span>{entry.name}</span>
                        <span>
                          ${entry.amount.toLocaleString()} ({entry.type}) -{" "}
                          {entryDate ? entryDate.toLocaleDateString() : "No Date"}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
