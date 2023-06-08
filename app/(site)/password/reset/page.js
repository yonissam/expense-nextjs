"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const PasswordChangePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  async function submitHandler(e) {
    e.preventDefault();
    const response = await axios.post(
      "/api/new-password",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.data;
    if (response.status === 200) {
      toast.success("Password Changed Successfully");
      router.push("/login");
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="container container-fluid">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-10 col-lg-5 ">
          <form
            className="border border-secondary rounded p-4"
            onSubmit={submitHandler}
          >
            <h1 className="mb-4">Enter New Password</h1>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email_field">
                Email address
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password_field">
                New Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-block w-100 btn-primary btn-block mb-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangePage;
