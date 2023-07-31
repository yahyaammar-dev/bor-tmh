import React from "react";
import Select from "react-select";
import Button from "@/components/Misc/Button";
import Professional from "@/components/Misc/Professional";
import Fade from "../Transition/Fade";
import selectStyles from "@/styles/selectStyles";
import { useDataHandler } from "@/utils/dataHandler"; // Import the useDataHandler function from the dataHandler.js file
import CorporateBooking from "./CorporateBooking";

const Booking1 = ({ loader, setLoader }) => {
  const {
    localData,
    listUsers,
    listCities,
    cities,
    handleLocalData,
    reduxData,
    corporatesList
  } = useDataHandler(setLoader); // Use the useDataHandler hook to access the functions and state

  const postal = [
    { value: "123123", label: "123123" },
    { value: "123123", label: "12312" },
  ];
  console.log(listCities);

  return (
    <div>
      {/* Booking 1 */}
      <div className="booking1 custom__conatiner mx-auto">
        {/* City */}
        <div className="city mb-10">
          <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
            Select Type
          </h1>
          <div className="flex justify-center gap-5">
            <div className="item">
              <Button
                text="Corporate Booking"
                variant={
                  localData?.type === "Corporate" ? "active" : "outlined"
                }
                onClick={() => {
                  handleLocalData({
                    type: "resetData",
                  });
                  handleLocalData({
                    type: "type",
                    data: "Corporate",
                  });
                }}
              />
            </div>
            <div className="item">
              <Button
                text="Normal Booking"
                variant={localData?.type === "Normal" ? "active" : "outlined"}
                onClick={() => {
                  handleLocalData({
                    type: "resetData",
                  });
                  handleLocalData({
                    type: "type",
                    data: "Normal",
                  });
                }}
              />
            </div>
          </div>
        </div>

        {localData?.type === "Corporate" ? (
          <div className="corporate_container">
            {reduxData?.appData?.cities?.length > 0 && (
              <Fade>
                <div className="city mb-10">
                  <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                    Select a city
                  </h1>
                  <div className="flex justify-center gap-5">
                    <div className="item">
                      <Select
                        options={listCities}
                        onChange={(item) => {
                          handleLocalData({
                            type: "city",
                            data: item,
                          });
                        }}
                        placeholder="City"
                        styles={selectStyles}
                      />
                    </div>
                    <div className="item">
                      <Select
                        options={postal}
                        // onChange={(item) => {
                        //   setLocale(item.value);
                        // }}
                        placeholder="Postal Code"
                        styles={selectStyles}
                      />
                    </div>
                  </div>
                </div>
              </Fade>
            )}


            {reduxData?.appData?.corporates?.length > 0 && (
              <Fade>
                <div className="city mb-10">
                  <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                    Select a Corporate
                  </h1>
                  <div className="flex justify-center gap-5">
                    <div className="item">
                      <Select
                        options={corporatesList}
                        onChange={(item) => {
                          handleLocalData({
                            type: "corporate",
                            data: item,
                          });
                        }}
                        placeholder="Corporate"
                        styles={selectStyles}
                      />
                    </div>
                  
                  </div>
                </div>
              </Fade>
            )}
  

            {reduxData?.appData?.corporateUsers?.length > 0 && (
              <Fade>
                <div className="city mb-10">
                  <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                    Select Corproate Users
                  </h1>
                  <div className="flex justify-center gap-5">
                    <div className="item">
                      <Select
                        options={corporatesList}
                        onChange={(item) => {
                          handleLocalData({
                            type: "corporateCategories",
                            data: item,
                          });
                        }}
                        placeholder="Corporate User"
                        styles={selectStyles}
                      />
                    </div>
                  
                  </div>
                </div>
              </Fade>
            )}


            {reduxData?.appData?.categories?.length > 0 && (
              <div className="categories my-16">
                <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                  Select a Category
                </h1>
                <div className="flex justify-center gap-5">
                  {reduxData?.appData?.categories?.map((item) => {
                    return (
                      <Button
                        text={item?.name}
                        variant={
                          localData?.category?.name == item?.name
                            ? "active"
                            : "outlined"
                        }
                        onClick={() => {
                          handleLocalData({
                            type: "category",
                            data: item,
                          });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}





{reduxData?.appData?.subCategories?.length > 0 && (
              <Fade>
                <div className="categories my-16">
                  <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                    Select SubCategory
                  </h1>
                  <div className="flex justify-center gap-5">
                    {reduxData?.appData?.subCategories?.map((item) => {
                      return (
                        <Button
                          text={item?.name}
                          variant={
                            localData?.currentSubCat?.name == item?.name
                              ? "active"
                              : "outlined"
                          }
                          onClick={() => {
                            handleLocalData({
                              type: "subcategory",
                              data: item,
                            });
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </Fade>
            )}

            {reduxData?.appData?.genders?.length > 0 && (
              <div className="categories my-16">
                <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                  Select Gender
                </h1>
                <div className="flex justify-center gap-5">
                  {reduxData?.appData?.genders?.map((item) => {
                    return (
                      <Button
                        text={item?.name}
                        variant={
                          localData?.currentGender?.name == item?.name
                            ? "active"
                            : "outlined"
                        }
                        onClick={() => {
                          handleLocalData({
                            type: "gender",
                            data: item,
                          });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}





          </div>
        ) : (
          <div className="normal_container">
            {reduxData?.appData?.users?.length > 0 && (
              <Fade>
                <div className="city mb-10">
                  <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                    Select a User
                  </h1>
                  <div className="flex justify-center gap-5">
                    <div className="item">
                      <Select
                        options={listUsers}
                        onChange={(item) => {
                          handleLocalData({
                            type: "user",
                            data: item,
                          });
                        }}
                        placeholder="Select User"
                        styles={selectStyles}
                      />
                    </div>
                  </div>
                </div>
              </Fade>
            )}

            {reduxData?.appData?.cities?.length > 0 && (
              <Fade>
                <div className="city mb-10">
                  <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                    Select a city
                  </h1>
                  <div className="flex justify-center gap-5">
                    <div className="item">
                      <Select
                        options={listCities}
                        onChange={(item) => {
                          handleLocalData({
                            type: "city",
                            data: item,
                          });
                        }}
                        placeholder="City"
                        styles={selectStyles}
                      />
                    </div>
                    <div className="item">
                      <Select
                        options={postal}
                        // onChange={(item) => {
                        //   setLocale(item.value);
                        // }}
                        placeholder="Postal Code"
                        styles={selectStyles}
                      />
                    </div>
                  </div>
                </div>
              </Fade>
            )}

            {reduxData?.appData?.categories?.length > 0 && (
              <div className="categories my-16">
                <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                  Select a Category
                </h1>
                <div className="flex justify-center gap-5">
                  {reduxData?.appData?.categories?.map((item) => {
                    return (
                      <Button
                        text={item?.name}
                        variant={
                          localData?.category?.name == item?.name
                            ? "active"
                            : "outlined"
                        }
                        onClick={() => {
                          handleLocalData({
                            type: "category",
                            data: item,
                          });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {reduxData?.appData?.subCategories?.length > 0 && (
              <Fade>
                <div className="categories my-16">
                  <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                    Select SubCategory
                  </h1>
                  <div className="flex justify-center gap-5">
                    {reduxData?.appData?.subCategories?.map((item) => {
                      return (
                        <Button
                          text={item?.name}
                          variant={
                            localData?.currentSubCat?.name == item?.name
                              ? "active"
                              : "outlined"
                          }
                          onClick={() => {
                            handleLocalData({
                              type: "subcategory",
                              data: item,
                            });
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </Fade>
            )}

            {reduxData?.appData?.genders?.length > 0 && (
              <div className="categories my-16">
                <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                  Select Gender
                </h1>
                <div className="flex justify-center gap-5">
                  {reduxData?.appData?.genders?.map((item) => {
                    return (
                      <Button
                        text={item?.name}
                        variant={
                          localData?.currentGender?.name == item?.name
                            ? "active"
                            : "outlined"
                        }
                        onClick={() => {
                          handleLocalData({
                            type: "gender",
                            data: item,
                          });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {reduxData?.appData?.professionals?.length > 0 && (
              <div className="categories my-16">
                <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                  Select Professional
                </h1>
                <div className="flex justify-center gap-5 flex-wrap">
                  {reduxData?.appData?.professionals?.map((item) => {
                    return (
                      <Professional
                        profile_image={item.profile_image.full_url}
                        fullName={item?.full_name}
                        position={item?.position}
                        onClick={() => {
                          handleLocalData({
                            type: "professional",
                            data: item,
                          });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking1;
