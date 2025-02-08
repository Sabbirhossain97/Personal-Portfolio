import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { signInUser } from "../../../services/auth/signin";
import { resetPass } from "../../../services/auth/resetPass";
import Spinner from "../../helpers/Spinner";
import ResetPassModal from "./ResetPassModal";

export default function Sign() {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showVisibility, setShowVisibility] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInUser(formData, setLoading, navigate)
  };

  const resetPassword = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      setLoading(true)
      await resetPass(formData.email)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
      setFormData({ ...formData, email: "" })
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen flex items-center">
      <ResetPassModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        formData={formData}
        setFormData={setFormData}
      />
      <div className="mx-auto w-full px-4 sm:px-10 md:px-0 md:max-w-lg">
        <div className="bg-white dark:bg-slate-800 py-8 px-4 border border-zinc-200 dark:border-zinc-700/80 rounded-lg">
          <h2 className="text-center text-2xl font-bold tracking-tight dark:text-white text-slate-900">
            Sign In
          </h2>
          <div className="mt-6 px-0 sm:px-0">
            <form
              onSubmit={handleLogin}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium dark:text-white text-slate-900"
                >
                  Email address
                </label>
                <input
                  required
                  id="email"
                  className="bg-zinc-100 transition duration-300 border border-zinc-100 dark:border-slate-500/20 focus:border-sky-400 dark:focus:border-teal-500 focus:outline-none dark:bg-slate-500/20 mt-[10px] dark:text-white block w-full rounded-md py-1 px-4 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="mt-4 relative">
                <label
                  htmlFor="password"
                  className="block text-md font-medium dark:text-white text-slate-900"
                >
                  Password
                </label>
                <input
                  required
                  id="password"
                  className="bg-zinc-100 transition duration-300 border border-zinc-100 dark:border-slate-500/20 focus:border-sky-400 dark:focus:border-teal-500 focus:outline-none dark:bg-slate-500/20 mt-[10px] dark:text-white block w-full rounded-md py-1 px-4 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  type={showVisibility ? "text" : "password"}
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {showVisibility ?
                  <MdVisibility onClick={() => setShowVisibility(!showVisibility)} className="cursor-pointer text-gray-500 absolute right-2 top-11" /> :
                  <MdVisibilityOff onClick={() => setShowVisibility(!showVisibility)} className="cursor-pointer text-gray-500 absolute right-2 top-11" />
                }
              </div>
              <div className="text text-right mt-4">
                <button
                  type="button"
                  onClick={resetPassword}
                  className="hover:text-blue-500 dark:text-white dark:hover:text-teal-500 underline cursor-pointer transition duration-300">Forgot your password?</button>
              </div>
              <div className="mt-6">
                <button className="flex items-center gap-2 w-full justify-center transition duration-300 bg-zinc-100 dark:bg-zinc-800 py-2 px-4 text-sm font-medium text-zinc-900 hover:text-sky-400 dark:text-white dark:hover:text-teal-500 shadow-sm hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-teal-500 rounded-md">
                  {loading ? <><Spinner />Processing...</> : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
