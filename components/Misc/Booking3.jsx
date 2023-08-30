import React, { useEffect, useState } from "react";
import CategoryCheckbox from "./CategoryCheckbox";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";
import {
  getProfessionalDetail,
  getSubCategories,
  getcorporateprofessionalServices,
  getAvailability,
  getAvailabilityData,
} from "../../pages/api/hello";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useDataHandler } from "../../utils/dataHandler"; // Import the useDataHandler function from the dataHandler.js file
import axios from "axios";

const Booking2 = ({ loader, setLoader }) => {




  const [clickedDate, setClickedDate] = useState()
  const [times, setTimes] = useState([]);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [repeatableDatesNext6Months, setRepeatableDatesNext6Months] = useState([]);
  const [repeatableDays, setRepeatableDays] = useState({});
  const [currentDate] = useState(new Date());
  const [checkTime, setCheckTime] = useState(false);
  const [checkSaveDate, setCheckSaveDate] = useState(false);
  const [currentYear, setCurrentYear] = useState(
    currentDate.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState(
    currentDate.getMonth()
  );
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const currentmonth = currentMonth;
  const currentyear = currentYear;
  const router = useRouter();
  // const reduxData = useSelector((state) => state);
  const navigate_to_booking3 = () => {
    router.push("/booking3");
  };
  const { reduxData, handleLocalData } = useDataHandler(setLoader); // Use the useDataHandler hook to access the functions and state

  const getProfessionalAvailibility = async () => {
    try {
      const data1 = {
        proId: reduxData?.appData?.currentProfessional?.id,
        subId: reduxData?.appData?.currentSub?.id,
        gender: reduxData?.appData?.currentGen?.id,
      };
      const response = await getAvailability(data1);
      // fetch("http://localhost:3001/availableDays")
      // .then(res => res.json())
      // .then((data) => {
      //   setData(data);
      //   setAvailableDays(data)})
      // Handle the successful response
      const data = response[0].availableDays;
      setData(data);
      setAvailableDays(data);
    } catch (error) {
      // Handle errors (e.g., network error, server error)
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getProfessionalAvailibility();
  }, []);

  function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  useEffect(() => {
    // Step 6: Calculate repeatable dates for the next 6 months
    const currentDate = new Date();
    const sixMonthsLater = new Date(currentDate);
    sixMonthsLater.setMonth(currentDate.getMonth() + 6);

    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const repeatableDates = [];

    for (
      let currentDay = currentDate;
      currentDay <= sixMonthsLater;
      currentDay.setTime(currentDay.getTime() + oneDay)
    ) {
      const currentDayOfWeek = currentDay.getDay();

      // Check if the current day is a repeatable day
      if (repeatableDays[currentDayOfWeek]) {
        repeatableDates.push(currentDay.toISOString().split("T")[0]);
      }
    }
    // Update the state with the repeatable dates
    setRepeatableDatesNext6Months(repeatableDates);
  }, [repeatableDays]);

  useEffect(() => {
    // Step 4: Iterate through 'availableDays' and store repeatable days
    if (availableDays && availableDays.length > 0) {
      const repeatableDaysObj = {};
      availableDays.forEach((day) => {
        if (day.repeatable && !day.deleted) {
          repeatableDaysObj[day.day] = true; // Mark the day as repeatable
        }
      });
      setRepeatableDays(repeatableDaysObj);
    }
  }, [availableDays]);

  const createCalendar = (year, month) => {
    const daysContainer = document.querySelector(".days-container");
    if (!daysContainer) return;

    daysContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = getLastDayOfMonth(year, month);

    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement("div");
      daysContainer.appendChild(emptyDay);
    }

    for (let day = 1; day <= lastDay; day++) {
      const dayElement = document.createElement("div");
      dayElement.textContent = day.toString();
      dayElement.classList.add("day");

      const currentDate = new Date(year, month, day + 2);
      const currentDateStr = currentDate.toISOString().split("T")[0];
      if (repeatableDatesNext6Months.includes(currentDateStr)) {
        dayElement.classList.add("green-day");
        const dotElement = document.createElement("div");
        dotElement.classList.add("dot");
        dayElement.appendChild(dotElement);
        if(clickedDate == dayElement.innerHTML.slice(0,2)){
          dayElement.classList.add('yelloo_bg')
        }
      }
      daysContainer.appendChild(dayElement);
    }

    const header = document.querySelector(".header");
    if (header) {
      header.textContent =
        new Date(year, month, 1).toLocaleString("default", { month: "long" }) +
        " " +
        year;
    }
  };

  useEffect(() => {
    createCalendar(currentYear, currentMonth);
  });

  const nextMonth = () => {
    const nextMonth = currentMonth + 1;

    if (nextMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(nextMonth);
    }
    setPrevButtonDisabled(
      currentyear < currentYear ||
      (currentyear === currentYear && currentmonth <= currentMonth)
    );
  };

  const prevMonth = () => {
    const prevMonth = currentMonth - 1;
    if (prevMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(prevMonth);
    }
    setPrevButtonDisabled(
      currentyear < currentYear ||
      (currentyear === currentYear && currentmonth <= currentMonth)
    );
  };
  const getDayTime = async () => {
    // try{
    // const data1 = {
    //   proId: reduxData?.appData?.currentProfessional?.id,
    //   date: date
    // }
    // const response = await getAvailabilityData(data1);
    // }
    // catch (error) {
    //   // Handle errors (e.g., network error, server error)
    //   console.error('Error:', error.message);
    // }
  };
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (e) => {
    const clickedTime = e.target.value;
    setCheckTime(true);
    if (selectedTime === clickedTime) {
      setSelectedTime(null);
    } else {
      setSelectedTime(clickedTime);
    }
    handleLocalData({
      type: "currenttime",
      data: e.target.value
    })
    setCheckSaveDate(false)
    handleAfterTime()
  }



  // If the clicked button is already selected, unselect it

  const handleDateClick = (event) => {
    const clickedElement = event.target;
    setClickedDate(clickedElement.innerHTML.slice(0,2))
    const totalDuration = reduxData?.appData?.cart.reduce((total, item) => total + item.duration, 0);
    const currentDate = `${clickedElement.innerText <= 9 ? 0 : ""}` + clickedElement.innerText + "-" + `${currentMonth <= 9 ? 0 : ""}` + currentMonth + "-" + currentYear;
    handleLocalData({
      type: "currentDate",
      data: currentDate
    })
    const data = {
      proId: reduxData?.appData?.currentProfessional?.id,
      date: currentDate,
      duration: totalDuration
    }

    if (clickedElement.classList.contains('green-day')) {
      clickedElement.classList.add("bg_brown");
      getAvailabilityData(data).then((res) => {
        setTimes(res.times);
        setCheckTime(false);
        setCheckSaveDate(false);
        setMessage(res.message);
      });
      handleAfterDate()
    }
  };
  const handleAfterDate = () => {
    handleLocalData({
      type1: "remove",
      type: "resetDataAfterDate",
    });
  }
  const handleAfterTime = () => {
    handleLocalData({
      type1: "remove",
      type: "resetDataAfterTime",
    });
  }
  const handleNextPage = () => {
    if (checkSaveDate) {
      router.push('/booking/booking4')
    }
  }


  const handleSaveDate = () => {
    if (checkTime) {
      setCheckSaveDate(true)
    }
  }


  console.log('booking3', reduxData)


  return (
    <div>
      {console.log('asfd',reduxData.appData)}
      {/* Booking 2 */}
      <div className="booking2 custom__conatiner mx-auto">
        {/* Porfessional Detail */}
        <div className="flex gap-10">
          <div className="item w-3/12">
            <img src="https://takemihome.it/upload/media/default/0001/01/thumb_603_default_card.jpeg" />
          </div>
          <div className="item w-7/12">
            <h2 className="mb-1 text-4xl font-extrabold dark:text-white">
              Sarah Shitty
            </h2>
            <h3 className="mb-6 text-xl font-bold dark:text-white">
              Makeup Artist
            </h3>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
              Deliver great service experiences fast - without the complexity of
              traditional ITSM solutions. Accelerate critical development work,
              eliminate toil, and deploy changes with ease. Deliver great
              service experiences fast - without the complexity of traditional
              ITSM solutions. Accelerate critical development work, eliminate
              toil, and deploy changes with ease. Deliver great service
              experiences fast - without the complexity of traditional ITSM
              solutions. Accelerate critical development work, eliminate toil,
              and deploy changes with ease.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center my-0 border-t border-gray-500 px-6 py-6 mx-auto mycustomwidth bg-gray-50">
        <div className="flex justify-center items-center italic font-normal font-sans text-lg">
          <h1>
            Schedule Your Appointment
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <button id="prevBtn" onClick={prevMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <p className="header font-bold text-lg m-16"></p>
          <button id="nextBtn" onClick={nextMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
        <div>
          <div className="grid grid-cols-7 font-bold gap-5">
            <div className="flex justify-center items-center">M0</div>
            <div className="flex justify-center items-center">TU</div>
            <div className="flex justify-center items-center">WE</div>
            <div className="flex justify-center items-center">TH</div>
            <div className="flex justify-center items-center">FR</div>
            <div className="flex justify-center items-center">SA</div>
            <div className="flex justify-center items-center">SU</div>
          </div>
          <div
            onClick={(e) => handleDateClick(e)}
            className="days-container grid grid-cols-7 gap-5"
          >
            <div className="day">Sun</div>
            <div className="day">Mon</div>
            <div className="day">Tue</div>
            <div className="day">Wed</div>
            <div className="day">Thrs</div>
            <div className="day">Fri</div>
            <div className="day">Sat</div>
          </div>
          <div className="border-b mt-12 border-gray-500"></div>
          <div>
            <div className="flex flex-wrap my-4">
              {times.length > 0 ?
                times.map((time) => (
                  <div
                    key={time}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2"
                  >
                    <input
                      key={time}
                      className={`py-4 px-6 border-none mx-2 my-2 text-center cursor-pointer w-full ${selectedTime === time ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'
                        }`}
                      type="button"
                      value={time}
                      onClick={handleTimeClick}
                    />
                  </div>
                )) : reduxData?.appData?.currentTime ?
                  <input
                    className={`py-4 px-6 border-none mx-2 my-2 text-center cursor-pointer w-full bg-yellow-500 text-black`}
                    type="button"
                    value={reduxData?.appData?.currentTime}
                    onClick={handleTimeClick}
                  /> : ""}
              {message &&
                <p>{message}</p>
              }
            </div>

            {/* <p className="w-3/4 my-0 my-6 text-justify bg-pink-100 p-4 mx-auto">
                            The required time for your service is: 110 min. There is no time slot available on this date, please select another date or contact the Concierge +39 333 8131426
                        </p> */}
          </div>
          <div className="flex justify-center items-center bg-gray-500 w-1/2 mx-auto p-3 font-serif text-white" style={checkTime === true ? { backgroundColor: "#DAA520" } : {}}>
            <button onClick={handleSaveDate}>SAVE THE DATA AND TIME</button>
          </div>
          <div className="flex justify-end">
            <input
              style={checkSaveDate ? { backgroundColor: "#DAA520" } : { backgroundColor: "#6B7280" }}
              className="py-4 px-6 border-none mx-2 my-2 text-center text-white cursor-pointer"
              type="button"
              value="Next"
              onClick={handleNextPage}
            />
          </div>
        </div>
      </div>


      
      {/* Select Service */}
      {/* <div className="mt-20 booking2 custom__conatiner mx-auto text-center">
        <div className="mb-20 mt-10">
          <h2 className="text-center mb-1 text-4xl font-extrabold dark:text-white">
            What day will suit you best?
          </h2>
          <h3 className="text-center mb-6 text-xl font-bold dark:text-white">
            Select Your Day and Time
          </h3>
        </div>
        <div className="flex"> */}
      {/* <div className="w-6/12 border p-5">
            <p>My Booking with</p>
            <h1>Solvoa Aru</h1>
            <div className="cart__report">
              <ul>
                <li>My Service</li>
                <li>Beauty and wellness / Wazing/ woman</li>
                <div className="category__checkbox flex gap-10 border py-3 justify-between px-3">
                  <p>Brows Lashes</p>
                  <div className="flex items-center">
                    <img src="/imgs/addIcon.svg" />
                    <p>15min</p>
                    <p className="mx-10">|</p>
                    <img src="/imgs/addIcon.svg" />
                    <p>15min</p>
                  </div>
                </div>
              </ul>
              <div className="category__checkbox flex gap-10 border py-3 justify-between px-3">
                <p>Brows Lashes</p>
                <div className="flex items-center">
                  <img src="/imgs/addIcon.svg" />
                  <p>15min</p>
                  <p className="mx-10">|</p>
                  <img src="/imgs/addIcon.svg" />
                  <p>15min</p>
                </div>
              </div>
              <hr />
              <div className="flex mt-5">
                <p>Total Amount: </p>
                <pre> </pre>
                <p>75 euro</p>
              </div>
            </div>
          </div> */}
      {/* <div className="w-full">
            <div className="flex items-center justify-center">
              <div className="max-w-sm w-full shadow-lg">
                <div className="md:p- p-5 dark:bg-gray-800 bg-white rounded-t">
                  <div className="px-4 flex items-center justify-between">
                    <span
                      tabindex="0"
                      className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
                    >
                      October 2020
                    </span>
                    <div className="flex items-center">
                      <button
                        aria-label="calendar backward"
                        className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-left"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <polyline points="15 6 9 12 15 18" />
                        </svg>
                      </button>
                      <button
                        aria-label="calendar forward"
                        className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler  icon-tabler-chevron-right"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <polyline points="9 6 15 12 9 18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-12 overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Mo
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Tu
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                We
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Th
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Fr
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Sa
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Su
                              </p>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                          </td>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                          </td>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                1
                              </p>
                            </div>
                          </td>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                2
                              </p>
                            </div>
                          </td>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                3
                              </p>
                            </div>
                          </td>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                4
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                5
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                6
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                7
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="w-full h-full">
                              <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                <a
                                  role="link"
                                  tabindex="0"
                                  className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full"
                                >
                                  8
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                9
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                10
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                11
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                12
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                13
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                14
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                15
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                16
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                17
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                18
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                19
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                20
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                21
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                22
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                23
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                24
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                25
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                26
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                27
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                28
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                29
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                30
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mt-10">
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                </div>
                <div className="my-10">
                  <Button text="Save Date and Time" outlined />
                </div>
                <div className="flex flex-wrap gap-5 justify-center my-10">
                  <Button text='Back' outlined />
                  <Button text='Next' filled w-full onClick={()=>router.push('booking4')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Booking2;

