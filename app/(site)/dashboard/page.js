"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied. Login to continue.</p>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/expenses");
        const data = response.data.expenses;
        setExpenses(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (itemId) => {
    router.push(`/add-expense/${itemId}`);
  };

  const handleDelete = async (itemId) => {
    try {
      // Make an API call to delete the item with the specified itemId
      await axios.delete(`/api/expenses/${itemId}`);

      // After successfully deleting the item, you can update the expenses state
      setExpenses((prevExpenses) =>
        prevExpenses.filter((item) => item._id !== itemId)
      );
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  // Filter expenses based on search query
  const filteredExpenses = expenses.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedExpenses = filteredExpenses.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredExpenses.length / pageSize);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-5 px-2">
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <div className="container-fluid">
          <form className="d-flex input-group w-50 mx-auto">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
      </div>
      <div className="panel-body table-responsive my-5">
        <table className="table table-striped table-hover align-content-center mb-0">
          <thead>
            <tr style={{ textAlign: "center", fontFamily: "Sofia" }}>
              <th scope="col" width="20%">
                Expense item
              </th>
              <th scope="col" width="20%">
                Date
              </th>
              <th scope="col" width="20%">
                Category
              </th>
              <th scope="col" width="20%">
                Amount
              </th>
              <th scope="col" width="20%">
                Update
              </th>
              <th scope="col" width="20%">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedExpenses.map((item) => (
              <tr
                key={item._id}
                style={{ textAlign: "center", fontFamily: "Sofia" }}
              >
                <td>{item.expense}</td>
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>${item.amount}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdate(item._id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      alert("Are you sure you want to delete this item?");
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination d-flex justify-content-center mt-3">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`btn ${
                  page === currentPage ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
        <div className=" d-flex justify-content-center my-3">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              router.push("/add-expense/-1");
            }}
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
