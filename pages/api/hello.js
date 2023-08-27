// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const loginUser = async (values) => {
  try {
    const res = await axios.post(
      "http://20.236.136.145/it/api/public_api/subcategories/loginAdminfpa",
      {
        email: values.email,
        password: values.password,
      }
    );

    return res.data;
  } catch (err) {
    alert("Login failed"); // Throw a custom error message
  }
};

const getUsers = async () => {
  try {
    const res = await axios.get(
      "http://20.236.136.145/it/api/public_api/subcategories/getAllUser"
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch Users, something went wrong"); // Throw a custom error message
  }
};

const getCities = async () => {
  try {
    const res = await axios.get(
      "http://20.236.136.145/it/front/booking/cities"
    );
    return res.data;
  } catch (err) {
    console.log('errr', err)
    alert("Unable to fetch Cities, something went wrong"); // Throw a custom error message
  }
};

const getCategories = async (item) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/front/booking/categories/${item.id}`,
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch categories, something went wrong"); // Throw a custom error message
  }
};

const getSubCategories = async (item) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/front/booking/sub/${item.id}`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch subcategories, something went wrong"); // Throw a custom error message
  }
};

const getGenders = async (item) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/front/booking/gender/${item}`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch genders, something went wrong"); // Throw a custom error message
  }
};

const getProfessionals = async (item) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/front/booking/professionals/${item.localData.currentSubCat.id}/${item.data.id}`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch professionals, something went wrong"); // Throw a custom error message
  }
};

const getProfessionalDetail = async (data) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/front/booking/services/json?pro=${data.proId}&sub=${data.subId}&gender=${data.gender}`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch professional detail, something went wrong"); // Throw a custom error message
  }
};

const getAvailability = async (data) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/front/booking/schedulejson?pro=${data.proId}&sub=${data.subId}&gender=${data.gender}&services=%2C41%2C62/`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch availibility of a professional, something went wrong"); // Throw a custom error message
  }
};

const getAvailabilityData = async (data) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/front/booking/get/times?duration=${data.duration}&date=${data.date}&pro=${data.proId}`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch availibility time of professional, something went wrong"); // Throw a custom error message
  }
};

const getCorporateClient = async (city_name) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/api/public_api/subcategories/getCorporateClientsByCity/${city_name}`
    );
    if (res.data.error) {
      return res.data;
    } else {
      return res.data.corporate_clients;
    }

  } catch (err) {
    alert("Unable to fetch corporate clients, something went wrong"); // Throw a custom error message
  }
};

const getCorporateServices = async (item) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/api/public_api/subcategories/getCorporateServiceByCity/${city_name}`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch corporate services, something went wrong"); // Throw a custom error message
  }
};

const getCorporateCustomers = async (corporateClientId) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/api/public_api/subcategories/getCorporateCustomers/${corporateClientId}`
    );
    console.log('api response is', res)
    return res.data.corporate_clients;
  } catch (err) {
    alert("Unable to fetch corporate customers, something went wrong"); // Throw a custom error message
  }
};

const getCorporateProfessionals = async (corporateServiceId, gender) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/front/booking/corporateprofessionals/${corporateServiceId}/${gender}`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch corporate professionals, something went wrong"); // Throw a custom error message
  }
};


const getcorporateprofessionalServices = async (professionalId) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/front/booking/corporateprofessionalServices/${professionalId}`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch corporate professional services, something went wrong"); // Throw a custom error message
  }
};

const getProfessionalFromCorporateServices = async (subCatId) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/api/public_api/subcategories/getCorporateBySubCat/${subCatId}`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch corporate professionals, something went wrong"); // Throw a custom error message
  }

};

const SetNewPrimaryAddress = async (address, city, userId) => {
  try {
    const requestBody =
    {
      "userId": userId,
      "address": address,
      "address2": "street name 2",
      "postalCode": "56165",
      "city": city
    }

    const res = await axios.post(
      "http://20.236.136.145/it/front/booking/new_primary",
      requestBody
    );

    // console.log(res);
    return res;
  } catch (err) {
    throw new Error("Unable to add new address");
  }
};


const intiateBooking = async (day, time, duration, city, service, pro, customerEmail) => {
  try {
    const res = await axios.get(
      `http://20.236.136.145/it/front/booking/set_new_appointment?day=${day}&time=${time}duration=${duration}&city=${city}&service=[${service}]&pro=${pro}&customer=${customerEmail}`
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch corporate professionals, something went wrong"); // Throw a custom error message
  }
};

const nexiPayByLink = async (data) => {
  try {
    const res = await axios.post(
      `http://20.236.136.145/it/front/booking/send-payment-link`,
      data
    );
    return res.data;
  } catch (err) {
    alert("Unable to fetch corporate professionals, something went wrong"); // Throw a custom error message
  }
};

const getAddress = async (id) => {
  try {
    const data = {
      'user_id': id
    }
    const res = await axios.post(
      `http://20.236.136.145/it/front/booking/get-user-address`,
      data
    );
    return res.data;
  } catch (err) {
    alert("Something went wrong while fetching your data, please try again later");
    console.log(err)
  }
};

export {
  loginUser,
  getUsers,
  getCities,
  getCategories,
  getSubCategories,
  getGenders,
  getProfessionals,
  getProfessionalDetail,
  getAvailability,
  getAvailabilityData,
  getCorporateClient,
  getCorporateServices,
  getCorporateCustomers,
  getCorporateProfessionals,
  getProfessionalFromCorporateServices,
  getcorporateprofessionalServices,
  SetNewPrimaryAddress,
  intiateBooking,
  nexiPayByLink,
  getAddress
};