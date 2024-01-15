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
} from "@nextui-org/react";
import "react-datepicker/dist/react-datepicker.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/components/firebase/index";
import { useUser } from "@clerk/nextjs";
import { ExpenseCategories } from "./types";
import { randomUUID } from "crypto";

export default function ExpenseForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [expenseData, setExpenseData] = useState({
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
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
        category: ExpenseCategories["Commision Payments"], // change this to get the value from the user.
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
      });
      onClose();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Add Expense</Button>

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
                    required
                  />
                </div>
                <div className="mb-4">
                  <Input
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
                <Button type="submit" color="primary">
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
