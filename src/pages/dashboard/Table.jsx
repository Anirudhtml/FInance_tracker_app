import React from "react";
import "./Table.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Table({ userData, fetchRecord }) {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://node-server-03vo.onrender.com/records/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("error deleting the data");
      }
      console.log("data deleted");

      fetchRecord();
    } catch (err) {
      console.log("Error", err);
    }
  };

  if (!Array.isArray(userData)) {
    return <div>No records found to display.</div>;
  }

  return (
    <div className="table-responsive">
      <div className="tableWrapper">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((record) => (
              <tr key={record._id}>
                <td>{record.description}</td>
                <td>{record.amount}</td>
                <td>{record.category}</td>
                <td>{record.paymentType}</td>
                <td>{record.date}</td>
                <td>
                  <button
                    className="deleteBtn"
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
    </div>
  );
}

export default Table;
