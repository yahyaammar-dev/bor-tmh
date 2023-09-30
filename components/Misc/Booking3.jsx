import React, { useEffect, useState } from "react";
import BookingHanlders from "../../services/BookingHandlers";
import { useDispatch, useSelector } from "react-redux";
import { setAvailibilites } from "../../utils/calendarHelpers";
import Calendar from "./Calendar";

const Booking2 = () => {

  // ************************************
  // states
  // ************************************

  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch()
  const [datesAndTimes, setDatesAndTimes] = useState({
    month: '',
    datesAndTimes: [],
    monthName: ''
  }); 


  // ************************************
  // effects
  // ************************************

  useEffect(() => {
    if (Object.keys(reduxData?.appData?.availibilitiesData).length == 0){
      BookingHanlders(reduxData)
        .then((res) => {
          dispatch({ type: "STOREAVAILIBILITES", payload: res })
          setAvailibilites(res, setDatesAndTimes, reduxData)
        })
    }else {
      let res = null
      setAvailibilites( res , setDatesAndTimes, reduxData)
    }
  }, [])


  // ************************************
  // ui
  // ************************************

  return (
    <div>
      <div className="booking2 custom__conatiner mx-auto flex justify-center">
        <Calendar datesAndTimes={datesAndTimes}  />      
      </div>
    </div>
  );
};

export default Booking2;