"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  if (status === "authenticated") {
    router.push("/dashboard");
  }
  return (
    <div
      style={{
        background:
          "url(https://media.istockphoto.com/id/1388013584/photo/cloud-computing-technology-concept-transfer-database-to-cloud-there-is-a-large-cloud-icon.jpg?s=2048x2048&w=is&k=20&c=NEei0zqjHNDEpR0nXqdZZ7jx69DKbfQQLH3zi09FBQs=)",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search"
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default HomePage;
