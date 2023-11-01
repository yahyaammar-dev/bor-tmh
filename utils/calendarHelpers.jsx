const getMonthName = (monthNumber) => {
  let integerMonth = monthNumber
  integerMonth = monthNumber - 1
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const monthName = months[integerMonth];
  return monthName
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const setAvailibilites = (res = null, setDatesAndTimes, reduxData, monthCounter) => {
  let months = []
  if (res) {
    months = Object.keys(res)
    let single_month = months[monthCounter]
    let monthNameInWord = getMonthName(single_month)
    setDatesAndTimes({ monthName: monthNameInWord, datesAndTimes: res[single_month], month: parseInt(single_month) })
  } else {
    months = Object.keys(reduxData?.appData?.availibilitiesData)
    let single_month = months.sort()[monthCounter]
    let monthNameInWord = getMonthName(single_month)
    setDatesAndTimes({ monthName: monthNameInWord, datesAndTimes: reduxData?.appData?.availibilitiesData[single_month], month: parseInt(single_month) })
  }
}

const handleTimeClick = (e, datesAndTimes, setDatesAndTimes) => {
  if (e.currentTarget.classList.contains('cursor-not-allowed')) return
  let item = datesAndTimes?.datesAndTimes?.filter((day) => {
    return day?.date?.split('-')[0] == e.target.innerText
  })
  const newDatesAndTimes = datesAndTimes?.datesAndTimes?.map((day) => {
    const isActive = day === item[0];
    return {
      ...day,
      active: isActive,
    };
  });

  setDatesAndTimes({ ...datesAndTimes, selectedTimes: item[0]?.times, datesAndTimes: newDatesAndTimes })
}


const handleCalenderSubmission = (datesAndTimes, handleLocalData, router) => {
  const date = datesAndTimes?.datesAndTimes?.filter((item) => item.active == true)
  const time = datesAndTimes.selectedTimes[datesAndTimes.selectedTimeIndex]
  handleLocalData({
    type: "currenttime",
    data: time
  })
  handleLocalData({
    type: "currentDate",
    data: date[0].date
  })
  router.push('/booking/booking4')
}


export {
  getMonthName,
  weekDays,
  setAvailibilites,
  handleTimeClick,
  handleCalenderSubmission
}