import Navbar from "../components/Misc/Navbar";
import Footer from "../components/Misc/Footer";


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateUser() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [corporateList, setCorporateList] = useState()
    const [formData, setFormData] = useState({
        email: '',
        lastname: '',
        firstname: '',
        address: '',
        address2: '',
        city: '1',
        postal: '',
        nationality: '',
        phone: '',
        fiscal: '',
        CustomCheck: true,
        password: '',
        dateOfBirth: '25/01/2000',
        agreeToTerms: true,
        subscription: true,
        approve_civil_code: true,
        isCustomerDataProcessingApproved: true,
        isCorporate: false
    });

    const getCoporates = () => {
        axios.get('https://takemihome.it/it/api/public_api/subcategories/getCorporateClientsByCity/1')
            .then((res) => {
                setCorporateList(res?.data?.corporate_clients)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCoporates()
    }, [])

    const checkEmail = async () => {
        try {
            const response = await axios.post(
                'https://takemihome.it/it/user/checkmail',
                { email }
            );
            setStatus(response.data.available);
            if (response.data.available == false) {
                alert('Email already exists')
            }
        } catch (error) {
            alert('Something went wrong try again later')
            console.error('Error checking email:', error);
        }
    };

    const validateForm = () => {
        const missingFields = [];

        if (!formData.firstname) {
            missingFields.push('First Name');
        }

        if (!formData.lastname) {
            missingFields.push('Last Name');
        }

        if (!formData.dateOfBirth) {
            missingFields.push('Date of Birth');
        }

        if (!formData.address) {
            missingFields.push('Address');
        }


        if (!formData.city) {
            missingFields.push('City');
        }

        if (formData.city === '2' && !formData.postal) {
            missingFields.push('Postal Code');
        }

        if (!formData.nationality) {
            missingFields.push('Nationality');
        }

        if (!formData.phone) {
            missingFields.push('Phone');
        }


        if (!formData.password) {
            missingFields.push('Password');
        }

        if (missingFields.length > 0) {
            const missingFieldsMessage = `Please fill in the following fields: ${missingFields.join(', ')}`;
            alert(missingFieldsMessage);
            return false;
        }

        return true;
    };

    const registerUser = async () => {
        try {
            if (validateForm()) {
                let mydata= {...formData, email: email}
                const res = await axios.post('https://takemihome.it/en/user/register', mydata);
                if(res.status == 200 || res.status == 201){
                    alert('Successfully Created User')
                }else {
                    alert('Could Not Create User')
                }
                console.log(mydata)
            } else {
                return
            }
        } catch (error) {
            alert('Somthing went wrong, please try again later')
            console.error('Error registering user:', error);
        }
    };

    return (
        <div>
            <Navbar />


            <div class="w-1/2 mx-auto">
                {!status ? (
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Check Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <button
                                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={checkEmail}>Check Email</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-3xl mb-5">Register User</h2>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                disabled
                                placeholder="Email"
                            />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={formData.lastname}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                placeholder="Last Name"
                            />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={formData.firstname}
                                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                                placeholder="First Name"
                            />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                value={formData.address}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Address"
                            />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Address 2
                            </label>
                            <input
                                type="text"
                                value={formData.address2}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                                placeholder="Address 2"
                            />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                City
                            </label>
                            <select
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="1">Milano</option>
                                <option value="2">Roma</option>
                                <option value="3">Monza Brianza</option>
                                <option value="4">Bergamo</option>
                                <option value="5">Ibiza</option>
                                <option value="6">Como Varese</option>
                                <option value="7">Brescia</option>
                                {/* Add other city options here */}
                            </select>
                        </div>

                        {
                            formData?.city == 2 ? <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    value={formData.postal}
                                    onChange={(e) => setFormData({ ...formData, postal: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Postal Code"
                                />
                            </div> : <></>
                        }


                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Nationality
                            </label>
                            <input
                                value={formData.nationality}
                                type='text'
                                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Phone"
                            />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Fiscal Number
                            </label>
                            <input
                                type="text"
                                value={formData.fiscal}
                                onChange={(e) => setFormData({ ...formData, fiscal: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Fiscal Number"
                            />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Password"
                            />
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                Date of Birth (DD/MM/YYYY)
                            </label>
                            <input
                                type="text"
                                value={formData.dateOfBirth}
                                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Date of Birth (DD/MM/YYYY)"
                            />
                        </div>


                        <div className="flex items-center justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2 w-8/12 mt-4">
                                <p>Is this Corporate User?</p>
                            </label>
                            <input
                                type="checkbox"
                                value={formData.isCorporate}
                                onChange={(e) => setFormData({ ...formData, isCorporate: !formData.isCorporate })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                                placeholder="Date of Birth (DD/MM/YYYY)"
                            />
                        </div>

                        {
                            formData?.isCorporate && <>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2 w-8/12 mt-4">
                                        <p>Select the corporate</p>
                                    </label>
                                    <select
                                        onChange={(e) => setFormData({ ...formData, corporate_id: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        {
                                            corporateList?.map((item) => (
                                                <option value={item[0]} key={item[1]}>{item[1]}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </>
                        }

                        <button
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"
                            onClick={registerUser}>Register</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default CreateUser;