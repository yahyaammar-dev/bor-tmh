import { getMonthName } from "../../utils/calendarHelpers";

const CalendarNav = ({ month, setMonthCounter, monthCounter }) => {
    const monthName = getMonthName(month)

    const handleNextCalendar = () => {
        if(monthCounter<2){
            setMonthCounter(monthCounter+1)
        }
    }

    const handlePerviousCalendar = () => {
        if(monthCounter>0){
            setMonthCounter(monthCounter-1)
        }
    }
    
    return (
        <div className="flex justify-between p-2 w-[90%] m-auto items-center my-2">
            <div className="next">
                <img className="cursor-pointer w-[10%]" src='/imgs/back.svg' onClick={handlePerviousCalendar} />
            </div>
            <div className="middle cursor-not-allowed">
            <h6 className="px-2 font-bold ">{monthName}</h6>
            </div>
            <div className="perv flex justify-end">
                <img className="cursor-pointer w-[10%]" src='/imgs/next.svg' onClick={handleNextCalendar} />
            </div>
        </div>
    );
};

export default CalendarNav;