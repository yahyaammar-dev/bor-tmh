import { handleTimeClick, weekDays } from "../../utils/calendarHelpers";
import CalendarHeading from "./CalendarHeading";
import CalendarItem from "./CalendarItem";
import CalendarLeft from "./CalendarLeft";
import CalendarNav from "./CalendarNav";
import Loader from "./Loader";

const Calendar = ({
  datesAndTimes,
  setDatesAndTimes,
  setMonthCounter,
  monthCounter,
}) => {
  return (
    <div class="flex flex-col place-items-center md:flex-row bg-gray-200 shadow-md">
      <CalendarLeft />
      <div class="w-9/12 bg-[#f5f5f5] sm:w-12/12 w-[100%]">
        <CalendarNav
          month={datesAndTimes?.month}
          setMonthCounter={setMonthCounter}
          monthCounter={monthCounter}
        />
        <div className="calendar__container p-2">
          <div className="grid grid-cols-7 gap-1/2 ">
            {weekDays?.map((dayName) => (
              <CalendarHeading text={dayName} key={dayName} />
            ))}
          </div>
          <div className="py-1">
            <hr class="h-px bg-gray-100 border-0 dark:bg-gray-900" />
          </div>
          <div className="grid grid-cols-7  gap-1/2">
            {datesAndTimes?.datesAndTimes?.length > 0 ? (
              datesAndTimes?.datesAndTimes?.map((day) => (
                <CalendarItem
                  handleTimeClick={(e) => {
                    handleTimeClick(e, datesAndTimes, setDatesAndTimes);
                  }}
                  text={day?.text}
                  available={day?.available}
                  active={day?.active}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;