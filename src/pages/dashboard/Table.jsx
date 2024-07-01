import React from "react";
import "./Table.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Table({ userData, fetchRecord }) {
  const handleDelete = async (id) => {
    try {
      const respone = await fetch(`http://localhost:5000/records/${id}`, {
        method: "DELETE",
      });
      if (!respone.ok) {
        throw new Error("error deleting the data");
      }
      console.log("data deleted");

      fetchRecord();

    } catch (err) {
      console.log("Error", err);
    }
  };

  if (!Array.isArray(userData)) {
    return <div>no records found to display.</div>;
  }

  return (
    <div className="trackTable">
      <table className="table">
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Date</th>
            <th scope="col">Delete</th>
          </tr>
        <tbody>
          {userData.map((record) => (
            <tr key={record._id}>
              <th scope="row">{record.description}</th>
              <td>{record.amount}</td>
              <td>{record.category}</td>
              <td>{record.paymentType}</td>
              <td>{record.date}</td>
              <td>
                <button className="deleteBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(record._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
