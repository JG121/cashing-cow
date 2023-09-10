import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input, Select, SelectSection, SelectItem} from "@nextui-org/react";
import { incomeCategories } from "../components/income"


export default function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>+ Income</Button>
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
                        startContent={
                            <div className="pointer-events-none flex items-center">

                            </div>
                        }
                
                />

<Select 
        label="Select an Income" 
        className="max-w-xs" 
      >
       {incomeCategories.map((income) => (
  <SelectItem key={income.value} value={income.value}>
    {income.label}
  </SelectItem>
))}


      </Select>

              <Input 
              
                  label="Can't find Your Expense Write it here"
                  
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
