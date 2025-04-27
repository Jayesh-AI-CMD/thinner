import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { GSTDetails } from "../home/GSTDetails";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <GSTDetails />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
