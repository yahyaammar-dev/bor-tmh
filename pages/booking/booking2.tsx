import React, { useState } from "react";
import Loader from "@/components/Misc/Loader";
import Navbar from "@/components/Misc/Navbar";
import Footer from "@/components/Misc/Footer";
import Booking2 from "@/components/Misc/Booking2";

const index = () => {
  const [loader, setLoader] = useState(false)
  return (
    <>
      <Navbar />
      <Booking2 />
      <div className="flex justify-center">
        <Loader loader={loader} setLoader={setLoader} />
      </div>
      <Footer />
    </>
  );
};

export default index;
