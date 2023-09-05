import { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getCategories,
  getCities,
  getGenders,
  getProfessionals,
  getSubCategories,
  getUsers,
  getCorporateClient,
  getCorporateCustomers,
  getCorporateProfessionals,
  getProfessionalFromCorporateServices,
  SetNewPrimaryAddress,
  getAddress
} from "../pages/api/hello"; // Import your API functions here
import { type } from "os";


export function useDataHandler(setLoader) {
  const dispatch = useDispatch();
  const [localData, setLocalData] = useState({});
  const reduxData = useSelector((state) => state);
  const [listUsers, setListUsers] = useState([]);
  const [listCities, setListCitites] = useState([]);
  const [cities, setCitites] = useState([]);
  const [corporatesList, setCorporateList] = useState([])
  const [corporateCustomerList, setCorporateCustomers] = useState([])
  const [city, setCity] = useState([])
  const [address, setAddress] = useState([])
  const [confirmation, setConfirmation] = useState({
    address :""
})
  const router = useRouter();

  

  const handleLocalData = async (newData) => {
    if (newData.type === "type") {
      if (newData.data == "Corporate") {
        setLocalData({ ...localData, type: newData.data });
        dispatch({ type: "TYPE", payload: newData.data });
        setLoader(true);
        const allCities = await getCities();
        setListCitites(allCities);
        const citiesAsOption = allCities?.map((city) => ({
          id: city.id,
          value: city.name,
          label: city.name,
        }));
        dispatch({ type: "GETCITIES", payload: citiesAsOption });
        setListCitites(citiesAsOption);
        setLoader(false);  
      } else {
        setLocalData({ ...localData, type: newData.data });
        dispatch({ type: "TYPE", payload: newData.data });
        setLoader(true);
        const allUsers = await getUsers();
        dispatch({ type: "USERS", payload: allUsers });
        setLoader(false);
        const usersAsOptions = allUsers?.map((user) => ({
          value: user.name,
          label: user.name,
          email: user.email
        }));
        setListUsers(usersAsOptions);
      }
    } else if (newData.type == "user") {
      setLocalData({ ...localData, user: newData.data });
      dispatch({ type: "USER", payload: newData.data });
      setLoader(true);
      const allCities = await getCities();
      setListCitites(allCities);
      const citiesAsOption = allCities?.map((city) => ({
        id: city.id,
        value: city.name,
        label: city.name,
      }));
      dispatch({ type: "GETCITIES", payload: citiesAsOption });
      setListCitites(citiesAsOption);
      setLoader(false);
    } else if (newData.type == "city") {
      dispatch({type: "CURRENTCITY", payload: newData.data})
      if(localData.type == 'Corporate'){
        setLoader(true);
        setLocalData({...localData, city: newData.data})
        const corporates = await getCorporateClient(newData.data.id)
        if(corporates.error){
          alert(corporates.error);
        }else{
          const corporatesAsOption = corporates?.map((corporate, index) => ({
            id: corporate[0],
            value: corporate[1],
            label: corporate[1],
            email: corporate[5]
          }));
          dispatch({type: "CORPORATES", payload: corporatesAsOption})
          setCorporateList(corporatesAsOption)
        }
        setLoader(false)
      }else {
        console.log('I already have the user', reduxData)
        setLoader(true);
        const categories = await getCategories(newData.data);
        setLocalData({ ...localData, city: newData.data });
        dispatch({ type: "GETCATEGORIES", payload: categories });
        setLoader(false);
      }

    } else if (newData.type == "category") {
      setLoader(true);
      const subCategories = await getSubCategories(newData.data);
      setLocalData({ ...localData, category: newData.data });
      dispatch({ type: "CURRENTCAT", payload: newData.data });
      dispatch({ type: "SUBCATEGORIES", payload: subCategories });
      setLoader(false);
    } else if (newData.type == "subcategory") {
      setLoader(true);
      const subCategories = await getGenders(newData?.data?.id);
      setLocalData({ ...localData, currentSubCat: newData.data });
      dispatch({ type: "CURRENTSUBCAT", payload: newData.data });
      dispatch({ type: "GETGENDERS", payload: subCategories });
      setLoader(false);
    } else if (newData.type == "gender") {
      if(localData.type == "Corporate") {
        setLoader(true);
        setLocalData({ ...localData, currentGender: newData.data });
        dispatch({ type: "CURRENTGENDER", payload: newData.data });
        const res = await getCorporateProfessionals(localData?.currentSubCat.id,newData.data.id)
        if(res.error){
          alert(res.error);
        }
        setLocalData({ ...localData, professionals: res });
        dispatch({ type: "GETPROFESSIONALS", payload: res });
        setLoader(false);
        console.log('Corporate User is ', reduxData?.appData?.currentCorporateUser)

        getAddress(reduxData?.appData?.currentCorporateUser?.id)
        .then((res)=>{
          setLocalData({...localData, address: res})
          dispatch({ type: "SETADDRESS", payload: res });
        })

      }
      else{
        setLoader(true);
        const customDataQuery = {
          ...newData,
          localData,
        };
        const Professionals = await getProfessionals(customDataQuery);
        setLocalData({ ...localData, professionals: Professionals });
        setLocalData({ ...localData, currentGender: newData.data });
        dispatch({ type: "CURRENTGENDER", payload: newData.data });
        dispatch({ type: "GETPROFESSIONALS", payload: Professionals });
        setLoader(false);
      }
      
    } else if (newData.type == "professional") {
      setLocalData({ ...localData, currentProfessional: newData.data });
      let proData = newData.data;
      dispatch({ type: "CURRENTPROFESSIONAL", payload: proData });
      setLoader(false);
      router.push({
        pathname: '/booking/booking2',
        query: { professional: newData.data }
    })
    } else if (newData.type == "resetData") {
      setLocalData({});
      dispatch({ type: "REMOVEALLDATA" });
    } else if (newData.type == "corporate") {
      setLoader(true)
      dispatch({ type: "CURRCORPORATE", payload: newData.data })
      setLocalData({...localData, corporate: newData.data})
      dispatch({ type: "CORPORATE", payload: newData.data })
      const corporateUsers = await getCorporateCustomers(newData.data.id)
      const corporateUsersList = corporateUsers?.map((corporate, index) => ({
        id: corporate[0],
        value: corporate[1],
        label: corporate[1],
        email: corporate[5],
      }));
      dispatch({ type: "CORPORATEUSERS", payload: corporateUsersList });
      setCorporateCustomers(corporateUsersList);
      setLoader(false);
    } else if (newData.type == "corporateCategories"){
      setLoader(true);
      dispatch({ type: "CURRENTCORPORATEUSER", payload: newData.data });
      const categories = await getCategories(localData.city);

      setLocalData({ ...localData, categories: categories });
      dispatch({ type: "GETCATEGORIES", payload: categories });
      setLoader(false);

    } else if (newData.type === "updateCart"){
      setLoader(true);

      if(newData?.data){
        var totalAmount = 0
        newData?.data?.map((item)=>{
          totalAmount = Number(totalAmount) + Number(item.price)
        })
        dispatch({type: "TOTALAMOUNT", payload: totalAmount})
      }

      

      setLocalData({ ...localData, cart: newData.data });
      dispatch({ type: "CART", payload: newData.data });
      setLoader(false);
    }else if(newData.type === "currenttime"){
      dispatch({ type: "CURRENTTIME", payload: newData.data })
    }
    else if(newData.type === "currentDate"){
      dispatch({ type: "CURRENTDATE", payload: newData.data })
    }
    else if(newData.type === "newcity"){
      setCity(newData.data)
    }
    else if(newData.type === "address"){
      setAddress(newData.data.target.value)
    }
    else if(newData.type === "addAdress"){
      setLocalData({ ...localData, newAdress: address, newCity: city});
      dispatch({ type: "NEWADDRESS", payload: address});
      dispatch({ type: "NEWCITY", payload:city });
      const setAddress = await SetNewPrimaryAddress(address, city.id, reduxData.appData.currentCorporateUser.id)
      if (address.length > 0 && city.value.length > 0 && setAddress.status === 200) {
        setConfirmation(prevConfirmation => ({
          ...prevConfirmation,
          address: "success"
        }));
      } else {
        setConfirmation(prevConfirmation => ({
          ...prevConfirmation,
          address: ""
        }));
      }
    }
    else if(newData.type1 === "remove"){
      if(newData.type === "resetDataAfterCity"){
        dispatch({ type: "REMOVEAFTERCITY" });
      }
      if(newData.type === "resetDataAfterCategory"){
        dispatch({ type: "REMOVEAFTERCATEGORY" });
      }
      if(newData.type === "resetDataAfterSubCategory"){
        dispatch({ type: "REMOVEAFTERSUBCATEGORY" });
      }
      if(newData.type === "resetDataAfterCorporate"){
        dispatch({ type: "REMOVEAFTERCORPORATE" });
      }
      if(newData.type === "resetDataAfterCorporateUser"){
        dispatch({ type: "REMOVEAFTERCORPORATEUSER" });
      }
      if(newData.type === "resetDataAfterGender"){
        dispatch({ type: "REMOVEAFTERGENDER" });
      }
      if(newData.type === "resetDataAfterProfessional"){
        dispatch({ type: "REMOVEAFTERPROFESSIONAL" });
      }
      if(newData.type === "resetDataAfterCart"){
        dispatch({ type: "REMOVEAFTERCART" });
      }
      if(newData.type === "resetDataAfterDate"){
        dispatch({ type: "REMOVEAFTERDATE" });
      }
      if(newData.type === "resetDataAfterTime"){
        dispatch({ type: "REMOVEAFTERTIME" });
      }
    }
  };

  return {
    localData,
    listUsers,
    listCities,
    cities,
    handleLocalData,
    reduxData,
    corporatesList,
    corporateCustomerList,
    confirmation,
  };
}
