import React from "react";
import Loader from "../../components/Misc/Loader";
import Navbar from "../../components/Misc/Navbar";
import Footer from "../../components/Misc/Footer";
import Booking3 from "../../components/Misc/Booking3";

const index = () => {
  return (
    <>
      <Navbar />
      <Booking3 />
      <div className="flex justify-center">
        <Loader />
      </div>
      <Footer />
    </>
  );
};

export default index;
