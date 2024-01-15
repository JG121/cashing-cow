import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar } from "@nextui-org/react";
import "chart.js/auto";
import NavBar from "../components/navbar";
import ExpenseModal from "@/components/ExpenseModal";
import IncomeModal from "@/components/IncomeModal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/components/firebase";
import { ExpenseChart } from "@/components/ExpenseChart";
import { Expense } from "@/components/types";
import { DashboardTable } from "@/components/dashboardTable/DashboardTable";

export default function Home() {
  const expenseData: Expense[] = [];
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
          query(
            collection(db, "expense pro"),
            where("username", "==", currentUser)
          )
        );
        let dataa = querySnapshot?.docs?.map((doc) => {
          const data = doc.data();
          // Ensure the date is in the correct format
          const formattedDate = new Date(data.date).toISOString().split("T")[0];

          return {
            name: data.name,
            amount: data.amount,
            type: data.type,
            date: formattedDate,
            category: data.category,
            id: data.id,
            description: data.description,
          };
        });
        const totalSum = dataa.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.amount;
        }, 0);

        setTotalExpenses(totalSum);
        setRecentEntries(dataa);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser, setTotalExpenses, totalExpenses]);

  // User data
  const user = useUser();

  // Calculate and update totals based on filters
  const updateTotals = () => {
    const totalExpensesValue = recentEntries
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
  }, []);

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
              <div className="relative bg-gray-800 p-6 shadow-lg rounded-lg">
                <div className="text-gray-400 text-lg">Total Balance</div>
                <div className="text-3xl font-semibold">
                  ${totalBalance.toLocaleString()}
                </div>
              </div>
              <div className="relative bg-gray-800 p-6 shadow-lg rounded-lg">
                <ExpenseModal />
                <div className="text-gray-400 text-lg">Total Expenses</div>
                <div className="text-3xl font-semibold text-red-500">
                  ${totalExpenses.toLocaleString()}
                </div>
              </div>
              <div className="relative bg-gray-800 p-6 shadow-lg rounded-lg">
                <IncomeModal />
                <div className="text-gray-400 text-lg">Total Income</div>
                <div className="text-3xl font-semibold text-green-500">
                  ${totalIncome.toLocaleString()}
                </div>
              </div>
            </div>

            <ExpenseChart data={recentEntries} />
            <div className="bg-gray-800 p-6 shadow-lg rounded-lg mt-8">
              <DashboardTable data={recentEntries} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
