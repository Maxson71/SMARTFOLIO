"use client"
import {useState} from "react";
import CustomModal from "@/components/CustomModal";

const TransactionForm = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
            <CustomModal active={modalIsOpen} setActive={setModalIsOpen}>
                <h2>Modal Title</h2>
                <p>Modal content goes here.</p>
                <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
            </CustomModal>
        </div>
    );
}

export default TransactionForm;