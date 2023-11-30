import React, { useEffect, useState } from "react";
import BookingHanlders from "../../services/BookingHandlers";
import { useDispatch, useSelector } from "react-redux";
import { setAvailibilites } from "../../utils/calendarHelpers";
import Calendar from "./Calendar";
import Times from "./Times";
import { useDataHandler } from "../../utils/dataHandler";
import { useRouter } from "next/router";

const Booking2 = () => {

  // ************************************
  // states
  // ************************************
  const { handleLocalData } = useDataHandler();
  const reduxData = useSelector((state) => state)
  const dispatch = useDispatch()
  const [datesAndTimes, setDatesAndTimes] = useState({
    month: '',
    datesAndTimes: [],
    monthName: '',
    selectedTimes: [],
    selectedTimeIndex: null
  })
  const [monthCounter, setMonthCounter] = useState(0)
  const router = useRouter()


  // ************************************
  // effects
  // ************************************


  useEffect(() => {
    if (
      !reduxData?.appData?.availibilitiesData ||
      (typeof reduxData.appData.availibilitiesData === 'object' &&
        Object.keys(reduxData.appData.availibilitiesData).length === 0)
    ) {
      BookingHanlders(reduxData)
        .then((res) => {
          dispatch({ type: "STOREAVAILIBILITES", payload: res })
          setAvailibilites(res, setDatesAndTimes, reduxData, monthCounter)
        })
    } else {
      let res = null
      setAvailibilites(res, setDatesAndTimes, reduxData, monthCounter)
    }
  }, [monthCounter])


  // ************************************
  // ui
  // ************************************

  return (
    <div>
      <div className="booking2 custom__conatiner mx-auto flex justify-center items-center flex-col">
        <Calendar
          datesAndTimes={datesAndTimes}
          setMonthCounter={setMonthCounter}
          monthCounter={monthCounter}
          setDatesAndTimes={setDatesAndTimes}
        />
        {
          datesAndTimes?.selectedTimes?.length > 0 && <Times
            datesAndTimes={datesAndTimes}
            setDatesAndTimes={setDatesAndTimes}
            handleLocalData={handleLocalData}
            router={router}
          />
        }
      </div>
    </div>
  );
};

export default Booking2;