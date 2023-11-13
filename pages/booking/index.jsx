import React, { useEffect } from "react";
import Loader from "../../components/Misc/Loader";
import Navbar from "../../components/Misc/Navbar";
import Footer from "../../components/Misc/Footer";
import Booking1 from "../../components/Misc/Booking1";
import { useState } from "react";

const index = () => {
  const [loader, setLoader] = useState(false)
  
  
  return (
    <>
      <Navbar />
      <Booking1  loader ={loader} setLoader={setLoader} />
      <div className="flex justify-center mycontainer">
        <Loader loader={loader} />
      </div>
      <Footer />
    </>
  );
};

export default index;