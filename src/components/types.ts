export enum ExpenseCategories {
  SalariesandEmployeeWages = "Salaries and Employee Wages",
  RepairandMaintainence = "Repair and Maintainence",
  Rent = "Rent",
  OfficeSupplier = "Office Supplier",
  JanitorialExpense = "Janitorial Expense",
  AutomobileExpense = "Automobile Expense",
  CommisionPayments = "Commision Payments",
  ProductSupply = "Product Supply",
  Grocery = "Grocery",
  Transportation = "Transportation",
  Other = "Other",
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
