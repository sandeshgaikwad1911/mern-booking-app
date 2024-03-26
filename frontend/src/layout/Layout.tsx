import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto py-10 flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

// flex-1 => will take all available space.
