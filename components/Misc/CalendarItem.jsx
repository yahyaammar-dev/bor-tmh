const CalendarItem = ({ text, active, available }) => {
    return (
      <div className={`mb-4 text-center relative flex justify-center ${available || active ? 'cursor-pointer' :  'cursor-not-allowed'  }`}>
        {active ? (
          <p className="h-8 w-8 flex justify-center items-center bg-yellow-500 font-semibold text-lg">
            {text}
          </p>
        ) : available ? (
          <>
            <p>{text}</p>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 h-2 w-2 bg-green-500 rounded-full"></span>
          </>
        ) : (
          <p>{text}</p>
        )}
      </div>
    );
  };
  
  export default CalendarItem;
  