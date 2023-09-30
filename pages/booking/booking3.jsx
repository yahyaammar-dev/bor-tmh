import React from "react";
import Loader from "../../components/Misc/Loader";
import Navbar from "../../components/Misc/Navbar";
import Footer from "../../components/Misc/Footer";
import Booking3 from "../../components/Misc/Booking3";
import { Profiler } from "react";

const index = () => {
  const callback = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
    // console.log(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions)
  }
  return (
    <>
      <Navbar />
      <Profiler id="Panel" onRender={callback}>
        <Booking3 />
      </Profiler>
      <div className="flex justify-center mycontainer">
        <Loader />
      </div>
      <Footer />
    </>
  );
};

export default index;