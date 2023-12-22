import { Link } from "react-router-dom";
import { useState } from "react";
import { logIn } from "../slices/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(false);

  const emailHandle = (event) => setEmail(event.target.value);

  const paswordHandle = (event) => {
    const pass = event.target.value;
    if (pass.length >= 5) {
      setPassword(event.target.value);
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  const errorNotify = (msg) =>
    toast.error(msg, {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide
    });

  const submitHandle = async (event) => {
    event.preventDefault();
    const userData = { email: email, password: password };

    if (validation) {
      try {
        await dispatch(logIn(userData)).unwrap();
        navigate("/");
      } catch (err) {
        errorNotify(err.error);
      }
    }
  };

  return (
    <div className="container mx-auto flex justify-center p-4 mb-8 sm:p-6">
      <ToastContainer
        position="bottom-center"
        autoClose={800}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <form
        onSubmit={submitHandle}
        className="overflow-hidden w-[600px] bg-white rounded-md shadow-xl text-slate-500 shadow-slate-200 mt-8"
      >
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium text-slate-700">Log In</h3>
          </header>
          <div className="flex flex-col space-y-8">
            <div className="relative my-6">
              <input
                onChange={emailHandle}
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500  focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="email"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm  peer-required:after:content-['\00a0*']  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Email
              </label>
              <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:peer-focus:text-pink-500">
                <span>Enter your email</span>
              </small>
            </div>
            <div className="relative my-6">
              <input
                onChange={paswordHandle}
                type="password"
                name="password"
                required
                placeholder="Your password"
                className={`relative peer w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 autofill:bg-white focus:border-blue-500 focus:outline-none ${
                  validation ? "" : "focus:border-pink-500"
                } disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
              />
              <label
                htmlFor="id-b03"
                className={`absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:content-['\x00a0*'] peer-focus:-top-2 peer-focus:text-xs ${
                  validation
                    ? "peer-focus:text-blue-500"
                    : "peer-focus:text-pink-500"
                } peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent`}
              >
                Password
              </label>
              <small
                className={`absolute flex justify-between w-full px-4 py-1 text-xs transition ${
                  validation ? "text-slate-400" : "peer-focus:text-pink-500"
                } `}
              >
                <span>Enter Password</span>
              </small>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end p-6 ">
          <button className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none">
            <span>Log In</span>
          </button>
          <Link className="text-blue-500 mt-2 text-right" to="/signup">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
