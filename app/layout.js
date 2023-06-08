import "./globals.css";
import AuthContext from "@/app/context/AuthContext";
import ToasterContext from "@/app/context/ToasterContext";
import "bootstrap/dist/css/bootstrap.css";
import Header from "@/app/components/Header";

export const metadata = {
  title: "Expense App",
  description: "Expense App with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <Header />
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
