import Footer from "@/components/Misc/Footer";
import Navbar from "@/components/Misc/Navbar";
import { useEffect, useState } from "react";


const Calendar: React.FC = () => {
    const [data, setData] = useState<string[]>([]);
    const [availableDays, setAvailableDays] = useState<string[]>([]);
    const [repeatableDatesNext6Months, setRepeatableDatesNext6Months] = useState<string[]>([]);
    const [repeatableDays, setRepeatableDays] = useState<{ [key: number]: boolean }>({});
    const [currentDate] = useState(new Date());
    const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
    const currentmonth = currentMonth;
    const currentyear = currentYear;

    useEffect(() => {
        fetch("http://localhost:3001/availableDays")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setAvailableDays(data);
            })
            .catch((err) => console.log(err.message));
    }, []);

    function getLastDayOfMonth(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }

    useEffect(() => {
        // Step 6: Calculate repeatable dates for the next 6 months
        const currentDate = new Date();
        const sixMonthsLater = new Date(currentDate);
        sixMonthsLater.setMonth(currentDate.getMonth() + 6);

        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
        const repeatableDates: string[] = [];

        for (let currentDay = currentDate; currentDay <= sixMonthsLater; currentDay.setTime(currentDay.getTime() + oneDay)) {
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
            const repeatableDaysObj: { [key: number]: boolean } = {};
            availableDays.forEach((day) => {
                if (day.repeatable && !day.deleted) {
                    repeatableDaysObj[day.day] = true; // Mark the day as repeatable
                }
            });
            setRepeatableDays(repeatableDaysObj);
        }
    }, [availableDays]);

    const createCalendar = (year: number, month: number) => {
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

            const currentDate = new Date(year, month, day + 1);
            const currentDateStr = currentDate.toISOString().split("T")[0];
            if (repeatableDatesNext6Months.includes(currentDateStr)) {
                dayElement.classList.add("green-day");
                dayElement.classList.add("dot");
            }
            daysContainer.appendChild(dayElement);
        }

        const header = document.querySelector(".header");
        if (header) {
            header.textContent = new Date(year, month, 1).toLocaleString("default", { month: "long" }) + " " + year;
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
    };

    const prevMonth = () => {
        const prevMonth = currentMonth - 1;
        if (prevMonth < 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(prevMonth);
        }
        setPrevButtonDisabled(currentyear < currentYear || (currentyear === currentYear && currentmonth <= currentMonth));
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center my-0 border-t border-gray-500 px-6 py-6 mx-auto w-1/2 bg-gray-50">
                <div className="flex justify-center items-center italic font-normal font-sans text-lg">schedule your appointment</div>
                <div className="flex justify-between items-center">
                    <button id="prevBtn" onClick={prevMonth} disabled={prevButtonDisabled}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                    </button>
                        <p className="header font-bold text-lg m-16"></p>
                    <button id="nextBtn" onClick={nextMonth}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
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
                    <div className="days-container grid grid-cols-7 gap-5">
                        <div className="day">Sun</div>
                        <div className="day">Mon</div>
                        <div className="day">Tue</div>
                        <div className="day">Wed</div>
                        <div className="day">Thrs</div>
                        <div className="day">Fri</div>
                        <div className="day">Sat</div>
                    </div>
                    <div className='border-b mt-12 border-gray-500'>

                    </div>
                    <div >
                        <p className="w-3/4 my-0 my-6 text-justify bg-pink-100 p-4 mx-auto">
                            The required time for your service is: 110 min. There is no time slot available on this date, please select another date or contact the Concierge +39 333 8131426
                        </p>
                    </div>
                    <div className="flex justify-center items-center bg-gray-500 w-1/2 mx-auto p-3 font-serif text-white">
                        <button>SAVE THE DATA AND TIME</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Calendar;
