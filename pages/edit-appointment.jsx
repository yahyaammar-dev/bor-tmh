import React, { useEffect, useState } from 'react';
import Navbar from "../components/Misc/Navbar";
import Footer from "../components/Misc/Footer";
import Select from "react-select";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// Define custom styles for React Select
const selectStyles = {
  container: (provided) => ({
    ...provided,
    width: "100%", // Adjust the width of the select container as needed
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "1px solid black" : "1px solid #ccc", // Change the border color when the select is focused or not
    boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 0, 255, 0.3)" : "none", // Add a box shadow when the select is focused
    "&:hover": {
      borderColor: state.isFocused ? "black" : "#ccc", // Change the border color on hover
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#f5f5f5", // Change the background color of the dropdown menu
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "black" : "white", // Change the background color of selected and non-selected options
    color: state.isSelected ? "white" : "black", // Change the text color of selected and non-selected options
    fontSize: "12px"
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black", // Change the color of the selected value text
    fontSize: "12px", // Adjust the font size of the selected value text
  }),
};

function Table() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [appointment, setAppointments] = useState(null)
  const dispatch = useDispatch()
  const router = useRouter()
  const [loader, setLoader] = useState(true)

  const fetchUserData = async () => {
    try {
      setLoader(true)
      const response = await fetch('https://takemihome.it/it/front/api/searchAllUsers'); // Replace 'your-api-endpoint' with your actual API endpoint
      const data = await response.json();


      console.log('All users', data)

      const dataAsOption = data?.users?.map((item) => ({
        id: item.id,
        email: item.email,
        corporate_id: item?.corporate_id
      }));

      setUsers(dataAsOption); // Assuming the API response is an array of user objects with 'id' and 'email' properties
      setLoader(false)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    dispatch({ type: "SETISEDIT", payload: false })

  }, []);

  const fetchAppointments = async (id) => {
    try {
      const response = await fetch(`https://takemihome.it/it/front/api/getUserAppointments/${id}`); // Replace 'your-appointments-api-endpoint' with your actual appointments API endpoint
      const data = await response.json();
      setAppointments(data?.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleUserSelect = async (userId) => {
    setSelectedUserId(userId);
    fetchAppointments(userId)
  };

  const handleEdit = async (item) => {
    setLoader(false)


    if(new Date(item?.booking_date) >= new Date()){
      dispatch({ type: "SETISEDIT", payload: true })
      try {
        const response = await fetch(`https://takemihome.it/it/front/api/getSingleAppointment/${item?.id}`); // Replace 'your-appointments-api-endpoint' with your actual appointments API endpoint
        let data = await response.json();
        if (data?.status == false || data?.message) {
          alert(data?.message)
          return
        }
        data = { ...data, availibilitydata: {} }
        dispatch({ type: "ALLDATA", payload: data })
        dispatch({ type: "SELECTEDAPPOINTMENT", payload: item?.id })
        // set redux data here and redirect the user to main page - also set that this is modified appointment for current id 
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
      router.push('/')
      setLoader(true)
    }else{
      return
    }

  }


  return (
    !loader ? <div>
      <Navbar />
      <div className="w-2/3 mx-auto mt-[10rem]">
        <div className='w-full'>
          <Select
            options={users?.map(item => ({
              value: item, // Assuming 'email' is the property containing the email
              label: `${item?.email} ${item?.corporate_id ? ' |    Corporate' : ''}`, // Customize the label to display both name and email
            }))}
            onChange={(item) => {
              handleUserSelect(item.value.id)
            }}
            placeholder="Select User"
            styles={{ ...selectStyles, width: '100%' }}
          />
        </div>
        <section class="items-center lg:flex bg-gray-50  font-poppins dark:bg-gray-800 mb-[5rem]">
          <div class="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div class="overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
              <div class="">
                <h2
                  class="px-6 py-4 pb-4 text-xl font-medium border-b border-gray-300 dark:border-gray-700 dark:text-gray-400">
                  Appointments
                </h2>
                <div class="flex flex-wrap items-center justify-between px-4 py-2 border-b dark:border-gray-700">
                </div>
                <table class="w-full table-auto" style={{borderCollapse: 'separate', borderSpacing: '2px 10px' }}>
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr class="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                      <th class="px-6 py-3 font-medium dark:text-gray-400">Appointment Id</th>
                      <th class="px-6 py-3 font-medium dark:text-gray-400">User</th>
                      <th class="px-6 py-3 font-medium dark:text-gray-400">Professional</th>
                      <th class="px-6 py-3 font-medium dark:text-gray-400">Payment Status</th>
                      <th class="px-6 py-3 font-medium dark:text-gray-400">Booked Date | Start Date</th>
                      <th class="px-6 py-3 font-medium dark:text-gray-400">Booking Created At</th>
                      <th class="px-6 py-3 font-medium dark:text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      appointment?.length > 0 ? appointment?.map((item) => (
                        <tr class="border-b border-gray-200 dark:border-gray-800">
                          <td class="px-6 text-sm font-medium dark:text-gray-400">{item?.id}</td>
                          <td class="px-6 text-sm font-medium dark:text-gray-400">{item?.customer}</td>
                          <td class="px-6 text-sm font-medium dark:text-gray-400">{item?.professional}</td>
                          <td class="px-6 text-sm font-medium dark:text-gray-400">{item?.status}</td>
                          <td class="px-6 text-sm font-medium dark:text-gray-400">{item?.booking_date}</td>
                          <td class="px-6 text-sm font-medium dark:text-gray-400">{item?.created}</td>
                          <td class="px-6 text-sm my-1">
                            <span
                              className={`'my-1 inline-block px-2 py-1 text-blue-700  rounded-md dark:bg-gray-800 dark:text-gray-400 cursor-pointer' ${new Date(item?.booking_date) >= new Date() ? 'bg-blue-100 cursor-pointer' : 'bg-blue-50 cursor-not-allowed'}`} onClick={() => handleEdit(item)}>
                                Edit
                            </span>
                          </td>
                        </tr>
                      ))
                        :
                        <h2 className='mx-10 my-10'>Select a User</h2>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
      :
      <div className='w-full h-screen flex items-center justify-center'>
        <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
  )
}
export default Table;