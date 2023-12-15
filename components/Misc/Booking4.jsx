import React, { useEffect, useState } from "react";
import CategoryCheckbox from "./CategoryCheckbox";
import Image from "next/image";
import Button from "./Button";
import Select from "react-select";
import { useRouter } from "next/router";
import { useDataHandler } from "../../utils/dataHandler";
import { SetNewPrimaryAddress, getAllAddresses, intiateBooking, nexiPayByLink } from "../../pages/api/hello";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Booking4 = ({ loader, setLoader }) => {
  const {
    reduxData,
    handleLocalData,
    confirmation,
  } = useDataHandler(setLoader); // Use the useDataHandler hook to access the functions and state

  const [addressoptions, setAddressOptions] = useState()
  const dispatch = useDispatch()
  const [giftAmount, setGiftAmount] = useState(0);
  const [giftId, setGiftId] = useState(0)
  const [percentage, setPercentage] = useState()
  const [addressData, setAddressData] = useState({
    address1: '',
    address2: '',
    city: '',
    postalCode: ''
  })
  const [outside, setOutside] = useState(false)
  const [groupDiscount, setGroupDisCount] = useState(null)
  const [corporateDiscountGroup, setCorporateDiscountGroup] = useState()
  const [appointmentId, setAppointmentId] = useState()
  const [customLoader, setCustomLoader] = useState()
  const [hasMassageBed, setHasMassageBed] = useState(false);
  const [currentGiftAmount, setCurrentGiftAmount] = useState()
  const [amountAfterCalculations, setAmountAfterCalculations] = useState(null)
  const [priceTableData, setPriceTableData] = useState()
  const [paymentLink, setPaymentLink] = useState(null)


  const [priceTableLoader, setPriceTableLoader] = useState(false)

  // price calculattion  
  const [initalAmount, setInitialAmount] = useState(null)

  const calculatePrice = async () => {
    try {
      setPriceTableLoader(true)
      let firstAmount = reduxData?.appData?.totalAmount;
      let percentageAmount = 0
      let customerCoupons = 0
      let corporateCoupons = 0
      let giftCard = 0
      let finalAmount = 0

      // percentage
      if (!isNaN(percentage) && percentage !== null) {
        percentageAmount = (parseFloat(firstAmount) * (parseFloat(percentage) / 100)).toFixed(2);
        firstAmount = parseFloat(firstAmount) + parseFloat(percentageAmount)
      }
      parseFloat(firstAmount).toFixed(2)



      if (reduxData?.appData?.user?.id) {


        // customer coupons
        const customerCouponsResponse = await axios.post('https://takemihome.it/it/front/booking/customerCoupons', {
          customer: reduxData?.appData?.user?.id
        });
        customerCouponsResponse?.data?.coupons.forEach((coupon) => {
          if (coupon.type === 'PERCENTAGE' && coupon.enabled) {
            let currentCustomerCoupon = (firstAmount * (parseFloat(coupon.discount) / 100)).toFixed(2);
            customerCoupons += parseFloat(currentCustomerCoupon).toFixed(2)
          }
        });
        customerCoupons = parseFloat(customerCoupons).toFixed(2);

        // corporate coupons 
        const corporateCouponsResponse = await axios.post('https://takemihome.it/it/front/booking/corporateCoupons', {
          customer: reduxData?.appData?.user?.id
        });
        corporateCouponsResponse?.data?.coupons?.forEach((coupon) => {
          if (coupon.type === 'PERCENTAGE' && coupon.enabled) {
            let currentCorproateCoupons = (firstAmount * (coupon.discount / 100)).toFixed(2);
            corporateCoupons += parseFloat(currentCorproateCoupons).toFixed(2)
          }
        });



      } else {
        // customer coupons
        // const customerCouponsResponse = await axios.post('https://takemihome.it/it/front/booking/customerCoupons', {
        //   customer: reduxData?.appData?.currentCorporateUser?.id
        // });


        // customerCouponsResponse?.data?.coupons.forEach((coupon) => {
        //   if (coupon.type === 'PERCENTAGE' && coupon.enabled) {
        //     let currentCustomerCoupon = (firstAmount * (parseFloat(coupon.discount) / 100)).toFixed(2);
        //     customerCoupons += parseFloat(currentCustomerCoupon).toFixed(2)
        //   }
        // });
        // customerCoupons = parseFloat(customerCoupons).toFixed(2);

        // // corporate coupons 
        // const corporateCouponsResponse = await axios.post('https://takemihome.it/it/front/booking/corporateCoupons', {
        //   customer: reduxData?.appData?.currentCorporateUser?.id
        // });
        // corporateCouponsResponse?.data?.coupons.forEach((coupon) => {
        //   if (coupon.type === 'PERCENTAGE' && coupon.enabled) {
        //     let currentCorproateCoupons = (firstAmount * (coupon.discount / 100)).toFixed(2);
        //     corporateCoupons += parseFloat(currentCorproateCoupons).toFixed(2)
        //   }
        // });


        customerCoupons = 0;
        corporateCoupons = 0;

      }

      corporateCoupons = parseFloat(corporateCoupons).toFixed(2);

      if (!isNaN(currentGiftAmount) && currentGiftAmount !== null) {
        giftCard = currentGiftAmount
      }

      finalAmount =
        parseFloat(firstAmount) -
        parseFloat(customerCoupons) -
        parseFloat(corporateCoupons) -
        parseFloat(giftCard);

      setPriceTableData({
        firstAmount,
        percentageAmount,
        customerCoupons,
        corporateCoupons,
        giftCard
      })

      finalAmount = parseFloat(finalAmount.toFixed(2));


      setAmountAfterCalculations(finalAmount)
      setPriceTableLoader(false)


    } catch (error) {
      console.error('Error', error.message);
    }
  };

  useEffect(() => {
    calculatePrice()
  }, [percentage, currentGiftAmount])



  // Handle radio button change
  const handleRadioChange = (value) => {
    setHasMassageBed(value)
  };

  useEffect(() => {
    setInitialAmount(reduxData?.appData?.totalAmount)
    // setX(reduxData?.appData?.totalAmount)
    discountGroup()
    corporateDiscountGroupData()
  }, [])

  useEffect(() => {
    if (outside == false && initalAmount) {
      dispatch({ type: "TOTALAMOUNT", payload: initalAmount })
      dispatch({ type: 'STOREEXTRAS', payload: null })
    }
  }, [outside])

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
      .min(1, 'Percentage cannot be less than 1')
      .max(100, 'Percentage cannot be greater than 100')
  });

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
    handleLocalData({
      type: "address",
      data: res.data[0],
    })
  }

  useEffect(() => {
    console.log('total amount is ', reduxData?.appData?.totalAmount)
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

          dispatch({ type: "GIFTCARDAMOUNT", payload: amountOfGiftCard })

          setCurrentGiftAmount(amountOfGiftCard)
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
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const resetCoupon = () => {
    dispatch({ type: 'STOREEXTRAS', payload: initalAmount })
  }

  const resetGiftCard = () => {
    setCurrentGiftAmount(0)
    dispatch({ type: 'REMOVEGIFTCARDAMOUNT' })
  }

  const handleBooking = () => {


    let nexiLink = paymentLink
    let res

    if (reduxData?.appData?.type == 'Corporate') {
      let totalDuration = 0;
      let services = []
      for (const item of reduxData?.appData?.cart) {
        totalDuration += item.duration;
        services.push(item.id)
      }
      let email = reduxData?.appData?.currentCorporateUser?.id
      if (reduxData?.appData?.extras != null) {
        res = intiateBooking(
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
          reduxData?.appData?.currentAddress?.id,
          reduxData?.appData?.appointmentId,
          hasMassageBed,
          nexiLink
        )
      } else {
        res = intiateBooking(
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
          reduxData?.appData?.currentAddress?.id,
          reduxData?.appData?.appointmentId,
          hasMassageBed,
          nexiLink
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
      let totalDuration = 0;
      let services = []
      for (const item of reduxData?.appData?.cart) {
        totalDuration += item.duration;
        services.push(item.id)
      }
      if (reduxData?.appData?.extras != null) {
        res = intiateBooking(
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
          reduxData?.appData?.currentAddress?.id,
          reduxData?.appData?.appointmentId,
          hasMassageBed,
          nexiLink
        )
      } else {
        res = intiateBooking(
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
          reduxData?.appData?.currentAddress?.id,
          reduxData?.appData?.appointmentId,
          hasMassageBed,
          nexiLink
        )
      }
      const paybylink = nexiPayByLink(data)
    }

    setCustomLoader(true)

    res.then((data) => {
      setCustomLoader(false)
      setAppointmentId(data?.status_id)
      setOpen(true)

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

  const handleAddress = async (data) => {
    let addressData = data
    if (addressData?.address1 == '' || addressData?.address2 == '' || addressData?.city == '') {
      alert("Please Enter All Fields")
      return
    }
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

  const discountGroup = () => {

    if (reduxData?.appData?.user?.id) {
      axios.post('https://takemihome.it/it/front/booking/customerCoupons', {
        customer: reduxData?.appData?.user?.id
      })
        .then((res) => {
          if (res?.data?.coupons.length > 0) {
            setGroupDisCount({
              name: res.data.coupons[0].name,
              discount: res.data.coupons[0].discount
            })
          }
        })
        .catch((err) => {
          console.error('Error', err.message)
        })
    } else {
      axios.post('https://takemihome.it/it/front/booking/customerCoupons', {
        customer: reduxData?.appData?.currentCorporateUser?.id
      })
        .then((res) => {
          if (res?.data?.coupons.length > 0) {
            setGroupDisCount({
              name: res.data.coupons[0].name,
              discount: res.data.coupons[0].discount
            })
          }
        })
        .catch((err) => {
          console.error('Error', err.message)
        })
    }



  }

  const corporateDiscountGroupData = () => {

    if (reduxData?.appData?.user?.id) {
      axios.post('https://takemihome.it/it/front/booking/corporateCoupons', {
        customer: reduxData?.appData?.user?.id
      })
        .then((res) => {
          if (res?.data?.coupons.length > 0) {
            setCorporateDiscountGroup({
              name: res.data.coupons[0].name,
              discount: res.data.coupons[0].discount
            })
          }
        })
        .catch((err) => {
          console.error('Error', err.message)
        })
    } else {
      axios.post('https://takemihome.it/it/front/booking/corporateCoupons', {
        customer: reduxData?.appData?.currentCorporateUser?.id
      })
        .then((res) => {
          if (res?.data?.coupons.length > 0) {
            setCorporateDiscountGroup({
              name: res.data.coupons[0].name,
              discount: res.data.coupons[0].discount
            })
          }
        })
        .catch((err) => {
          console.error('Error', err.message)
        })
    }

  }

  const resetPercentage = (e) => {
    e.preventDefault()
    dispatch({ type: 'STOREEXTRAS', payload: 0 })
    setPercentage(0)
  }

  const router = useRouter();
  const navigate_to_booking3 = () => {
    router.push("/booking3");
  };
  return (
    <div>
      {/* Booking 4 */}
      <div className="booking2 custom__conatiner mx-auto">
        <div className="mb-20 mt-[10rem]">
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
          <div className="flex flex-col h-full">
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
            <div className="flex justify-between items-center">
              <p className="my-3">Inital Amount is:</p>
              <p className="font-bold">
                {reduxData?.appData?.totalAmount} €
              </p>
            </div>


            {
              !priceTableLoader ? <>

                {
                  (priceTableData?.percentageAmount > 0) && <div className="flex justify-between items-center">
                    <p className="mt-3">Amount after Outside Extra Fee is:  </p>
                    <pre>    </pre>
                    <p className="font-bold">{priceTableData?.percentageAmount} €</p>
                  </div>
                }



                {
                  (priceTableData?.customerCoupons > 0) && <div className="flex justify-between items-center">
                    <p className="mt-3">Customer Coupon Amount is:  </p>
                    <pre>    </pre>
                    <p className="font-bold">{priceTableData?.customerCoupons} €</p>
                  </div>
                }


                {
                  (priceTableData?.corporateCoupons > 0) && <div className="flex justify-between items-center">
                    <p className="mt-3">Corporate Coupon Amount is:  </p>
                    <pre>    </pre>
                    <p className="font-bold">{priceTableData?.corporateCoupons} €</p>
                  </div>
                }


                {
                  (priceTableData?.giftAmount > 0) && <div className="flex justify-between items-center">
                    <p className="mt-3">Gift Card Amount is:  </p>
                    <pre>    </pre>
                    <p className="font-bold">{priceTableData?.giftAmount} €</p>
                  </div>
                }

                {
                  amountAfterCalculations && <div className="flex justify-between items-center">
                    <p className="my-3">Final Amount is:</p>
                    <p className="font-bold">
                      {amountAfterCalculations} €
                    </p>
                  </div>
                }

              </>

                :


                <div className="flex w-full justify-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>


            }

            {console.log(priceTableLoader)}

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
                  <select className="border w-full address rounded" onChange={(e) => handleAddressChange(JSON.parse(e.target.value))}>
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


          <div className="bg-gray-200 p-3 rounded-xl my-10">
            <h4 className="font-bold">Add New Address:</h4>
            <div>
              <div className="iconBox flex">
                <p className="w-full">
                  <div className="flex w-full">
                    <label className="w-2/3 flex items-center">Enter Address 1</label>
                    <input className="border w-full rounded p-1 pl-2"
                      placeholder="Enter Address 1"
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
                    <input className="border w-full p-1 pl-2 rounded"
                      placeholder="Enter Address 2"
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
          </div>


          {
            reduxData?.appData?.currentCity?.id != 5 ? <div className="w-full">
              <div className="iconBox flex">
                <p className="w-full">
                  <div className="flex w-full mb-2">
                    <label className="w-2/3">Enter the Payment Link for nexi italy</label>
                    <input className="border w-full address rounded" onChange={(e) => setPaymentLink(e.target.value)} />
                  </div>
                </p>
              </div>
            </div>
              :
              ''
          }

          <div>
            <p className="mt-5">
              Do you have a massage bed at home? Click also if the massage bed
              is not needed for the service you are booking
            </p>
            <div className="radio">
              <input type="radio" name='address' className="mr-2" checked={hasMassageBed}
                onChange={() => handleRadioChange(true)} />
              <label>Yes</label>
            </div>
            <div className="radio">
              <input type="radio" name='address' className="mr-2" checked={!hasMassageBed}
                onChange={() => handleRadioChange(false)} />
              <label>No</label>
            </div>


            <div className="mt-4 flex justify-center items-center flex-col gap-5">
              <Button text="Complete Booking" filled wfull onClick={handleBooking} />
              {
                customLoader &&
                <div role="status">
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              }
            </div>

          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}
      {/* Gift card */}

      <div className="custom__conatiner mx-auto p-5 border ">
        <h1 className="mb-5"><b>Price Table</b></h1>

        {/* Outside State */}

        <div className="w-full flex">

          <div className="w-6/12">


            <div className="w-12/12 border p-5">
              <>
                <div>
                  <Formik
                    initialValues={{ percentage: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      dispatch({ type: 'STOREEXTRAS', payload: values?.percentage })
                      setPercentage(values.percentage)
                      resetForm();
                      setSubmitting(false); // Manually set submitting to false after the reset
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
                          placeholder="Enter Your percentage here"
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
                        <button onClick={(e) => resetPercentage(e)} className="px-5 py-2 rounded  bg-black w-full mt-2">
                          Reset
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
              </>
            </div>
          </div>

          <div className="w-6/12">
            <div className="w-12/12 border p-5">
              <div className="w-12/12 ">
                <div className="flex items-left flex-col">
                  <p className="text-left">Add Gift Card</p>
                  <input type='text' onChange={(e) => { setCoupon(e.target.value) }} placeholder="Enter your voucher here" className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700" />
                  <button onClick={() => {
                    submitCoupon()
                  }} class="mb-2 px-5 py-2 rounded button-filled yellow-button w-full">Submit</button>
                  <button onClick={() => {
                    resetGiftCard()
                  }} class="w-full rounded flex gap-2 justify-center items-center focus:outline-none  bg-black hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>





        {/* Gift Cards */}




        {/* All Discounts */}

        <div className="w-12/12 border p-5">
          {
            groupDiscount &&
            <div>
              <h3><b>Discount Groups:</b></h3>
              <div className="flex justify-between">
                <p>
                  The discount from {groupDiscount?.name} is:
                </p>
                <p className="font-bold">
                  {groupDiscount?.discount} %
                </p>
              </div>
            </div>
          }
          {
            corporateDiscountGroup &&
            <div>
              <h3><b>Corporate Discount Groups:</b></h3>
              <div className="flex justify-between">
                <p>
                  The discount from {groupDiscount?.name} is:
                </p>
                <p className="font-bold">
                  {corporateDiscountGroup?.discount} %
                </p>
              </div>
            </div>
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
                    <p>ID is: {appointmentId}</p>
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