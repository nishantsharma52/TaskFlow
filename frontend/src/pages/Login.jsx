import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axios.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice.js";

const Login = () => {
    const { loading } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: "",
        password: "",
    })
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(setLoading(true));

        try {
            const response = await API.post("/user/login", input);
            dispatch(setUser(response.data.user));
           
            toast.success(response.data.message);
            navigate("/home");

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-[#1E293B] rounded-2xl shadow-2xl p-8">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-white text-center">
                    Welcome Back 👋
                </h1>

                <p className="text-gray-400 text-center mt-2">
                    Sign in to continue managing your tasks.
                </p>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            onChange={changeEventHandler}
                            value={input.email}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-[#334155] text-white outline-none border border-gray-600 focus:border-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            onChange={changeEventHandler}
                            value={input.password}
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-lg bg-[#334155] text-white outline-none border border-gray-600 focus:border-blue-500"
                        />
                    </div>

                    {/* Button */}
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                    >
                        {

                            loading ? "Logging in..." : "Login"

                        }
                    </button>

                </form>

                {/* Register */}
                <p className="text-center text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Login;
