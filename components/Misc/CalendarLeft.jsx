const CalendarLeft = () => (
  <div class="w-7/12 md:w-1/4 bg-gray-300 mb-2 flex justify-center items-center flex-col">
    <img src="/imgs/calendar-icon.svg" alt="Calendar" width="70%" />
    <p className="text-xs">
      <i>Today:</i>
    </p>
    <h1 className="text-xl font-semibold text-gray-800">
      {new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </h1>
  </div>
);

export default CalendarLeft;
