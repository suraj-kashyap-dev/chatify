import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../../utils/api";
import { toastOptions } from "../../utils/toast";
import Loader from "../../components/Loader";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const validateForm = () => {
    const { email, password } = values;

    if (email === "") {
      toast.error("Email and Password is required.", toastOptions);

      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);

      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);

      const { email, password } = values;

      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });

      if (!data.status) {
        setLoading(false);

        toast.error(data.msg, toastOptions);
      }

      if (data.status) {
        localStorage.setItem(
          import.meta.env.VITE_AUTH_USER,
          JSON.stringify(data.user)
        );

        setLoading(false);

        navigate("/");
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
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
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    onChange={handleChange}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="email"
                    placeholder="Email Address"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <label
                      htmlFor="loggingPassword"
                      className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    >
                      Password
                    </label>
                    <Link
                      to="#"
                      className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                    >
                      Forget Password?
                    </Link>
                  </div>
                  <input
                    id="loggingPassword"
                    name="password"
                    onChange={handleChange}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    Sign In
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                  <Link
                    to="/register"
                    className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  >
                    or sign up
                  </Link>
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      <ToastContainer />
    </>
  );
}

export default Login;
