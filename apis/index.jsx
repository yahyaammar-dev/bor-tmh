import axios from "axios";

const loginUser = async (values) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/it/api/public_api/subcategories/loginAdmin",
      {
        email: values.email,
        password: values.password,
      }
    );

    return res.data;
  } catch (err) {
    throw new Error("Login failed"); // Throw a custom error message
  }
};

const getUsers = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8000/it/api/public_api/subcategories/getAllUser"
    );
    return res.data;
  } catch (err) {
    throw new Error("Unable to fetch Users, something went wrong"); // Throw a custom error message
  }
};

const getCities = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8000/it/front/booking/cities"
    );
    return res.data;
  } catch (err) {
    throw new Error("Unable to fetch Cities, something went wrong"); // Throw a custom error message
  }
};

const getCategories = async (item) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/it/front/booking/categories/${item.id}`,
    );
    return res.data;
  } catch (err) {
    throw new Error("Unable to fetch categories, something went wrong"); // Throw a custom error message
  }
};

const getSubCategories = async (item) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/it/front/booking/sub/${item.id}`
    );
    return res.data;
  } catch (err) {
    throw new Error("Unable to fetch subcategories, something went wrong"); // Throw a custom error message
  }
};

const getGenders = async (item) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/it/front/booking/gender/${item}`
    );
    return res.data;
  } catch (err) {
    throw new Error("Unable to fetch genders, something went wrong"); // Throw a custom error message
  }
};

const getProfessionals = async (item) => {
  try {
    const res = await axios.get(
      `https://www.takemihome.it/it/front/booking/professionals/${item.localData.currentSubCat.id}/${item.data.id}`
    );
    return res.data;
  } catch (err) {
    throw new Error("Unable to fetch professionals, something went wrong"); // Throw a custom error message
  }
};

const getProfessionalDetail = async (data) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/it/front/booking/services/json?pro=${data.proId}&sub=${data.subId}&gender=${data.gender}`
    );
    return res.data;
  } catch (err) {
    throw new Error("Unable to fetch professional detail, something went wrong"); // Throw a custom error message
  }
};

const getAvailability = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8000/it/front/booking/schedulejson?pro=22&sub=8&gender=f&services=%2C41%2C62/"
    );
    return res.data;
  } catch (err) {
    throw new Error("Unable to fetch availibility of a professional, something went wrong"); // Throw a custom error message
  }
};

const getAvailabilityData = async () => {
  try {
    const res = await axios.get(
      "https://www.takemihome.it/it/front/booking/get/times?duration=120&date=26-09-2023&pro=22"
    );
    return res.data;
  } catch (err) {
    throw new Error("Unable to fetch availibility time of professional, something went wrong"); // Throw a custom error message
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
  getAvailabilityData
};