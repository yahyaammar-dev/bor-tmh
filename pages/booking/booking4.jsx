import React, { useEffect } from "react";
import Loader from "../../components/Misc/Loader";
import Navbar from "../../components/Misc/Navbar";
import Footer from "../../components/Misc/Footer";
import Booking4 from "../../components/Misc/Booking4";
import { useRouter } from "next/router";

const booking4 = () => {

  const router = useRouter()

  useEffect(() => {
    if(!window.localStorage.getItem('user_profile')){
      router.push("/login"); 
    }
  }, [])


  return (
    <>
      <Navbar />
      <Booking4 />
      <div className="flex justify-center mycontainer">
        <Loader />
      </div>
      <Footer />
    </>
  );
};

export default booking4;
