import Navbar from "../components/Misc/Navbar";
import Footer from "../components/Misc/Footer";
import React, { useEffect, useState } from 'react';

function Exporter() {

    const [name, setName] = useState()
    const handleSubmit = () => {
        window.location.href = `https://takemihome.it/it/front/booking/exportEntity?entity=${name}`
    }

    return (
        <div>
            <Navbar />
            <div class="w-1/2 mx-auto">
                <div>
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                    <select id="countries" onChange={(e)=>{setName(e.target.value)}} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a Entity</option>
                        <option value="newsletter">NewsLetters</option>
                        <option value="user">Customers</option>
                        <option value="payment">Payments</option>
                        <option value="postal_codes">Customers</option>
                        <option value="city">City</option>
                    </select>
                </div>
                <div>
                    <button type="button" onClick={()=>handleSubmit()} class="w-full mt-4  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ugh-white">Download</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Exporter;