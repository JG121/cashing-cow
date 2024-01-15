import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import "react-datepicker/dist/react-datepicker.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/components/firebase/index";
import { useUser } from "@clerk/nextjs";
import { ExpenseCategories } from "./types";

export default function ExpenseForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [expenseData, setExpenseData] = useState({
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
  });
  const currentUser = useUser();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!expenseData.amount || isNaN(expenseData.amount)) {
        throw new Error("Amount must be a valid number.");
      }

      const newExpense = {
        id: self.crypto.randomUUID(),
        username: currentUser.user?.emailAddresses[0].emailAddress,
        name: expenseData.description,
        amount: expenseData.amount,
        category: expenseData.category,
        type: "Expense",
        date: expenseData.date
          ? new Date(expenseData.date).toISOString()
          : null,
      };

      const docRef = await addDoc(collection(db, "expense pro"), newExpense);

      setExpenseData({
        amount: 0,
        description: "",
        date: new Date().toISOString().split("T")[0],
        category:"",
      });
      onClose();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const expenseCategoriesArray = Object.entries(ExpenseCategories).map(([key, value]) => ({
    value: key,
    label: value
  }));

  const handleChange = (e:any) => {
    console.log("valueeeee",e)
    setExpenseData({
      ...expenseData,
      category: ExpenseCategories[e.target.value as keyof typeof ExpenseCategories],
    });
  };

  return (
    <>
      <Button
        className="absolute top-0 right-0 m-2 text-red-500 font-bold  text-2xl py-2 px-4  bg-gray-800"
        onClick={onOpen}
      >
        +
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent style={{ height: "80%" }}>
          {(onClose) => (
            <form onSubmit={handleFormSubmit}>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <div className="mb-4">
                  <Input
                    type="number"
                    name="amount"
                    placeholder="Enter Expense Amount"
                    value={expenseData.amount.toString()}
                    onChange={(e) =>
                      setExpenseData({
                        ...expenseData,
                        amount: parseFloat(e.target.value),
                      })
                    }
                    isRequired
                  />
                </div>

                <Select isRequired label="Select an Expense" className="max-w-xs" onChange={handleChange}>
                  {expenseCategoriesArray.map((expense) => (
                    <SelectItem key={expense.value} value={expense.value} >
                      {expense.label}
                    </SelectItem>
                  ))}
                  
                </Select>

                <div className="mb-4">
                  <Input
                    isRequired
                    type="text"
                    name="description"
                    placeholder="Write Your Expense Here"
                    value={expenseData.description}
                    onChange={(e) =>
                      setExpenseData({
                        ...expenseData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Expense Date:
                  </label>
                  <DatePicker
                    selected={
                      expenseData.date ? new Date(expenseData.date) : null
                    }
                    onChange={(date) =>
                      setExpenseData({
                        ...expenseData,
                        date: date ? date.toISOString() : "",
                      })
                    }
                    className="w-full p-2 rounded-lg border text-black border-gray-400 bg-gray-200"
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={onClose} type="submit" color="primary">
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
