import React from "react";
import CategoryCheckbox from "./CategoryCheckbox";
import Image from "next/image";
import Button from "./Button";
import Select from "react-select";
import { useRouter } from "next/router";

const Booking4 = () => {
  const cities = [
    { value: "Milano", label: "Milano" },
    { value: "Roma", label: "Roma" },
  ];

  const postal = [
    { value: "123123", label: "123123" },
    { value: "123123", label: "12312" },
  ];

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
          <h3 className="font-bold">My Services</h3>
          <p>Loreum ipsumips umipsu mipsumi psum ipsumipsu mipsumipsum ipsum</p>
          <ul>
            <li>My Service</li>
            <li>Beauty and wellness / Wazing/ woman</li>
            <div className="category__checkbox flex gap-10 border py-3 justify-between px-3">
              <p>Brows Lashes</p>
              <div className="flex items-center">
                <img src="/imgs/add.png" />
                <p>15min</p>
                <p className="mx-10">|</p>
                <img src="/imgs/add.png" />
                <p>15min</p>
              </div>
            </div>
          </ul>
        </div>
        <div className="w-6/12 border p-5">
          <div className="iconBox flex">
            <img src="/imgs/add.png" />
            <p>Account test</p>
          </div>
          <div className="iconBox flex">
            <img src="/imgs/add.png" />
            <p>Account test</p>
          </div>
          <div className="iconBox flex">
            <img src="/imgs/add.png" />
            <p>Account test</p>
          </div>
          <div className="iconBox flex">
            <img src="/imgs/add.png" />
            <Select
              options={cities}
              // onChange={(item) => {
              //   setLocale(item.value);
              // }}
              placeholder="City"
              styles={selectStyles}
            />
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
        <div className="flex mt-2">
          <div className="w-6/12">
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
          </div>
          <div className="w-6/12">
            <Button text="Pay and Book" filled wfull />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking4;
