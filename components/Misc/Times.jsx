import { handleCalenderSubmission } from "../../utils/calendarHelpers.jsx";
import Button from "./Button.jsx";
const Times = ({
  datesAndTimes,
  setDatesAndTimes,
  handleLocalData,
  router,
}) => {
  const handleTimeClick = (e, index) => {
    setDatesAndTimes({ ...datesAndTimes, selectedTimeIndex: index });
  };

  return (
    <div class="flex  w-3/4 mt-2">
      <div class="w-1/4 bg-gray-300 flex justify-center items-center flex-col"></div>
      <div class="w-3/4 bg-[#f5f5f5] p-2">
        <div className="all_times flex gap-1 flex-wrap justify-around">
          {datesAndTimes?.selectedTimes?.map((time, index) => {
            return (
              <Button
                text={time}
                onClick={(e) => handleTimeClick(e, index)}
                width="w-[6rem]"
                color={datesAndTimes?.selectedTimeIndex == index ? "black" : ""}
              />
            );
          })}
        </div>
        <div className="finalize__times mt-2  flex justify-end">
          <div>
            <button
              type="button"
              onClick={() =>
                handleCalenderSubmission(datesAndTimes, handleLocalData, router)
              }
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
