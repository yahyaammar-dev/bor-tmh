import React from "react";
import Select from "react-select";
import Button from "@/components/Misc/Button";
import Professional from "@/components/Misc/Professional";
import Fade from "../Transition/Fade";
import selectStyles from "@/styles/selectStyles";
import { useDataHandler } from "@/utils/dataHandler";

const CorporateBooking = ({ loader, setLoader }) => {
    const { localData, listUsers, listCities, cities,  handleLocalData, reduxData, handleCorporatelData } = useDataHandler(setLoader); // Use the useDataHandler hook to access the functions and state

    const postal = [
        { value: "123123", label: "123123" },
        { value: "123123", label: "12312" },
      ];
return(
    
);

}  
 export default CorporateBooking;