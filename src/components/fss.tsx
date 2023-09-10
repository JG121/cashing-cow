import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar, Button } from "@nextui-org/react";
import { GiHamburgerMenu } from "react-icons/gi";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import ExpenseModal from "../components/ExpenseModal";
import IncomeModal from "../components/IncomeModal"

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
     
       
        

      {/* Main Content */}
      <main className="flex-1 bg-gray-900">
      
       
          
             

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

          

        
            
          

          
        </section>
      </main>
    </div>
  );
}
