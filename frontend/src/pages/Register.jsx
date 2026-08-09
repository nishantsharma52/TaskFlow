import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axios.js"
import toast from "react-hot-toast";
import { useState } from "react";
import { setLoading } from "../redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading} = useSelector((store) => store.auth)
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    })
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true))
        try {
            const response = await API.post("/user/register", input);
            toast.success(response.data.message);
            setInput({
                name: "",
                email: "",
                password: "",
            });
            navigate("/");

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally{
            dispatch(setLoading(false))
        }
    }
    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#1E293B] rounded-2xl shadow-2xl p-8">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-white text-center">
                    Create Account 🚀
                </h1>

                <p className="text-gray-400 text-center mt-2">
                    Create your account to start managing tasks.
                </p>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 rounded-lg bg-[#334155] text-white border border-gray-600 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-[#334155] text-white border border-gray-600 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            onChange={changeEventHandler}
                            value={input.password}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-lg bg-[#334155] text-white border border-gray-600 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                    >
                        {loading ? "loading..":"Register"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-blue-500 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
