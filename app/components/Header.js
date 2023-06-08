"use client";
import React from "react";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data } = useSession();
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container">
        <div className="d-flex justify-content-start">
          <a className="navbar-brand me-2" href="https://mdbgo.com/">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="16"
              alt="MDB Logo"
              loading="lazy"
              style={{ marginTop: "-1px" }}
            />
          </a>
        </div>

        <div className="d-flex justify-content-end col-9 mt-3 mt-md-0 text-center">
          {data?.user ? (
            <div className="d-flex align-items-center">
              <h5>Hi, {data?.user?.name}</h5>

              <button
                type="button"
                className="btn btn-link px-3 me-2"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>

              <button
                type="button"
                className="btn btn-warning me-3"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-link px-3 me-2"
                onClick={() => router.push("/login")}
              >
                Login
              </button>

              <button
                type="button"
                className="btn btn-primary me-3"
                onClick={() => router.push("/register")}
              >
                Sign up for free
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
