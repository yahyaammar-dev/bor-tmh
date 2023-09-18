import React, { useEffect, useState } from "react";
import CategoryCheckbox from "./CategoryCheckbox";
import Image from "next/image";
import Button from "./Button";
import Select from "react-select";
import { useRouter } from "next/router";
import { useDataHandler } from "../../utils/dataHandler"; // Import the useDataHandler function from the dataHandler.js file
import { intiateBooking, nexiPayByLink } from "../../pages/api/hello";
import axios from "axios";
import { useDispatch } from "react-redux";

const Booking4 = ({ loader, setLoader }) => {
  const {
    reduxData,
    handleLocalData,
    confirmation,
  } = useDataHandler(setLoader); // Use the useDataHandler hook to access the functions and state


  const dispatch = useDispatch()

  useEffect(() => {
    console.log(reduxData)
  }, [])
  const [open, setOpen] = useState(false)

  const cities = [
    { value: "Milano", label: "Milano" },
    { value: "Roma", label: "Roma" },
  ];

  const postal = [
    { value: "123123", label: "123123" },
    { value: "123123", label: "12312" },
  ];

  const [coupon, setCoupon] = useState()

  const submitCoupon = () => {
    if (coupon == null) {
      alert('please enter coupon')
    }
    let data = {
      "code": coupon
    }
    axios.post('https://takemihome.it/en/submit_gift', data)
      .then((res) => {
        if (res.data.success == true) {
          let amountOfGiftCard = res?.data?.voucherAmount

          let reduxAmount  = reduxData?.appData?.totalAmount
          let calculatedAmount = reduxAmount - amountOfGiftCard

          if(calculatedAmount < 0 ){
            calculatedAmount = 0
          }
          dispatch({type: "TOTALAMOUNT", payload: totalAmount})

          // get total amount from cart and show it here
          alert('Gift card applied applied, Amount reduced is', amountOfGiftCard)
        } else {
          alert('Your Code is not correct')
        }
        console.log('response from api', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const handleBooking = () => {
    if (reduxData?.appData?.type == 'Corporate') {

      let totalDuration = 0;
      let services = []
      for (const item of reduxData?.appData?.cart) {
        totalDuration += item.duration;
        services.push(item.id)
      }
      let email = reduxData?.appData?.currentCorporateUser?.email
      const res = intiateBooking(reduxData?.appData?.currentDate, reduxData?.appData?.currentTime, totalDuration, reduxData?.appData?.currentCity?.id, services, reduxData?.appData?.currentProfessional?.id, email)
      // const data = {
      //   "email": email
      // }
      const data = {
        "email": 'yahyaammar4807@gmail.com'
      }
      const paybylink = nexiPayByLink(data)
      setOpen(true)
    } else {
      const data = {
        "email": reduxData?.appData?.user?.email
      }
      let email = reduxData?.appData?.currentCorporateUser?.email
      let totalDuration = 0;
      let services = []
      for (const item of reduxData?.appData?.cart) {
        totalDuration += item.duration;
        services.push(item.id)
      }
      const res = intiateBooking(reduxData?.appData?.currentDate, reduxData?.appData?.currentTime, totalDuration, reduxData?.appData?.currentCity?.id, services, reduxData?.appData?.currentProfessional?.id, email)
      const paybylink = nexiPayByLink(data)
      setOpen(true)
    }
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
          <div className="flex justify-between flex-col h-full">
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
            <div className="flex justify-between">
              <p className="my-3">Total Amount is:</p>
              <p className="font-bold">
                {reduxData?.appData?.totalAmount}
              </p>
            </div>
          </div>
          {/* <div className="iconBox flex">
                  <img src="/imgs/add.png" />
                  <p>{user[3] != null ? user[2] : "No Address"}</p>
                </div> */}
        </div>
        <div className="w-6/12 border p-5 checkout_address">
          <div>
            <div className="iconBox flex">
              <p className="w-full">
                <div className="flex w-full">
                  <label className="w-1/2">Address</label>
                  <p>{reduxData?.appData?.currentAddress ? reduxData?.appData?.currentAddress : 'No Address Found'}</p>
                  <p><pre>,   </pre></p>
                  <p> 
                    <b>
                      {reduxData?.appData?.currentCity?.value ? reduxData?.appData?.currentCity?.value : 'No City Selected'}
                    </b>
                  </p>
                </div>
              </p>
            </div>
          </div>
          {/* <div>
            <div className="iconBox flex">
              <p className="w-full">
                <div className="flex w-full">
                  <label className="w-2/3 flex items-center">Enter new Address</label>
                  <input className="border w-full address"
                    onChange={(item) => handleLocalData({
                      type: "address",
                      data: item,
                    })}
                    type="text" />
                </div>
              </p>
            </div>
          </div> */}



          {/* <div>
            <div className="iconBox flex">
              <p className="w-full customContainer">
                <div className="flex w-full customBordered">
                  <label className="w-2/3 flex items-center">Select a city</label>

                  <div className="w-full">
                    <Select
                      options={
                        reduxData?.appData?.cities?.length > 0
                          ? reduxData?.appData?.cities
                          : reduxData?.appData?.currentCity ?
                            reduxData?.appData?.currentCity : []
                      }
                      onChange={(item) => handleLocalData({
                        type: "newcity",
                        data: item,
                      })}
                      // onChange={(item) => {
                      //   setLocale(item.value);
                      // }}
                      placeholder="City"
                      styles={selectStyles}
                    />
                  </div>

                </div>
              </p>
            </div>
          </div> */}

          <div className="iconBox flex h justify-end">
            <div className="mt-2" >
              {
                confirmation.address ? <Button text='Address Added' filled wfull color='green'
                  onClick={() => {
                    handleLocalData({
                      type: "addAdress",
                    })
                  }}
                /> :
                  <Button text='Add Address' filled wfull
                    onClick={() => {
                      handleLocalData({
                        type: "addAdress",
                      })
                    }}
                  />
              }
            </div>
          </div>
          <div>
            <p className="mt-5">
              Do you have a massage bed at home? Click also if the massage bed
              is not needed for the service you are booking
            </p>
            <div className="radio">
              <input type="radio" name='address' className="mr-2" />
              <label>Yes</label>
            </div>
            <div className="radio">
              <input type="radio" name='address' className="mr-2" />
              <label>No</label>
            </div>
            <div className="mt-4">
              <Button text="Complete Booking" filled wfull onClick={handleBooking} />
            </div>

          </div>
        </div>
      </div>




      {/* --------------------------------------------------------------------------- */}



      <div className="flex custom__conatiner mx-auto gap-4">
        <div className="w-6/12 border p-5">
          <h3 className="font-bold">Coupons</h3>

          <div className="flex justify-between items-center">
            <p>Add Gift Card</p>
            <input type='text' onChange={(e) => { setCoupon(e.target.value) }} placeholder="Enter your voucher here" className="px-1 py-1 border" />
            <button onClick={() => {
              submitCoupon()
            }} class="flex gap-2 justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Apply</button>
          </div>

        </div>
        <div className="w-6/12 border p-5 checkout_address">

        </div>
      </div>



      {/* --------------------------------------------------------------------------- */}

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
                  <button type="button" onClick={() => { setOpen(false) }} class="flex gap-2 justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
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