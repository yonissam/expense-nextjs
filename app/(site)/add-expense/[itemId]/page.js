"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const AddExpense = () => {
  const router = useRouter();
  // const params = useParams();
  const path = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied. Login to continue.</p>;
  }

  const [newExpense, setNewExpense] = useState({
    expense: "",
    date: "",
    category: "",
    amount: "",
  });

  const itemId = path.substring(13, path.length);
  // const itemId = params.itemId;

  useEffect(() => {
    async function getExpenses() {
      if (itemId != -1) {
        try {
          const response = await axios.get(`/api/expenses/${itemId}`);
          if (response.status === 200) {
            const { expense, category, date, amount } = response.data.expense;
            setNewExpense({
              ...newExpense,
              expense: expense,
              category: category,
              date: date,
              amount: amount,
            });
          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          toast.error(error);
          console.log(error);
        }
      } else {
      }
    }
    getExpenses();
  }, [itemId]);
  const handleInputChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (itemId != -1) {
      const updateExpense = async () => {
        try {
          const response = await axios.put(
            `/api/expenses/${itemId}`,
            newExpense,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            setNewExpense({
              expense: "",
              date: "",
              category: "",
              amount: "",
            });
            toast.success("Expense Updated Successfully");
            router.push("/dashboard");
          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          toast.error(error);
          console.log(error);
        }
      };
      updateExpense();
    } else {
      const updateExpense = async () => {
        try {
          const response = await axios.post("/api/expenses", newExpense, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 201) {
            setNewExpense({
              expense: "",
              date: "",
              category: "",
              amount: "",
            });
            toast.success("Expense Added Successfully");
            router.push("/dashboard");
          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          toast.error(error);
          console.log(error);
        }
      };
      updateExpense();
    }
  };

  return (
    <div className="container container-fluid my-5">
      <form
        onSubmit={submitHandler}
        className="border border-secondary rounded p-4"
        style={{ maxWidth: "500px" }}
      >
        <div className="form-outline mb-4 ">
          <input
            id="expense"
            name="expense"
            type="text"
            autoComplete="text"
            placeholder="Expense Item"
            value={newExpense.expense}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-outline mb-4">
          <select
            id="category"
            name="category"
            autoComplete="text"
            value={newExpense.category}
            onChange={handleInputChange}
            required
            className="form-control"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="InstaCart">InstaCart</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Insurance">Insurance</option>
          </select>
        </div>
        <div className="form-outline mb-4">
          <input
            id="date"
            name="date"
            type="date"
            value={newExpense.date}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-outline mb-4">
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
