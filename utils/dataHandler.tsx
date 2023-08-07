// dataHandler.js

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
  getProfessionalFromCorporateServices
} from "@/apis"; // Import your API functions here
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
  const router = useRouter();

  console.log(reduxData,"redux dtata")
  

  const handleLocalData = async (newData) => {
    if (newData.type === "type") {
      if (newData.data == "Corporate") {
        setLocalData({ ...localData, type: newData.data });
        dispatch({ type: "TYPE", payload: newData.data });
        setLoader(true);
        const allCities = await getCities();
        setListCitites(allCities);
        const citiesAsOption = allCities.map((city) => ({
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
        const usersAsOptions = allUsers.map((user) => ({
          value: user,
          label: user,
        }));
        setListUsers(usersAsOptions);
      }
    } else if (newData.type == "user") {
      setLocalData({ ...localData, user: newData.data });
      dispatch({ type: "USER", payload: newData.data });
      setLoader(true);
      const allCities = await getCities();
      setListCitites(allCities);
      const citiesAsOption = allCities.map((city) => ({
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
        const corporates = await getCorporateClient(newData.data.value)
        console.log('Corporate Client::', corporates)
        const corporatesAsOption = corporates.map((corporate, index) => ({
          id: corporate[0],
          value: corporate[1],
          label: corporate[1],
        }));
        dispatch({type: "CORPORATES", payload: corporatesAsOption})
        setCorporateList(corporatesAsOption)
        setLoader(false)
      }else {
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
        // console.log(localData);
        setLoader(true);
        const res = await getProfessionalFromCorporateServices(localData?.currentSubCat.id)
        setLocalData({ ...localData, currentGender: newData.data });
        dispatch({ type: "CURRENTGENDER", payload: newData.data });
        // console.log('results ::', res)
        setLocalData({ ...localData, professionals: res });
        dispatch({ type: "GETPROFESSIONALS", payload: res });
        // console.log(localData)
        setLoader(false);
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
      console.log('mysterious data', newData.data);
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
      const corporateUsersList = corporateUsers.map((corporate, index) => ({
        id: corporate[0],
        value: corporate[1],
        label: corporate[1],
      }));
      dispatch({ type: "CORPORATEUSERS", payload: corporateUsersList });
      setCorporateCustomers(corporateUsersList);
      setLoader(false);
    } else if (newData.type == "corporateCategories"){
      setLoader(true);
      console.log('-------------------------')
      dispatch({ type: "CURRENTCORPORATEUSER", payload: newData.data });
      const categories = await getCategories(localData.city);
      setLocalData({ ...localData, categories: categories });
      dispatch({ type: "GETCATEGORIES", payload: categories });
      setLoader(false);
    } else if (newData.type === "updateCart"){
      setLoader(true);
      setLocalData({ ...localData, cart: newData.data });
      dispatch({ type: "CART", payload: newData.data });
      setLoader(false);
    }else if(newData.type === "currenttime"){
      dispatch({ type: "CURRENTTIME", payload: newData.data })
    }
    else if(newData.type === "currentDate"){
      dispatch({ type: "CURRENTDATE", payload: newData.data })
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
    corporateCustomerList
  };
}
