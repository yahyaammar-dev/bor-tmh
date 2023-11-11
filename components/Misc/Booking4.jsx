import React, { useEffect, useState } from "react";
import CategoryCheckbox from "./CategoryCheckbox";
import Image from "next/image";
import Button from "./Button";
import Select from "react-select";
import { useRouter } from "next/router";
import { useDataHandler } from "../../utils/dataHandler"; // Import the useDataHandler function from the dataHandler.js file
import { SetNewPrimaryAddress, getAllAddresses, intiateBooking, nexiPayByLink } from "../../pages/api/hello";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { getCity } from "../../services/BookingHandlers";

const Booking4 = ({ loader, setLoader }) => {
  const {
    reduxData,
    handleLocalData,
    confirmation,
  } = useDataHandler(setLoader); // Use the useDataHandler hook to access the functions and state

  const [addressoptions, setAddressOptions] = useState()
  const dispatch = useDispatch()
  const [giftAmount, setGiftAmount] = useState(null);
  const [giftId, setGiftId] = useState(0)
  const [addressData, setAddressData] = useState({
    address1: '',
    address2: '',
    city: '',
    postalCode: ''
  })



  const getCity = (id) => {
    if (id == 1) {
      return 'Milano'
    } else if (id == 2) {
      return 'Roma'
    } else if (id == 3) {
      return 'Monza Brianza'
    } else if (id == 4) {
      return 'Bergamo'
    } else if (id == 5) {
      return 'Ibiza'
    } else if (id == 6) {
      return 'Como Versace'
    } else if (id == 7) {
      return 'Brescia'
    } else {
      return ''
    }
  }

  const validationSchema = Yup.object().shape({
    percentage: Yup.number()
      .required('Percentage is required')
      .min(0, 'Percentage cannot be less than 0')
      .max(100, 'Percentage cannot be greater than 100')
  });

  const [outside, setOutside] = useState(false)
  const [percentage, setPercentage] = useState(0)

  const handleAddressChange = (e) => {
    handleLocalData({
      type: "address",
      data: e,
    })
  }

  const getAddresses = async () => {
    let id
    if (reduxData?.appData?.user?.id) {
      id = reduxData?.appData?.user?.id
    } else {
      id = reduxData?.appData?.currentCorporateUser?.id
    }
    let res = await getAllAddresses(id)
    setAddressOptions(res.data)
    console.log('am i being called')
    handleLocalData({
      type: "address",
      data: res.data[0],
    })
  }


  useEffect(() => {
    console.log(reduxData)
    getAddresses()
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
          setGiftId(res?.data?.id)
          let reduxAmount = reduxData?.appData?.totalAmount
          let calculatedAmount = reduxAmount - amountOfGiftCard

          if (calculatedAmount < 0) {
            calculatedAmount = 0
          }
          setGiftAmount(calculatedAmount)

          dispatch({ type: "TOTALAMOUNT", payload: calculatedAmount })

          // get total amount from cart and show it here
          alert(`Gift card applied applied, Amount reduced is: ${calculatedAmount}`,)
        } else {
          alert('Your Code is not correct')
        }
        console.log('response from api', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = () => {
    console.log('hello')
  }

  const handleBooking = () => {

    if (reduxData?.appData?.type == 'Corporate') {
      let totalDuration = 0;
      let services = []
      for (const item of reduxData?.appData?.cart) {
        totalDuration += item.duration;
        services.push(item.id)
      }
      let email = reduxData?.appData?.currentCorporateUser?.id
      if (reduxData?.appData?.extras != null) {
        const res = intiateBooking(
          reduxData?.appData?.currentDate,
          reduxData?.appData?.currentTime,
          totalDuration,
          reduxData?.appData?.currentCity?.id,
          services,
          reduxData?.appData?.currentProfessional?.id,
          email,
          reduxData?.appData?.extras,
          reduxData?.appData?.type,
          giftId,
          reduxData?.appData?.currentAddress?.id
        )
      } else {
        const res = intiateBooking(
          reduxData?.appData?.currentDate,
          reduxData?.appData?.currentTime,
          totalDuration,
          reduxData?.appData?.currentCity?.id,
          services,
          reduxData?.appData?.currentProfessional?.id,
          email,
          0,
          reduxData?.appData?.type,
          giftId,
          reduxData?.appData?.currentAddress?.id
        )
      }
      // const data = {
      //   "email": email
      // }
      // const data = {
      //   "email": 'yahyaammar4807@gmail.com'
      // }
      // const paybylink = nexiPayByLink(data)
      setOpen(true)
    } else {
      const data = {
        "email": reduxData?.appData?.user?.email
      }
      let customerId = reduxData?.appData?.user?.id
      console.log('you know the customer is', customerId)
      let totalDuration = 0;
      let services = []
      for (const item of reduxData?.appData?.cart) {
        totalDuration += item.duration;
        services.push(item.id)
      }
      if (reduxData?.appData?.extras != null) {
        const res = intiateBooking(
          reduxData?.appData?.currentDate,
          reduxData?.appData?.currentTime,
          totalDuration,
          reduxData?.appData?.currentCity?.id,
          services,
          reduxData?.appData?.currentProfessional?.id,
          customerId,
          reduxData?.appData?.extras,
          reduxData?.appData?.type,
          giftId,
          reduxData?.appData?.currentAddress?.id)
      } else {
        const res = intiateBooking(
          reduxData?.appData?.currentDate,
          reduxData?.appData?.currentTime,
          totalDuration,
          reduxData?.appData?.currentCity?.id,
          services,
          reduxData?.appData?.currentProfessional?.id,
          customerId,
          reduxData?.appData?.extras,
          reduxData?.appData?.type,
          giftId,
          reduxData?.appData?.currentAddress?.id)
      }
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

  const handleAddress = async (data) => {
    let addressData = data
    if (reduxData?.appData?.user?.id) {
      let id_concer = reduxData?.appData?.user?.id
      addressData = { ...addressData, id: id_concer }
    } else {
      let id_corporate = reduxData?.appData?.currentCorporateUser?.id
      addressData = { ...addressData, id: id_corporate }
    }
    if (!addressData?.postalCode) {
      addressData.postalCode = null
    }
    const res = await SetNewPrimaryAddress(addressData?.address1, addressData?.address2, addressData?.city, addressData?.id, addressData?.postalCode)
    if (res.status == 200) {
      alert('Address Added Successfully')
    } else {
      alert('Something went wrong!! Plesae try again later')
    }
    setAddressData({
      address1: '',
      address2: '',
      city: '',
      postalCode: ''
    })
    getAddresses()
  }

  console.log(reduxData?.appData)

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

      <div className="grid md:grid-cols-2 sm:grid-cols-1 custom__conatiner mx-auto gap-4">
        <div className="w-full border p-5 ">
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
                {reduxData?.appData?.totalAmount} €
              </p>
            </div>

              {console.log(giftAmount)}

            {
              (giftAmount != null) && <div className="flex justify-between">
                <p className="my-3">Amount after gift card is:</p>
                <p className="font-bold">
                  {giftAmount == 0 ? '0' : giftAmount} €
                </p>
              </div>
            }



          </div>
          {/* <div className="iconBox flex">
                  <img src="/imgs/add.png" />
                  <p>{user[3] != null ? user[2] : "No Address"}</p>
                </div> */}
        </div>
        <div className="w-full border p-5 checkout_address">
          <div>
            <div className="iconBox flex">
              <p className="w-full">
                <div className="flex w-full mb-2">
                  <label className="w-2/3">Address</label>
                  <select className="border w-full address" onChange={(e) => handleAddressChange(JSON.parse(e.target.value))}>
                    {addressoptions?.map((item) => (
                      <option key={item.id} value={JSON.stringify(item)}>
                        {item.address} {item.address2} - {getCity(item?.city_id)}
                      </option>
                    ))}
                  </select>
                  {/* <p>{reduxData?.appData?.currentAddress ? reduxData?.appData?.currentAddress : 'No Address Found'}</p>
                  <p><pre>,   </pre></p>
                  <p>
                    <b>
                      {reduxData?.appData?.currentCity?.value ? reduxData?.appData?.currentCity?.value : 'No City Selected'}
                    </b>
                  </p> */}
                </div>
              </p>
            </div>
          </div>
          <div>
            <div className="iconBox flex">
              <p className="w-full">
                <div className="flex w-full">
                  <label className="w-2/3 flex items-center">Enter Address 1</label>
                  <input className="border w-full address"
                    onChange={(e) => {
                      setAddressData({ ...addressData, address1: e.target.value })
                      // handleLocalData({
                      //   type: "address",
                      //   data: item,
                      // })
                    }}
                    type="text" />
                </div>
                <div className="flex w-full">
                  <label className="w-2/3 flex items-center">Enter Address 2</label>
                  <input className="border w-full address"
                    onChange={(e) => {
                      setAddressData({ ...addressData, address2: e.target.value })
                      // handleLocalData({
                      //   type: "address",
                      //   data: item,
                      // })
                    }}
                    type="text" />
                </div>
              </p>
            </div>
          </div>



          <div>
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
                      onChange={(e) => {
                        setAddressData({ ...addressData, city: e.id })
                        // handleLocalData({
                        //   type: "newcity",
                        //   data: item,
                        // })
                      }}
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
          </div>


          {
            addressData?.city == 2 ? <div>
              <div className="iconBox flex">
                <p className="w-full">
                  <div className="flex w-full">
                    <label className="w-2/3 flex items-center">Enter Postal Code</label>
                    <input className="border w-full address"
                      onChange={(e) => {
                        setAddressData({ ...addressData, postalCode: e.target.value })
                      }}
                      type="text" />
                  </div>
                </p>
              </div>
            </div>
              :
              <></>
          }



          <div className="iconBox flex h justify-end">
            <div className="mt-2" >
              <Button text='Add Address' filled wfull
                onClick={() => {
                  handleAddress(addressData)
                }}
              />

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
      {/* Gift card */}


      <div className="grid md:grid-cols-2 sm:grid-cols-1 custom__conatiner mx-auto gap-4">
        <div className="w-12/12 border p-5">
          <div className="flex justify-between items-center">
            <p>Add Gift Card</p>
            <input type='text' onChange={(e) => { setCoupon(e.target.value) }} placeholder="Enter your voucher here" className="px-1 py-1 border" />
            <button onClick={() => {
              submitCoupon()
            }} class="flex gap-2 justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Apply</button>
          </div>

        </div>
        <div className="w-12/12 border p-5 checkout_address">
        </div>
      </div>


      {/* --------------------------------------------------------------------------- */}
      {/* 20 Percent */}


      <div className="grid md:grid-cols-2 sm:grid-cols-1 custom__conatiner mx-auto gap-4">
        <div className="w-12/12 border p-5">

          <div className="w-full flex justify-between">
            <div class="flex items-center mb-4">
              <label for="default-checkbox" class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300">OutSide State?</label>
              <input id="default-checkbox" type="checkbox" value={outside} onChange={() => { setOutside(!outside) }} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            {
              reduxData?.appData?.extras &&
              <div className="flex">
                <p>Amount after Extra Fee is:  </p>
                <pre>    </pre>
                <p>{(reduxData?.appData?.totalAmount) + ((reduxData?.appData?.totalAmount) * ((reduxData?.appData?.extras)/100))} €</p>
              </div>
            }
          </div>

          {
            outside &&
            <>
              <div>
                <Formik
                  initialValues={{ percentage: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {

                    dispatch({ type: 'STOREEXTRAS', payload: values?.percentage })
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <label for="default-checkbox" class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300">Enter the Percentage</label>
                      <input
                        type="number"
                        name="percentage"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.percentage}
                        className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <p className="text-red-500 mb-2">
                        {errors.percentage && touched.percentage && errors.percentage}
                      </p>
                      <button type="submit" disabled={isSubmitting} className="px-5 py-2 rounded button-filled yellow-button w-full ">
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </>
          }

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
              <div class="flex p-5 rounded-lg shadow bg-white justify-center">
                <div class="ml-3 text-center flex flex-col justify-center gap-3">
                  <h2 class="font-semibold text-gray-800">Successfully Created Booking</h2>
                  <p class="mt-2 text-sm text-gray-600 leading-relaxed">Booking has been created Successfully. Please Check Your Email.</p>
                  <button type="button" onClick={() => {
                    setOpen(false)
                    dispatch({ type: "RESETALLDATA" });
                    router.push('/')
                  }} class="flex gap-2 justify-center items-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
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