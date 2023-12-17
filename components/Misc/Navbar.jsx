import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDataHandler } from "../../utils/dataHandler";

const Navbar = () => {
  const dispatch = useDispatch();

  const { reduxData } = useDataHandler(); // Use the useDataHandler hook to access the functions and state

  const router = useRouter();
  const options = [
    { value: "English", label: "English" },
    { value: "Italian", label: "Italian" },
  ];

  // Define custom styles for React Select
  const selectStyles = {
    container: (provided) => ({
      ...provided,
      width: "150px", // Adjust the width of the select container as needed
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
  const [menuOpen, setMenuopen] = useState(false);
  console.log("menuOpen :>> ", menuOpen);
  return (
    <div className="px-10   mb-16 mt-5">
      <header className="left-0 z-[10000] right-0 px-2">
        <nav className="border-dark py-2.5  ">
          <div className=" flex flex-wrap  justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                TMH
              </span>
            </a>
            <div className="hidden md:flex  mx-[50px] md:items-center lg:order-2">
              {reduxData?.appData?.isEdit && (
                <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                  Edit Mode
                </span>
              )}
              <a
                href="/edit-appointment"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Appointments
              </a>
              <a
                href="/exporter"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Exporter
              </a>
              <a
                href="/create-user"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Create Users
              </a>
              <a
                href="/booking"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Book Now
              </a>

              <Button
                text="Reset Data"
                onClick={() => {
                  dispatch({ type: "RESETALLDATA" });
                  router.push("/");
                }}
              >
                Reset Now
              </Button>
            </div>
            <div className="flex md:hidden   mx-[80px]">
              <button onClick={() => setMenuopen(!menuOpen)}>
                {menuOpen ? (
                  <button
                    onClick={() => setMenuopen(!menuOpen)}
                    id="navbarToggler"
                    aria-label="Mobile Menu"
                    className="absolute  right-4 top-1/2 block translate-y-[-50%] rounded-lg px-2  py-[5px] ring-primary  focus:ring-2 lg:hidden"
                  >
                    <span className="relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white bottom-[-4.4px] rotate-45"></span>
                    <span className="relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white opacity-0 "></span>
                    <span className="relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white top-[-11px] -rotate-45"></span>
                  </button>
                ) : (
                  <button
                    onClick={() => setMenuopen(!menuOpen)}
                    id="navbarToggler"
                    aria-label="Mobile Menu"
                    className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-2 py-[5px] ring-primary focus:ring-2 lg:hidden"
                  >
                    <span className="relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white "></span>
                    <span className="relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white "></span>
                    <span className="relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white "></span>
                  </button>
                )}
              </button>
            </div>
          </div>
        </nav>
        <hr />
        {menuOpen && (
          <div className=" md:hidden  w-[8rem]   flex flex-col  ml-[8rem] sm:ml-[18rem]  ">
            <nav
              id="navbarCollapse"
              class="navbar absolute  right-0  w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 visibility top-full opacity-100"
            >
              <ul class="block lg:flex lg:space-x-12">
                <li class="group relative">
                  <a
                    href="/edit-appointment"
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  >
                    Appointments
                  </a>
                </li>
                <li class="group relative">
                  <a
                    href="/exporter"
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  >
                    Exporter
                  </a>
                </li>
                <li class="group relative">
                  <a
                    href="/create-user"
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  >
                    Create Users
                  </a>
                </li>
                <li class="group relative">
                  <a
                    href="/booking"
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  >
                    Book Now
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
