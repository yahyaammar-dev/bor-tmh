import React, { useEffect, useState } from "react";
import CategoryCheckbox from "./CategoryCheckbox";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/router";
import { getProfessionalDetail, getSubCategories,getcorporateprofessionalServices } from "@/apis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Booking2 = (props) => {
  const router = useRouter();
  const reduxData = useSelector((state) => state);
  const [professionalDetail, setProfessionalDetail] = useState();
  const [cart, setCart] = useState([])
  const dispatch = useDispatch()


  console.log('redux data is', reduxData)

  const getProfessionalDeatils = async () => {
    const data = {
      proId: reduxData?.appData?.currentProfessional?.id,
      subId: reduxData?.appData?.currentSub?.id,
      gender: reduxData?.appData?.currentGen?.id,
    };
    // const res = await getProfessionalDetail(data);
    // console.log( 'professional service', reduxData)
    const res = await getcorporateprofessionalServices(reduxData?.appData?.currentProfessional?.id)
    

    const proDetail = JSON.parse(res.professional);
    const proService = res.corporate_services;

    // console.log( 'professional result', proDetail, proService)

    const professionalData = {
      proDetail,
      proService,
    };

    setProfessionalDetail(professionalData);
    console.log(professionalData);
  };

  const handleProfessionalCart = (item) => {
    setCart((cart) => [...cart, item]);
  };


  useEffect(()=>{
    dispatch({
      type: "ADDCART",
      payload: cart
    })
  },[cart])

  useEffect(() => {
    getProfessionalDeatils();
  }, []);

  return (
    <div>
      {/* Booking 2 */}
      <div className="booking2 custom__conatiner mx-auto">
        {/* Porfessional Detail */}
        <div className="flex gap-10">
          <div className="item w-3/12">
            <img src="https://takemihome.it/upload/media/default/0001/01/thumb_603_default_card.jpeg" />
            {/* <img src={professionalDetail?.proDetail?.profile_image?.full_url} /> */}
          </div>
          <div className="item w-7/12">
            <h2 className="mb-1 text-4xl font-extrabold dark:text-white">{}</h2>
            <h3 className="mb-6 text-xl font-bold dark:text-white">
              {professionalDetail?.proDetail?.full_name}
            </h3>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
              {professionalDetail?.proDetail?.biography}
            </p>
          </div>
        </div>
      </div>

      {/* Select Service */}
      <div className="mt-20 booking2 custom__conatiner mx-auto text-center">
        <div className="mb-20 mt-10">
          <h2 className="text-center mb-1 text-4xl font-extrabold dark:text-white">
            Which Kind of Services do you need?
          </h2>
          <h3 className="text-center mb-6 text-xl font-bold dark:text-white">
            Select the category and your professional
          </h3>
        </div>
        <div className="flex gap-10">
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
            <p className="mb-2">
              You can select one or more category - Minimum Booking Order : 35
              euro
            </p>
            {professionalDetail?.proService?.map((item) => (
              <div className="flex gap-10 mt-3 mx-auto justify-center">
                <div className="category__checkbox flex gap-10 border py-3 justify-between px-3 w-lg">
                  <p>{item?.name}</p>
                  <div className="flex items-center">
                    <img src="/imgs/hand.svg" className="w-8" />
                    <p>{item?.duration}</p>
                    <p className="mx-10">|</p>
                    <img src="/imgs/download.svg" className="w-8" />
                    <p>{item?.price}</p>
                  </div>
                </div>

                <button>
                  <img src="/imgs/addcircle.svg" className="w-8" onClick={()=>handleProfessionalCart(item)} />
                </button>
              </div>
            ))}
          </div>  
          <div>
          </div>
        </div>
        <div className="flex gap-10 justify-end">
            <Button text='Back' onClick={()=>{
              router.push('/booking/booking1')
            }} />
            <Button text='Next' onClick={()=>{
              router.push('/booking/booking3')
            }}  />
        </div>
      </div>

      {/* Cart and navigation  */}
      {/* <div className="mt-20 booking2 custom__conatiner mx-auto flex gap-12">
        <div className="cart w-3/12 border p-5">
          <h1 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            My Cart Summary
          </h1>
          <p>
            Professional: <b>Silvia Aru</b>
          </p>
          <p>My Services</p>
          <p>Beauty and wellenss/Woman</p>
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            <li>Chest -Normal wax - 30 mins 40€</li>
            <li>Chest -Normal wax - 30 mins 35€</li>
            <li>Total Amount - 75€</li>
          </ul>
        </div>
        <div className="w-8/12 flex gap-5">
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
        </div>
      </div> */}
    </div>
  );
};

export default Booking2;
