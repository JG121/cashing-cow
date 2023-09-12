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
import { incomeCategories } from "../components/income";
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles


export default function IncomeModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State for the selected date

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Button onPress={onOpen} color="success">
        + Income
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Income</ModalHeader>
              <ModalBody>
                <Input
                  type="number"
                  label="Amount"
                  isRequired
                  placeholder="0.00"
                  labelPlacement="outside"
                  startContent={<div className="pointer-events-none flex items-center"></div>}
                />

                <Select label="Select an Income" className="max-w-xs">
                  {incomeCategories.map((income) => (
                    <SelectItem key={income.value} value={income.value}>
                      {income.label}
                    </SelectItem>
                  ))}
                </Select>

                <Input label="Can't find Your Expense Write it here" />

                {/* Date Picker */}
                <div className="my-4">
                  <label className="text-white text-lg">Income Date:</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className="p-2 rounded-lg border border-gray-400 bg-gray-800 text-white w-full"
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
