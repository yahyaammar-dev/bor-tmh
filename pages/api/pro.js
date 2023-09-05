// pages/api/consume-api.js

import axios from 'axios';

export default async (req, res) => {
    try {

        const input = {
            "professional": 14
        };


        // Make a GET request to the external API to get all of data
        const response = await axios.post('http://localhost:8000/it/front/booking/get-professional-calendar', input);


        // remove deleted dates
        const active_dates = response?.data?.calendarData?.filter((item)=>item.deleted == false)

        
        // Filter repeatable and non repeatable dates
        let repeatable = active_dates?.filter((item)=>item.repeatable == true)
        let non_repeatable = active_dates?.filter((item)=>item.repeatable == false)


        // dates array of 6 years - placeholders
        const sixYearArray = generateDateArray()
        const dateStrings_sixYearArray = sixYearArray.map((dateObj) => {
            const year = dateObj.year;
            const month = String(dateObj.month).padStart(2, '0'); // Ensure two-digit month
            const day = String(dateObj.day).padStart(2, '0');     // Ensure two-digit day
            return `${year}-${month}-${day}`;
          });



        // availibility array of next 6 years based on repeatable dates
        const availabilityDates = generateAvailabilityArray(repeatable);
        


        // merge repeatable and non-repeatable dates (avilibility and non_repeatable)
        let non_repeatable_only_date = non_repeatable?.map((item)=>{
            return item.day.date
        })
        // Concatenate the two arrays into one
        const mergedArray = non_repeatable_only_date.concat(availabilityDates);

        // Convert date strings to Date objects
        const dateObjects = mergedArray.map((dateStr) => new Date(dateStr));

        // Sort the Date objects
        dateObjects.sort((a, b) => a - b);

        // Optionally, convert sorted Date objects back to date strings
        const sortedDateStrings = dateObjects.map((dateObj) => dateObj.toISOString());
        const dateStrings2_availibilityDates = sortedDateStrings.map((dateStr) => {
            const dateObj = new Date(dateStr);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
            const day = String(dateObj.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          });



        // merge availibility with placeholder
        // dateStrings2_availibilityDates
        // dateStrings_sixYearArray

        // loop through dateStrings_sixYearArray 
          // check if the value exist sin dateStrings2_availibilityDates
          // if value exists insert {date:date, status:true} else insert {date:date, status: false}
        let final_array = dateStrings_sixYearArray?.map((item)=>{
          if(dateStrings2_availibilityDates?.includes(item)){
            return {
              date: item,
              status:true
            }
          }else {
            return {
              date: item,
              status: false
            }
          }
        })
        


        // Return the data as the API response
        res.status(200).json(final_array);
    } catch (error) {
        console.error('Error consuming external API:', error);
        res.status(500).json({ error: error });
    }
};


function generateDateArray() {
    const currentDate = new Date();
    const startYear = currentDate.getFullYear() - 3;
    const endYear = startYear + 6;
    const dateArray = [];
  
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
        for (let day = 1; day <= daysInMonth; day++) {
          dateArray.push({
            year: year,
            month: month + 1, // Month is zero-based, so add 1
            day: day
          });
        }
      }
    }
  
    return dateArray;
  }

  function getNextNDates(startDate, n) {
    const nextNDates = [];
    const currentDate = new Date(startDate);
    for (let i = 0; i < n; i++) {
      nextNDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
    }
    return nextNDates;
  }
  
  function generateAvailabilityArray(availabilityArray, numberOfYears = 6) {
    const currentDate = new Date();
    const endYear = currentDate.getFullYear() + numberOfYears;
    const resultArray = [];
  
    // Iterate over each year
    for (let year = currentDate.getFullYear(); year <= endYear; year++) {
      // Iterate over each day in the provided availabilityArray
      for (const availability of availabilityArray) {
        if (availability.repeatable) {
          // Parse the start date from the availability object
          const startDate = new Date(availability.startTime.date);
  
          // Ensure it's in the current year
          startDate.setFullYear(year);
  
          // If the start date is in the past, move it to the next week
          while (startDate < currentDate) {
            startDate.setDate(startDate.getDate() + 7);
          }
  
          // Generate and add the next N dates based on the repeatable availability
          const nextNDates = getNextNDates(startDate, numberOfYears * 52); // Assuming 52 weeks in a year
          resultArray.push(...nextNDates);
        }
      }
    }
  
    return resultArray;
  }