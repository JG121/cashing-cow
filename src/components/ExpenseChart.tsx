import { AreaChart, Card, Title } from "@tremor/react";
import { useState } from "react";
import { Expense, Type } from "./types";

const sumExpensesAndIncome = (data: Expense[]) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthlySums = {} as any;
  data.forEach((item) => {
    const date = new Date(item.date);
    const month = months[date.getMonth()];
    if (!monthlySums[month]) {
      monthlySums[month] = { expense: 0, income: 0 };
    }

    if (item.type === Type.Expense) {
      monthlySums[month].expense += item.amount;
    } else if (item.type === Type.Income) {
      monthlySums[month].income += item.amount;
    }
  });

  return Object.keys(monthlySums).map((month) => ({
    month,
    expense: monthlySums[month].expense,
    income: monthlySums[month].income,
  }));
};

const valueFormatter = function (number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

interface ExpenseChartProps {
  data: Expense[];
}
export const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const [value, setValue] = useState(null);

  const dataa = Array.isArray(data) ? sumExpensesAndIncome(data) : [];
  return (
    <div className="bg-gray-800 p-6 shadow-lg rounded-lg mt-8">
      <Card className="bg-gray-800">
        <Title className=" text-white">Expense vs Income (USD)</Title>
        <AreaChart
          className="h-72 mt-4"
          data={dataa}
          index="month"
          showAnimation
          showGridLines
          autoMinValue
          yAxisWidth={65}
          categories={["expense", "income"]}
          colors={["green", "red"]}
          valueFormatter={valueFormatter}
          onValueChange={(v: any) => setValue(v)}
          connectNulls={true}
          noDataText="No expense data found."
        />
      </Card>
    </div>
  );
};
