"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  async function submitHandler(e) {
    e.preventDefault();
    if (isSubmitting === false) {
      toast.success(
        "Check your email for the OTP, password will expire after 5 minutes"
      );
      const response = await axios.post(
        "/api/password",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;

      setIsSubmitting(true);
    } else {
      const response = await axios.post(
        "/api/reset",
        {
          email: email,
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      if (response.status === 200) {
        toast.success("OTP verified");
        router.push("/password/reset");
      } else {
        toast.error(data.message);
      }
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
            <h1 className="mb-4">Reset Password</h1>
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
            {isSubmitting && (
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="otp">
                  OTP
                </label>
                <input
                  type="password"
                  id="otp"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
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

export default PasswordReset;
