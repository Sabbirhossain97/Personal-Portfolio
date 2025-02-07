import { useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { passwordUpdate } from "../../../services/auth/updatePass";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../../helpers/Spinner";

function ResetPass() {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const [visibility, setVisibility] = useState({
        newPassword: false,
        confirmPassword: false
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Passwords do not match!")
        } else {
            setLoading(true)
            try {
                await passwordUpdate(formData.newPassword, navigate)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="h-screen flex items-center">
            <div className="mx-auto w-full px-6 md:px-0 md:max-w-lg">
                <div className="bg-white dark:bg-slate-800 py-8 px-4 border border-zinc-200 dark:border-zinc-700/80 rounded-lg">
                    <h2 className="text-center text-2xl font-bold tracking-normal dark:text-white text-slate-900">
                        Reset Password
                    </h2>
                    <div className="mt-6 px-2">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="block text-md font-medium dark:text-white text-slate-900"
                                >
                                    New Password
                                </label>
                                <input
                                    required
                                    id="password"
                                    className="mt-2 block w-full dark:text-gray-400 appearance-none bg-zinc-100 dark:bg-slate-500/20 dark:border-gray-200/20 px-3 py-2 placeholder:text-zinc-500 dark:placeholder:text-gray-500 shadow-sm sm:text-sm rounded-md"
                                    placeholder="Your new password"
                                    type={visibility.newPassword ? "text" : "password"}
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                />
                                {visibility.newPassword ?
                                    <MdVisibility onClick={() => setVisibility({ ...visibility, newPassword: !visibility.newPassword })} className="cursor-pointer text-gray-500 absolute right-2 top-11" /> :
                                    <MdVisibilityOff onClick={() => setVisibility({ ...visibility, newPassword: !visibility.newPassword })} className="cursor-pointer text-gray-500 absolute right-2 top-11" />
                                }
                            </div>
                            <div className="mt-4 relative">
                                <label
                                    htmlFor="password"
                                    className="block text-md font-medium dark:text-white text-slate-900"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    required
                                    id="password"
                                    className="mt-2 block w-full dark:text-gray-400 appearance-none bg-zinc-100 dark:bg-slate-500/20 px-3 py-2 placeholder:text-zinc-500 dark:placeholder:text-gray-500 shadow-sm sm:text-sm rounded-md"
                                    type={visibility.confirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                                {visibility.confirmPassword ?
                                    <MdVisibility onClick={() => setVisibility({ ...visibility, confirmPassword: !visibility.confirmPassword })} className="cursor-pointer text-gray-500 absolute right-2 top-11" /> :
                                    <MdVisibilityOff onClick={() => setVisibility({ ...visibility, confirmPassword: !visibility.confirmPassword })} className="cursor-pointer text-gray-500 absolute right-2 top-11" />
                                }
                            </div>
                            <div className="mt-6">
                                <button className="flex items-center gap-2 w-full justify-center transition duration-300 bg-zinc-100 dark:bg-zinc-800 py-2 px-4 text-sm font-medium text-zinc-900 hover:text-sky-400 dark:text-white dark:hover:text-teal-500 shadow-sm hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500 rounded-md">
                                    {loading ? <><Spinner />Processing...</> : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPass