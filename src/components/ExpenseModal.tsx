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

// Import Firestore from Firebase
import { getFirestore, collection, addDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/components/firebase/index"; // Import your Firebase configuration
import { useUser } from "@clerk/nextjs";

export default function ExpenseForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const currentUser = useUser();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

   
 

    try {
      // Validate the form data
      if (!expenseData.amount || isNaN(expenseData.amount)) {
        throw new Error("Amount must be a valid number.");
      }
  
      // Create a new expense object
      const newExpense = {
        username: currentUser.user?.emailAddresses[0].emailAddress,
        name: expenseData.description, // Use description as the name
        amount: parseFloat(expenseData.amount),
        type:"Expense",
       // date: selectedDate.toISOString().split("T")[0],
      };
  
      // Add the expense to Firestore
      //const docRef = await addDoc(collection(db, "expenses"), newExpense);
      const docReff = await addDoc(collection(db, "expense 2"), newExpense);
      // console.log("Expense added with ID: ", docRef.id);

      // dataaaa.forEach((doc)=>
      //   console.log("data",doc.data())
      // )
      // console.log("Datatatatatat",dataaaa);
  
      // Optionally, you can reset the form or perform other actions
      setExpenseData({
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
      onClose();
    } catch (error) {
      console.error("Error adding expense:", error.message);
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
                    value={expenseData.amount}
                    onChange={(e) =>
                      setExpenseData({ ...expenseData, amount: e.target.value })
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
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className="w-full p-2 rounded-lg border text-black border-gray-400 bg-gray-200"
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="text" color="warning" onClick={onClose}>
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
