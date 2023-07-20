// dataHandler.js

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getCategories,
  getCities,
  getGenders,
  getProfessionals,
  getSubCategories,
  getUsers,
} from "@/apis"; // Import your API functions here

export function useDataHandler(setLoader) {
  const dispatch = useDispatch();
  const [localData, setLocalData] = useState({});
  const reduxData = useSelector((state) => state);
  const [listUsers, setListUsers] = useState([]);
  const [listCities, setListCitites] = useState([]);
  const router = useRouter()

  const handleLocalData = async (newData) => {
    if (newData.type === "type") {
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
    } else if (newData.type == "user") {
      setLocalData({ ...localData, user: newData.data });
      dispatch({ type: "USER", payload: newData.data });
      setLoader(true);
      const allCities = await getCities();
      dispatch({ type: "GETCITIES", payload: allCities });
      setListCitites(allCities);
      const citiesAsOption = allCities.map((city) => ({
        id: city.id,
        value: city.name,
        label: city.name,
      }));
      setListCitites(citiesAsOption);
      setLoader(false);
    } else if (newData.type == "city") {
      setLoader(true);
      const categories = await getCategories(newData.data);
      setLocalData({ ...localData, city: newData.data });
      dispatch({ type: "GETCATEGORIES", payload: categories });
      setLoader(false);
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
      setLoader(true);
      const customDataQuery = {
        ...newData,
        localData
      }
      const Professionals = await getProfessionals(customDataQuery);
      setLocalData({ ...localData, professionals: Professionals });
      setLocalData({ ...localData, currentGender: newData.data });
      dispatch({ type: "CURRENTGENDER", payload: newData.data });
      dispatch({ type: "GETPROFESSIONALS", payload: Professionals });
      setLoader(false);
    }else if(newData.type == "professional"){
      setLocalData({...localData, currentProfessional: newData.data})
      let proData = newData.data
      dispatch({ type: "CURRENTPROFESSIONAL", payload: proData })
      setLoader(false)
      router.push('/booking/booking2')
    } 
  };

  return { localData, listUsers, listCities, handleLocalData, reduxData };
}
