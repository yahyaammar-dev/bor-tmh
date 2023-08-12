import React from "react";
import Loader from "../../components/Misc/Loader";
import Navbar from "../../components/Misc/Navbar";
import Footer from "../../components/Misc/Footer";
import Booking4 from "../../components/Misc/Booking4";

const booking4 = () => {
  return (
    <>
      <Navbar />
      <Booking4 />
      <div className="flex justify-center">
        <Loader />
      </div>
      <Footer />
    </>
  );
};

export default booking4;
