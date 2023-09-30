const CalendarLeft = () => (
    <div class="w-1/4 bg-gray-300 flex justify-center items-center flex-col">
        <img src='/imgs/calendar-icon.svg' alt='Calendar' width="70%" />
        <h1 className="text-xl font-semibold text-gray-800">{new Date().toLocaleString('en-US', { month: 'long', day: 'numeric' })}</h1>
    </div>
)

export default CalendarLeft