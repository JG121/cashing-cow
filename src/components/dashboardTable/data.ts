import React from "react";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "DESCRIPTION", uid: "description" },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "CATEGORY", uid: "category", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
];

const typeOptions = [
  { name: "Expense", uid: "Expense" },
  { name: "Income", uid: "Income" },
];

export { columns, typeOptions };
