const CalendarItem = ({ handleTimeClick, text, active, available }) => {
  return (
    <div className="m-1">
      <div
        className={`h-8 text-center relative flex flex-col items-center justify-center ${available || active ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        onClick={handleTimeClick}
      >
        {active ? (
          <p className="sm:h-3 sm:w-3 h-7 w-7 flex justify-center items-center bg-yellow-500 font-semibold rounded-full text-[10px] md:text-sm md:p-[1rem]">
            {text}
          </p>
        ) : available ? (
          <>
            <p className="text-[10px] md:text-sm">
              {text}
            </p>
            <span className="h-1 w-1 sm:h-2 sm:w-2 bg-green-500 rounded-full text-transparent">{text}</span>
          </>
        ) : (
          <p className="text-[10px] md:text-sm">{text}</p> 
        )}
      </div>
    </div>
  );
};

export default CalendarItem;