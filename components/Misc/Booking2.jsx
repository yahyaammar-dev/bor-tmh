import React, { useEffect, useState } from "react";
import CategoryCheckbox from "./CategoryCheckbox";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";
import {
  getProfessionalDetail,
  getcorporateprofessionalServices,
} from "../../pages/api/hello";
import { useDispatch } from "react-redux";
import { useDataHandler } from "../../utils/dataHandler";

const Booking2 = ({ loader, setLoader }) => {
  const router = useRouter();
  const [professionalDetail, setProfessionalDetail] = useState();
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  const {
    localData,
    listUsers,
    listCities,
    cities,
    handleLocalData,
    reduxData,
    corporatesList,
    corporateCustomerList,
  } = useDataHandler(setLoader);


  const handleAfterCart = () => {
    dispatch({ type: "REMOVEAFTERCART" });
  }

  useEffect(() => {
    if(!window.localStorage.getItem('user_profile')){
      router.push("/login"); 
    }
  }, [])


  const getProfessionalDeatils = async () => {
    setLoader(true);
    const data = {
      proId: reduxData?.appData?.currentProfessional?.id,
      subId: reduxData?.appData?.currentSub?.id,
      gender: reduxData?.appData?.currentGen?.id,
    };

    let res = null;
    let proDetail = null;
    let proService = null;
    let corporateServices = null;
    if (reduxData.appData.type == "Normal") {
      res = await getProfessionalDetail(data);
      proDetail = res.pro;
      proService = res.services;
      corporateServices = Object.values(res.subCategoriesServices);
    } else {
      res = await getcorporateprofessionalServices(
        reduxData?.appData?.currentProfessional?.id
      );
      corporateServices = Object.values(res.subCategoriesServices);
      proDetail = res.professional;
      proService = res.corporate_services;
    }
    setLoader(false);
    const professionalData = {
      proDetail,
      proService,
      corporateServices,
    };
    setProfessionalDetail(professionalData);
  };

  const handleProfessionalCart = (item) => {
    // Check if the item already exists in the cart
    const itemExists = cart.some((cartItem) => cartItem.id === item.id);
    // If the item does not exist, add it to the cart and update local data
    if (!itemExists) {
      const myCart = [...cart, item];
      setCart(myCart);
      // Update local data with the updated cart
      // handleLocalData({
      //   type1: "remove",
      //   type: "resetDataAfterCart"
      // })

      handleLocalData({
        type: "updateCart",
        data: myCart,
        duration: item.duration
      });
    } else {
      const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(updatedCart);
      handleLocalData({
        type: "updateCart",
        data: updatedCart,
        duration: item.duration,
      });
    }
  };

  const handleCategory = (item) => {
    setProfessionalDetail({
      ...professionalDetail,
      proService: item?.services,
    });
  };

  useEffect(() => {
    getProfessionalDeatils();
  }, []);

  return (
    !loader && (
      <div>
        {/* Select Service */}
        <div className="mt-20 booking2 custom__conatiner mx-auto text-center eigthy__container">
          <div className="mb-20 mt-10">
            <h2 className="text-center mb-1 text-2xl md:text-4xl font-extrabold dark:text-white">
              Which Kind of Services do you need?
            </h2>
            <h3 className="text-center mb-6 text-xl font-bold dark:text-white">
              Select the category and your professional
            </h3>
          </div>
          <div className="flex gap-4 sm:gap-10 justify-center">
            <div className="w-full mx-auto">
              <p className="mb-10">
                You can select one or more category - Minimum Booking Order : 35
                euro
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap">
                <div className="lg:w-3/12 sm:w-full">
                  <div class="flex flex-col space-y-2 border p-2">
                    <h1 className="text-1xl md:text-2xl font-bold text-left">
                      SubCategories
                    </h1>
                    <div className="sm:h-[15rem] overflow-auto custom-scrollbar">
                      {professionalDetail?.corporateServices?.map((item) => (
                        <label
                          class="flex justify-between space-x-2 border p-2 items-center "
                          onClick={() => handleCategory(item)}
                        >
                          <span className="text-left text-[10px] md:text-sm">{item?.name}</span>
                          <input
                            type="radio"
                            className="form-checkbox p-3"
                            name="category"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Cart and navigation  */}

                  {console.log('hello',reduxData?.appData?.cart)}
                  {
                    reduxData?.appData?.cart?.length > 0 ?
                      <div className="mt-4 cart w-12/12 border p-5 sm:h-[15rem] overflow-auto">
                        <h1 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white text-left text-[10px] md:text-sm">
                          Cart Summary
                        </h1>

                        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-left custom-scrollbar">
                          {reduxData?.appData?.cart?.map((item) => {
                            return (
                              <div className="flex justify-between">
                                <p className="inline text-[10px] md:text-sm">{item?.name} :</p>
                                <p className="inline text-[10px] md:text-sm">{item?.price}</p>
                              </div>
                            );
                          })}
                          {reduxData?.appData?.totalAmount && (
                            <div className="flex justify-between">
                              <p className="inline font-bold text-[10px] md:text-sm">Total Amount is: </p>
                              <p className="text-[10px] md:text-sm">
                               {reduxData?.appData?.totalAmount}
                              </p>
                            </div>
                          )}
                        </ul>
                      </div>
                      : ''
                  }



                  {/* <div className="w-8/12 flex gap-5">
          <div className="w-3/12">
            <Button text="Pervious" outlined wfull />
          </div>
          <div className="w-9/12">
            <Button
              text="Next"
              filled
              wfull
              onClick={() => router.push("/booking/booking3")}
            />
          </div>
        </div> */}
                </div>
                <div className="lg:w-9/12 lg:overflow-auto lg:h-[20rem]  custom-scrollbar sm:w-12/12">
                  {professionalDetail?.proService?.map((item) => (
                    <div className="flex gap-4 sm:gap-10 mt-3 mx-auto justify-center">
                      <div className="flex justify-between py-2 gap-4 px-3 w-lg border border-black w-full lg:w-2/3 h-fit rounded">
                        <p className=" flex w-6/12 sm:w-12/12  text-left text-[10px]  sm:text-sm">
                          {item?.name}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-2 ml-[2rem]">
                          <div className="flex items-center">
                            <img src="/imgs/hand.svg" className="w-4 sm:w-8" />
                            <p className="text-[10px] sm:text-sm">{item?.duration}</p>
                          </div>
                          <div className="hidden lg:block">
                            <p className=" mb-1 ">|</p>
                          </div>
                          <div className="flex items-center">
                            <img src="/imgs/download.svg" className="w-4 sm:w-8" />
                            <p className="text-[10px] sm:text-sm">{item?.price}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">

                        <button
                          className="p-1"
                          style={
                            reduxData?.appData?.cart?.some(
                              (itm) => itm?.id == item?.id
                            )
                              ? {
                                backgroundColor: "#DAA520",

                                borderRadius: "20%",
                              }
                              : {}
                          }
                        >
                          <img
                            src="/imgs/addcircle.svg"
                            className="w-8"
                            onClick={() => {
                              handleAfterCart()
                              handleProfessionalCart(item)
                            }}
                          />
                        </button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex gap-4 sm:gap-10 pt-8 justify-center sm:justify-end flex-col md:flex-row md:max-w-[50%] ml-auto">
            <Button
              wfull
              text="Back"
              onClick={() => {
                router.push("/booking");
              }}
            />
            <Button
              wfull
              text="Next"
              disableded={reduxData?.appData?.cart?.length == 0 ? true : false}
              onClick={() => {
                if (reduxData?.appData?.cart?.length == 0) {
                  return;
                }
                router.push("/booking/booking3");
              }}
            />
          </div>
        </div>

        <div className="booking2 custom__conatiner gap-1 sm:gap-4 mx-auto mt-[5rem] eigthy__container">
          {/* Porfessional Detail */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <div className="item sm:w-3/12">
              {/* <img src="https://takemihome.it/upload/media/default/0001/01/thumb_603_default_card.jpeg" /> */}
              <img
                className="w-full md:w-[60%]"
                src={`https://takemihome.it/${professionalDetail?.proDetail?.profile_image?.url}`}
              />
            </div>
            <div className="item sm:w-7/12">
              <h2 className="mb-1 text-4xl font-extrabold dark:text-white text-[10px] md:text-sm">
                { }
              </h2>
              <h3 className="lg:text-2xl text-md font-bold dark:text-white text-[10px] md:text-sm">
                {professionalDetail?.proDetail?.full_name}
              </h3>
              <p className=" text-gray-500 dark:text-gray-400 text-[10px] md:text-sm">
                {professionalDetail?.proDetail?.biography}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Booking2;
