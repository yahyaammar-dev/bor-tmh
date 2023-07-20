import React from "react";
import CategoryCheckbox from "./CategoryCheckbox";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";

const Booking2 = () => {
  const router = useRouter();
  const navigate_to_booking3 = () => {
    router.push("/booking3");
  };
  return (
    <div>
      {/* Booking 2 */}
      <div className="booking2 custom__conatiner mx-auto">
        {/* Porfessional Detail */}
        <div className="flex gap-10">
          <div className="item w-3/12">
            <img src="https://takemihome.it/upload/media/default/0001/01/thumb_603_default_card.jpeg" />
          </div>
          <div className="item w-7/12">
            <h2 className="mb-1 text-4xl font-extrabold dark:text-white">
              Sarah Shitty
            </h2>
            <h3 className="mb-6 text-xl font-bold dark:text-white">
              Makeup Artist
            </h3>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
              Deliver great service experiences fast - without the complexity of
              traditional ITSM solutions. Accelerate critical development work,
              eliminate toil, and deploy changes with ease. Deliver great
              service experiences fast - without the complexity of traditional
              ITSM solutions. Accelerate critical development work, eliminate
              toil, and deploy changes with ease. Deliver great service
              experiences fast - without the complexity of traditional ITSM
              solutions. Accelerate critical development work, eliminate toil,
              and deploy changes with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Select Service */}
      <div className="mt-20 booking2 custom__conatiner mx-auto text-center">
        <div className="mb-20 mt-10">
          <h2 className="text-center mb-1 text-4xl font-extrabold dark:text-white">
            What day will suit you best?
          </h2>
          <h3 className="text-center mb-6 text-xl font-bold dark:text-white">
            Select Your Day and Time
          </h3>
        </div>
        <div className="flex">
          {/* <div className="w-6/12 border p-5">
            <p>My Booking with</p>
            <h1>Solvoa Aru</h1>
            <div className="cart__report">
              <ul>
                <li>My Service</li>
                <li>Beauty and wellness / Wazing/ woman</li>
                <div className="category__checkbox flex gap-10 border py-3 justify-between px-3">
                  <p>Brows Lashes</p>
                  <div className="flex items-center">
                    <img src="/imgs/addIcon.svg" />
                    <p>15min</p>
                    <p className="mx-10">|</p>
                    <img src="/imgs/addIcon.svg" />
                    <p>15min</p>
                  </div>
                </div>
              </ul>
              <div className="category__checkbox flex gap-10 border py-3 justify-between px-3">
                <p>Brows Lashes</p>
                <div className="flex items-center">
                  <img src="/imgs/addIcon.svg" />
                  <p>15min</p>
                  <p className="mx-10">|</p>
                  <img src="/imgs/addIcon.svg" />
                  <p>15min</p>
                </div>
              </div>
              <hr />
              <div className="flex mt-5">
                <p>Total Amount: </p>
                <pre> </pre>
                <p>75 euro</p>
              </div>
            </div>
          </div> */}
          <div className="w-full">
            <div className="flex items-center justify-center">
              <div className="max-w-sm w-full shadow-lg">
                <div className="md:p- p-5 dark:bg-gray-800 bg-white rounded-t">
                  <div className="px-4 flex items-center justify-between">
                    <span
                      tabindex="0"
                      className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
                    >
                      October 2020
                    </span>
                    <div className="flex items-center">
                      <button
                        aria-label="calendar backward"
                        className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-left"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <polyline points="15 6 9 12 15 18" />
                        </svg>
                      </button>
                      <button
                        aria-label="calendar forward"
                        className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler  icon-tabler-chevron-right"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <polyline points="9 6 15 12 9 18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-12 overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Mo
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Tu
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                We
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Th
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Fr
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Sa
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex justify-center">
                              <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                Su
                              </p>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                          </td>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                          </td>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                1
                              </p>
                            </div>
                          </td>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                2
                              </p>
                            </div>
                          </td>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                3
                              </p>
                            </div>
                          </td>
                          <td className="pt-6">
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                4
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                5
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                6
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                7
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="w-full h-full">
                              <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                <a
                                  role="link"
                                  tabindex="0"
                                  className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full"
                                >
                                  8
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                9
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                10
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                11
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                12
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                13
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                14
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                15
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                16
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                17
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                18
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                19
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                20
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                21
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                22
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                23
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                24
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100">
                                25
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                26
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                27
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                28
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                29
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                              <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                30
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mt-10">
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                  <Button text="07:00" outlined />
                </div>
                <div className="my-10">
                  <Button text="Save Date and Time" outlined />
                </div>
                <div className="flex flex-wrap gap-5 justify-center my-10">
                  <Button text='Back' outlined />
                  <Button text='Next' filled w-full onClick={()=>router.push('booking4')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking2;
