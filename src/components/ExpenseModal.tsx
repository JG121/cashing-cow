import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from "@nextui-org/react";
import {Input, Select, SelectSection, SelectItem} from "@nextui-org/react";
import { expenseCategories } from "../components/data";

export default function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  
  return (
    <>
      <Button onPress={onOpen}>+ Expense</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Expense</ModalHeader>
              <ModalBody>
              <Input 
              
              type="number"
              isRequired
              label="Amount"
              placeholder="0.00"
              labelPlacement="outside"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              />

<Select 
        label="Select an Expense" 
        className="max-w-xs" 
      >
       {expenseCategories.map((category) => (
  <SelectItem key={category.value} value={category.value}>
    {category.label}
  </SelectItem>
))}

      </Select>
                
             
             <Input
             label="Can't find Your expense write it here"
             
             />
             
             
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
