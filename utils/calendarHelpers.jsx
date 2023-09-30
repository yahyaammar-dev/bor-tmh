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

  const setAvailibilites = (res  = null, setDatesAndTimes, reduxData) => {
    let months = []
    if(res){
      months = Object.keys(res)
      let single_month = months.sort()[0]
      let monthNameInWord = getMonthName(single_month)
      setDatesAndTimes({ monthName: monthNameInWord , datesAndTimes: res[single_month], month: parseInt(single_month)})
    }else{
      console.log(reduxData)
      months = Object.keys(reduxData?.appData?.availibilitiesData)
      let single_month = months.sort()[0]
      let monthNameInWord = getMonthName(single_month)
      setDatesAndTimes({ monthName: monthNameInWord , datesAndTimes: reduxData?.appData?.availibilitiesData[single_month], month: parseInt(single_month)})
    }
  }

  export {
    getMonthName,
    weekDays,
    setAvailibilites
  }