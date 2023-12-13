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
        duration: item.duration,
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
        <div className="mt-20 booking2 custom__conatiner mx-auto text-center">
          <div className="mb-20 mt-10">
            <h2 className="text-center mb-1 text-2xl md:text-4xl font-extrabold dark:text-white">
              Which Kind of Services do you need?
            </h2>
            <h3 className="text-center mb-6 text-xl font-bold dark:text-white">
              Select the category and your professional
            </h3>
          </div>
          <div className="flex gap-4 sm:gap-10 justify-center">
            {/* Needs to be uncommented and integrated later */}
            {/* <div className="w-3/12 flex flex-col gap-3">
            <p className="text-black bg-white py-3 px-10 text-center mb-5">
              Main Category
            </p>
            <CategoryCheckbox />
            <CategoryCheckbox />
            <CategoryCheckbox />
            <CategoryCheckbox />
            <CategoryCheckbox />
            <CategoryCheckbox />
            <CategoryCheckbox />
          </div> */}
            <div className="w-full mx-auto">
              <p className="mb-10">
                You can select one or more category - Minimum Booking Order : 35
                euro
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap">
                <div className="md:w-3/12 sm:w-full">
                  <div class="flex flex-col space-y-2 border p-2">
                    <h1 className="text-1xl md:text-2xl font-bold text-left">
                      SubCategories
                    </h1>
                    <div className="sm:h-[15rem] overflow-auto custom-scrollbar">
                      {professionalDetail?.corporateServices?.map((item) => (
                        <label
                          class="flex justify-between space-x-2 border p-2 items-center"
                          onClick={() => handleCategory(item)}
                        >
                          <span>{item?.name}</span>
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
                  <div className="mt-4 cart w-12/12 border p-5 sm:h-[15rem] overflow-auto">
                    <h1 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white text-left">
                      Cart Summary
                    </h1>
                    {/* <p>
                        Professional: <b>Silvia Aru</b>
                      </p>
                      <p>My Services</p>
                      <p>Beauty and wellenss/Woman</p> */}
                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-left custom-scrollbar">
                      {reduxData?.appData?.cart?.map((item) => {
                        return (
                          <div>
                            <p className="inline">{item?.name} :</p>
                            <p className="inline">{item?.price}</p>
                          </div>
                        );
                      })}
                      {reduxData?.appData?.totalAmount && (
                        <>
                          <p className="inline font-bold">Total Amount is: </p>
                          {reduxData?.appData?.totalAmount}
                        </>
                      )}
                    </ul>
                  </div>

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
                <div className="md:w-9/12 sm:h-[20rem] overflow-y-auto custom-scrollbar sm:w-12/12">
                  {professionalDetail?.proService?.map((item) => (
                    <div className="flex gap-4 sm:gap-10 mt-3 mx-auto justify-center">
                      <div className="flex justify-between  gap-4   py-2 md:py-8  px-3 w-lg border border-black sm:w-2/3 flex-wrap">
                        <p className=" flex w-6/12 sm:w-12/12  text-left ">
                          {item?.name}
                        </p>
                        <div className="flex items-center gap-2 ml-[2rem]   ">
                          <img src="/imgs/hand.svg" className="w-8 " />
                          <p>{item?.duration}</p>
                          <p className=" mb-1 ">|</p>
                          <img src="/imgs/download.svg" className="w-8  " />
                          <p>{item?.price}</p>
                        </div>
                      </div>
                      <button
                        style={
                          reduxData?.appData?.cart?.some(
                            (itm) => itm?.id == item?.id
                          )
                            ? {
                                backgroundColor: "#DAA520",

                                height: "4rem",
                                borderRadius: "20%",
                                marginTop: "10px",
                              }
                            : {}
                        }
                      >
                        <img
                          src="/imgs/addcircle.svg"
                          className="w-8"
                          onClick={() => handleProfessionalCart(item)}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex gap-4 sm:gap-10 pt-8 justify-center sm:justify-end ">
            <Button
              text="Back"
              onClick={() => {
                router.push("/booking");
              }}
            />
            <Button
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

        <div className="booking2 custom__conatiner gap-1 sm:gap-4 mx-auto mt-[5rem]">
          {/* Porfessional Detail */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <div className="item sm:w-3/12">
              {/* <img src="https://takemihome.it/upload/media/default/0001/01/thumb_603_default_card.jpeg" /> */}
              <img
                src={`https://takemihome.it/${professionalDetail?.proDetail?.profile_image?.url}`}
              />
            </div>
            <div className="item sm:w-7/12">
              <h2 className="mb-1 text-4xl font-extrabold dark:text-white">
                {}
              </h2>
              <h3 className="mb-6 text-xl font-bold dark:text-white">
                {professionalDetail?.proDetail?.full_name}
              </h3>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
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
