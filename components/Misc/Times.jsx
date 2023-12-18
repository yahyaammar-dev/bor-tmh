import { useSelector } from "react-redux";
import { handleCalenderSubmission } from "../../utils/calendarHelpers.jsx";
import Button from "./Button.jsx";
import { useEffect } from "react";

const Times = ({
  datesAndTimes,
  setDatesAndTimes,
  handleLocalData,
  router,
}) => {
  const handleTimeClick = (e, index) => {
    setDatesAndTimes({ ...datesAndTimes, selectedTimeIndex: index });
  };
  const reduxData = useSelector((state) => state)

  console.log(datesAndTimes)

  return (
    <div class="flex w-4/4 mt-5 w-full bg-gray-200 p-3 shadow-md">
      <div class="w-4/4 w-full">
        <div className="all_times flex gap-1 flex-wrap justify-around">
          {datesAndTimes?.selectedTimes?.map((time, index) => {
            return (
              <Button
                text={time}
                onClick={(e) => handleTimeClick(e, index)}
                width="md:w-[6rem] w-[3rem]"
                color={datesAndTimes?.selectedTimeIndex == index ? "black" : ""}
              />
            );
          })}
        </div>
        <div className="w-full finalize__times mt-2  flex justify-end">
          <div className="w-full">
            <button
              type="button"
              onClick={() =>
                handleCalenderSubmission(datesAndTimes, handleLocalData, router)
              }
              className={ `flex justify-center w-full font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center ${datesAndTimes?.selectedTimeIndex != null  ? ' bg-[#daa520] hover:bg-yellow-500' : "cursor-not-allowed bg-yellow-100 ugh-black"}` }
              > 
              Move to Checkout
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Times;