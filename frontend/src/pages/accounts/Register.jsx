import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../../utils/api";

function Register() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_AUTH_USER)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values;

    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions,
      );

      return false;
    } else if (name.length < 3) {
      toast.error("name should be greater than 3 characters.", toastOptions);

      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions,
      );

      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);

      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { email, name, password } = values;

      const { data } = await axios.post(registerRoute, {
        name,
        email,
        password,
      });

      if (!data.status) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status) {
        localStorage.setItem(import.meta.env.VITE_AUTH_USER, JSON.stringify(data.user));

        navigate("/");
      }
    }
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div
              className="hidden bg-cover lg:block lg:w-1/2"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80")',
              }}
            />
            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="./logo.png" alt="" />
              </div>
              <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                Welcome back!
              </p>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="email"
                >
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  placeholder="name"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  placeholder="Email address"
                  name="email"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  onChange={(e) => handleChange(e)}
                  type="email"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  onChange={(e) => handleChange(e)}
                  type="password"
                  name="password"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="confirmPassword"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="confirmPassword"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  onChange={(e) => handleChange(e)}
                  type="password"
                  name="confirmPassword"
                />
              </div>
              <div className="mt-6">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Sign Up
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                <Link
                  to="/login"
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  or sign in
                </Link>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default Register;
