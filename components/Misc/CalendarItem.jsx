const CalendarItem = ({ handleTimeClick, text, active, available }) => {
  return (
    <div className="m-1">
      <div
        className={`h-8 text-center relative flex flex-col items-center justify-center ${available || active ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        onClick={handleTimeClick}
      >
        {active ? (
          <p className="h-7 w-7 flex justify-center items-center bg-yellow-500 font-semibold text-lg rounded-full">
            {text}
          </p>
        ) : available ? (
          <>
            <p>
              {text}
            </p>
            <span className="h-2 w-2 bg-green-500 rounded-full text-transparent">{text}</span>
          </>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </div>
  );
};

export default CalendarItem;