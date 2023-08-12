import React, { useEffect } from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import Fade from "../Transition/Fade";
import { loginUser } from "../../apis";
import { useDispatch, useSelector } from "react-redux";

const LoginFrom = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  useEffect(() => {
    if (user.auth.user != null) {
      router.push("/booking");
    }
  }, [user]);
  return (
    <Fade>
      <div className="container mt-32 max-w-sm mx-auto mb-64">
        <div className="bg-gray-100 p-10 rounded-xl">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await loginUser(values);
                // store the user in redux
                // Login successful, redirect to "/booking" page
                dispatch({ type: "LOGIN", payload: values });
                router.push("/booking");
              } catch (error) {
                alert("Wrong Credentials");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.email && touched.email && errors.email}
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Fade>
  );
};

export default LoginFrom;
