import React, { useEffect, useState } from "react";
import CategoryCheckbox from "./CategoryCheckbox";
import Image from "next/image";
import Button from "./Button";
import Select from "react-select";
import { useRouter } from "next/router";
import { useDataHandler } from "../../utils/dataHandler"; // Import the useDataHandler function from the dataHandler.js file
import { intiateBooking } from "../../pages/api/hello";


const Booking4 = ({ loader, setLoader }) => {
  const {
    reduxData
  } = useDataHandler(setLoader); // Use the useDataHandler hook to access the functions and state

  const [open, setOpen] = useState(false)

  const cities = [
    { value: "Milano", label: "Milano" },
    { value: "Roma", label: "Roma" },
  ];

  const postal = [
    { value: "123123", label: "123123" },
    { value: "123123", label: "12312" },
  ];


  const handleBooking = () => {
    const res = intiateBooking()
    setOpen(true)
    console.log('Booking Created::  ', reduxData)
    console.log({
      'day': null,
      'time': null,
      'duration': null,
      'city': null,
      'service': null,
      'pro': null,
      'customer': null
    })
  }

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
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black", // Change the color of the selected value text
    }),
  };
  const router = useRouter();
  const navigate_to_booking3 = () => {
    router.push("/booking3");
  };
  return (
    <div>
      {/* Booking 4 */}
      <div className="booking2 custom__conatiner mx-auto">
        <div className="mb-20 mt-10">
          <h2 className="text-center mb-1 text-4xl font-extrabold dark:text-white">
            Complete the Booking
          </h2>
          <h3 className="text-center mb-6 text-xl font-bold dark:text-white">
            Provide Your Address
          </h3>
        </div>
      </div>

      <div className="flex custom__conatiner mx-auto gap-4">
        <div className="w-6/12 border p-5">
          <h3 className="font-bold">Cart</h3>
          <ul>
            <p className="my-3">Services Added to Cart</p>
            {reduxData.appData.cart.map((item) => {
              return (
                <div>
                  <div className="category__checkbox flex gap-10 border py-3 justify-between px-3">
                    <p>{item.name}</p>
                    <div>
                      <div className="flex items-center">
                        <p>{item.duration} min</p>
                        <p className="mx-10">|</p>
                        <p>{item.price} $</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </ul>
          {/* <div className="iconBox flex">
                  <img src="/imgs/add.png" />
                  <p>{user[3] != null ? user[2] : "No Address"}</p>
                </div> */}
        </div>
        <div className="w-6/12 border p-5">
          {reduxData.appData.corporateUsers && reduxData.appData.corporateUsers.map((user) => {
            return (
              <div>
                <div className="iconBox flex">
                  <img src="/imgs/add.png" />
                  <p className="w-full">{user[2] == null && user[3] == null ? (
                    <div className="flex w-full">
                      <label className="w-2/3">Enter the Address</label>
                      <input className="border w-full" type="text" />
                    </div>
                  ) : user[2]}</p>
                </div>
              </div>
            )
          })
          }
          <div className="iconBox flex h">
            <div style={{ height: "20px" }}>
              <img src="/imgs/add.png" height="30px" width="27px" alt="Add Icon" />
            </div>
            <div className="w-full">
              <Select
                options={cities}
                // onChange={(item) => {
                //   setLocale(item.value);
                // }}
                placeholder="City"
                styles={selectStyles}
              />
            </div>
          </div>
          <div>
            <p className="mt-5">
              Do you have a massage bed at home? Click also if the massage bed
              is not needed for the service you are booking
            </p>
            <div className="radio">
              <input type="radio" />
              <label>Yes</label>
            </div>
            <div className="radio">
              <input type="radio" />
              <label>No</label>
            </div>
            <p>MOre Information</p>
            <div>
              <textarea name="mytext" id="" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="custom__conatiner mx-auto">
        <div className="flex justify-end">
          {/* <div className="w-6/12">
            <div>
              <input placeholder="Add Gift Card" className="py-1 px-5 rounded mr-2" />
              Apply
            </div>
            <div className="flex">
              <div>
                <p>My Service: 1</p>
              </div>
              <div>
                <p>Total: 450</p>
                <p>Total: 450</p>
                <p>Total: 450</p>
                <p>Total: 450</p>
              </div>
            </div>
          </div> */}
          <div className="w-6/12">
            <Button text="Pay and Book" filled wfull onClick={handleBooking} />
          </div>
        </div>
      </div>

      {
        open && (
          <div className="custom__container__success">
            <div class="w-full md:w-1/3 mx-auto">
              <div class="flex p-5 rounded-lg shadow bg-white">
                <div class="ml-3 text-center flex flex-col justify-center gap-3">
                  <h2 class="font-semibold text-gray-800">Successfully Created Booking</h2>
                  <p class="mt-2 text-sm text-gray-600 leading-relaxed">Booking has been created Successfully. Emails are sent to user and nexi is integrated in pay by link.</p>
                  <button type="button" onClick={()=>{setOpen(false)}} class="flex gap-2 justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Booking Completed!
                    <svg class="w-6 h-6 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </div>
  );
};

export default Booking4;