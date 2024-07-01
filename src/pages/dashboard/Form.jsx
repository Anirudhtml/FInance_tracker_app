import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import Table from "./Table";
import "./Form.css";

function Form() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [records, setRecords] = useState([]);

  const { user } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newRecord = {
      userID: user?.id,
      date: new Date().toLocaleDateString(),
      description: description,
      amount: parseFloat(amount),
      category: category,
      paymentType: paymentType,
    };

    try {
      const response = await fetch("http://localhost:5000/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord),
      });

      if (!response.ok) {
        throw new Error("Failed to add a record");
      }

      const result = await response.json();
      console.log("Record added", result);

      setDescription("");
      setAmount("");
      setCategory("");
      setPaymentType("");

      fetchRecord();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const fetchRecord = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/recordByUserID/${user?.id}`
      );
      if (!response.ok) {
        throw new Error("failed to get the records");
      }

      const data = await response.json();
      setRecords(data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const addTotalAmount = () => {
    return records.reduce((sum, record) => sum + record.amount, 0);
  };

  useEffect(() => {
    if (user) {
      fetchRecord();
    }
  }, [user]);

  return (
    <div className="formContainer">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="formField">
            <label className="label">Description:</label>
            <input
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              value={description}
              type="text"
              required
              className="input"
            />
          </div>
          <div className="formField">
            <label className="label">Amount:</label>
            <input
              onChange={(event) => {
                setAmount(event.target.value);
              }}
              value={amount}
              type="number"
              required
              className="input"
            />
          </div>
          <div className="formField">
            <label className="label">Category:</label>
            <select
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              value={category}
              className="input"
            >
              <option value="">Select a Category</option>
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Salary">Salary</option>
              <option value="Utilites">Utilities</option>
              <option value="Fun">Fun</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="formField">
            <label className="label">Payment Method:</label>
            <select
              onChange={(event) => {
                setPaymentType(event.target.value);
              }}
              value={paymentType}
              className="input"
            >
              <option value="">Select a Payment Method</option>
              <option value="Credit">Credit</option>
              <option value="Cash">Cash</option>
              <option value="Debit">Debit</option>
            </select>
          </div>
          <button type="submit" className="addBtn">
            Add Record
          </button>
          <p className="monthlyFunds">Total Monthly: ${addTotalAmount()}</p>
        </form>
      </div>

      <div className="table">
        <Table fetchRecord={fetchRecord} userData={records} />
      </div>
    </div>
  );
}

export default Form;
