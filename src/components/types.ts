export enum ExpenseCategories {
  "Salaries and Employee Wages",
  "Repair and Maintainence",
  "Rent",
  "Office Supplier",
  "Janitorial Expense",
  "Automobile Expense",
  "Commision Payments",
  "Product Supply",
  "Grocery",
  "Transportation",
  "Other",
}

export type Expense = {
  id: number;
  amount: number;
  name: string;
  description: string;
  date: string;
  category: string;
  type: string;
};
export enum Type {
  Income = "Income",
  Expense = "Expense",
}
