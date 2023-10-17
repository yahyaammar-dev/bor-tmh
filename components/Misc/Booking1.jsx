import React, { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../../components/Misc/Button";
import Professional from "../../components/Misc/Professional";
import Fade from "../Transition/Fade";
import selectStyles from "../../styles/selectStyles";
import { useDataHandler } from "../../utils/dataHandler"; // Import the useDataHandler function from the dataHandler.js file
import CorporateBooking from "./CorporateBooking";
import Link from "next/link";
import { getCorporateCategories } from "../../pages/api/hello";

const Booking1 = ({ loader, setLoader }) => {
  const [dowloaded , setDowloaded] = useState(false);
  const {
    localData,
    listUsers,
    listCities,
    cities,
    handleLocalData,
    reduxData,
    corporatesList,
    corporateCustomerList,
  } = useDataHandler(setLoader); // Use the useDataHandler hook to access the functions and state


  const postal = [
    { value: "123123", label: "123123" },
    { value: "123123", label: "12312" },
  ];
  useEffect(() => {
    setDowloaded(true);
  },[])


  const handleAfterCity = () => {
    handleLocalData({
      type1:"remove",
      type: "resetDataAfterCity",
    });
  }
  const handleAfterCategory = () => {
    handleLocalData({
      type1:"remove",
      type: "resetDataAfterCategory",
    });
  }
  const handleAfterSubCategory = () => {
    handleLocalData({
      type1:"remove",
      type: "resetDataAfterSubCategory",
    });
  }
  const handleAfterCorporate = () => {
    handleLocalData({
      type1:"remove",
      type: "resetDataAfterCorporate",
    });
  }
  const handleAfterCorporateUser = () => {
    handleLocalData({
      type1:"remove",
      type: "resetDataAfterCorporateUser",
    });
  }
  const handleAfterGender = () => {
    handleLocalData({
      type1:"remove",
      type: "resetDataAfterGender",
    });
  }
  const handleAfterProfessional = () => {
    handleLocalData({
      type1:"remove",
      type: "resetDataAfterProfessional",
    });
  }
  


  console.log(reduxData)

  
  return (
    <div>
      {dowloaded && (<>
      {/* Booking 1 */}
      <div className="booking1 custom__conatiner mx-auto custom__margin__top">
        {/* City */}
        <div className="city mb-10">
          <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
            Select Type  
          </h1>
          <div className="flex justify-center gap-5">
            <div className="item">
              <Button
                wfull={null}
                text="Corporate Booking"
                variant={
                  reduxData?.appData?.type === "Corporate" ? "active" : "outlined"
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
                text="Concierge Booking"
                variant={reduxData?.appData?.type === "Normal" ? "active" : "outlined"}
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

        {reduxData?.appData?.type === "Corporate" ? (
          <div className="corporate_container">
            {reduxData?.appData?.cities?.length > 0 && (
              <Fade>
                <div className="city mb-10">
                  <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
                    Select a city
                  </h1>
                  <div className="flex justify-center gap-5">
                    <div className="item" >
                      <Select
                        value={reduxData?.appData?.currentCity}
                        options={
                          reduxData?.appData?.cities?.length > 0
                            ? reduxData?.appData?.cities
                            : reduxData?.appData?.currentCity ? 
                            reduxData?.appData?.currentCity : []
                        }
                        onChange={(item) => {
                          handleAfterCity()
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
                        value={reduxData?.appData?.currCorporate != null ? reduxData?.appData?.currCorporate : "no data"}
                        options={reduxData?.appData?.corporates?.length > 0
                          ? reduxData?.appData?.corporates
                          : reduxData?.appData?.currCorporate ? 
                          reduxData?.appData?.currCorporate : []}
                        onChange={(item) => {
                          handleAfterCorporate(),
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
                    Select Corporate Users
                  </h1>
                  <div className="flex justify-center gap-5">
                    <div className="item">
                      <Select
                        value={reduxData?.appData?.currentCorporateUser != null ? reduxData?.appData?.currentCorporateUser : "no data"}
                        options={reduxData?.appData?.corporateUsers?.length > 0
                          ? reduxData?.appData?.corporateUsers
                          : reduxData?.appData?.currentCorporateUser ? 
                          reduxData?.appData?.currentCorporateUser : []}
                        onChange={(item) => {
                          handleAfterCorporateUser(),
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
                          reduxData?.appData?.currentCat?.name == item?.name
                            ? "active"
                            : "outlined"
                        }
                        onClick={() => {
                          handleAfterCategory(),
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
                            reduxData?.appData?.currentSub?.name == item?.name
                              ? "active"
                              : "outlined"
                          }
                          onClick={() => {
                            handleAfterSubCategory(),
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
                          reduxData?.appData?.currentGen?.name == item?.name
                            ? "active"
                            : "outlined"
                        }
                        onClick={() => {
                          handleAfterGender(),
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
                        profile_image={`https://takemihome.it/${item.image}`}
                        fullName={item?.full_name ? item?.full_name : item?.name ? item?.name : ''}
                        position={item?.position}
                        onClick={() => {
                          handleAfterProfessional(),
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
                        // options={listUsers}
                        options={listUsers.map(user => ({
                          value: user, // Assuming 'email' is the property containing the email
                          label: `${user.label} (${user.email})`, // Customize the label to display both name and email
                        }))}
                        onChange={(item) => {
                          console.log('item is:: ',item)
                          handleLocalData({
                            type: "user",
                            data: item.value,
                          });
                        }}
                        placeholder="Select User"
                        styles={selectStyles}
                      />
                    </div>
                    <div>
                      <Link href='create-user'>
                        <button className="px-5 py-2 rounded button-filled">Create User</button>
                      </Link>
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
                        profile_image={item?.profile_image?.full_url}
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
      </>)}
    </div>
  );
};

export default Booking1;
