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

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/it/front/api/searchAllUsers'); // Replace 'your-api-endpoint' with your actual API endpoint
      const data = await response.json();

      const dataAsOption = data?.users?.map((item) => ({
        id: item.id,
        email: item.email
      }));

      console.log('data as options', dataAsOption)

      setUsers(dataAsOption); // Assuming the API response is an array of user objects with 'id' and 'email' properties
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  const fetchAppointments = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/it/front/api/getUserAppointments/${id}`); // Replace 'your-appointments-api-endpoint' with your actual appointments API endpoint
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
    console.log(item)
    
    dispatch({ type: "SETISEDIT", payload: true })

    try {
      const response = await fetch(`http://localhost:8000/it/front/api/getSingleAppointment/${item?.id}`); // Replace 'your-appointments-api-endpoint' with your actual appointments API endpoint
      let data = await response.json();

      data = {...data, availibilitydata: {}}
      dispatch({type: "ALLDATA", payload: data})

      dispatch({ type: "SELECTEDAPPOINTMENT", payload: item?.id })


      // set redux data here and redirect the user to main page - also set that this is modified appointment for current id 
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }

    router.push('/')
    


  }

  return (
    <div>
      <Navbar />
      <div className="w-1/2 mx-auto mt-[10rem]">

        <div className='w-full'>
          <Select
            options={users?.map(item => ({
              value: item, // Assuming 'email' is the property containing the email
              label: item?.email, // Customize the label to display both name and email
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
                  <table class="w-full table-auto">
                    <thead class="bg-gray-100 dark:bg-gray-700">
                      <tr class="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">

                        <th class="px-6 py-3 font-medium dark:text-gray-400">User</th>
                        <th class="px-6 py-3 font-medium dark:text-gray-400">Professional</th>
                        <th class="px-6 py-3 font-medium dark:text-gray-400">Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        appointment?.length > 0  ? appointment?.map((item) => (
                          <tr class="border-b border-gray-200 dark:border-gray-800 my-1">
                            <td class="px-6 text-sm font-medium dark:text-gray-400">{item?.customer}</td>
                            <td class="px-6 text-sm font-medium dark:text-gray-400">{item?.professional}</td>
                            <td class="px-6 text-sm my-1">
                              <span
                                class="my-1 inline-block px-2 py-1 text-blue-700 bg-blue-100 rounded-md dark:bg-gray-800 dark:text-gray-400 cursor-pointer" onClick={()=>handleEdit(item)}>Edit</span>
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
  );
}

export default Table;
