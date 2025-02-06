import './Table.css'
import { useState } from "react";
import { Switch } from 'antd';
import { sideBarContents } from "../../../helpers/SidebarContents";
import { SidebarArrow, DarkThemeIcon, LightThemeIcon } from "../../SVG/SvgComponents";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { signOut } from "../../../services/signOut";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { GoSidebarCollapse } from "react-icons/go";
import { MdKeyboardBackspace } from "react-icons/md";
import Logo from "../../layout/common/Logo";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dark, setDark } = useDarkMode();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const themeHandler = (checked) => {
    setDark(checked ? true : !dark);
  };

  const handleSignOut = async () => {
    await signOut(navigate)
  }

  return (
    <div className="flex pb-10 relative">
      {/* sidebar */}
      <div
        className={`${sideBarOpen ? "translate-x-0" : "-translate-x-full"
          } min-h-screen fixed z-[1000] w-64 py-4 px-3 shadow-3xl bg-white dark:bg-slate-800 border-r border-zinc-200 dark:border-zinc-700/50 transition duration-300`}
      >
        <div className="flex justify-between items-center py-2">
          <Logo />
          {sideBarOpen &&
            (
              <button onClick={() => setSideBarOpen(!sideBarOpen)}>
                <SidebarArrow />
              </button>
            )}
        </div>
        <div className="mt-[50px]">
          <ul className="space-y-4">
            {sideBarContents.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex gap-3 group transition duration-300 rounded-lg p-2 font-normal text-zinc-900 hover:text-sky-400 dark:hover:text-teal-500 dark:text-white hover:bg-zinc-100/80 dark:hover:bg-gray-700/50`}
                >
                  <span>
                    {item.logo}
                  </span>
                  <span
                    className='whitespace-nowrap transition-opacity duration-300'
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
            <li className="p-2">
              <button onClick={handleSignOut} className="flex items-center gap-3 group">
                <CiLogout className="text-xl transition duration-300 text-zinc-400 dark:text-white group-hover:text-sky-400 dark:group-hover:text-teal-500" />
                <span
                  className='whitespace-nowrap transition duration-300 dark:text-white group-hover:text-sky-400 dark:group-hover:text-teal-500'
                >
                  Sign out
                </span>
              </button>
            </li>
          </ul>
        </div>
        <div className="absolute flex flex-col gap-4 bottom-0 border-t dark:border-zinc-700/50 p-4 left-0 right-0">
          <div className="flex justify-between items-center">
            <p className="flex group items-center gap-3">
              {dark ? <DarkThemeIcon /> :
                <LightThemeIcon />
              }
              <span
                className='whitespace-nowrap transition duration-300 dark:text-white'
              >
                {dark ? "Dark" : "Light"} Theme
              </span>
            </p>
            <Switch onChange={themeHandler} checked={dark} size="small" />
          </div>
        </div>
      </div>
      <div className="absolute top-4 left-6">
        <GoSidebarCollapse onClick={() => setSideBarOpen(!sideBarOpen)} className="text-4xl dark:text-zinc-500 dark:hover:text-teal-500 hover:text-sky-400 transition duration-300 cursor-pointer" />
      </div>
      {location.pathname.includes("/createproject") || location.pathname.includes("/update") ? <div className="absolute top-4 left-20">
        <Link to="/dashboard"
          className="bg-gray-100 flex items-center gap-2 border dark:text-zinc-400 border-gray-300 hover:bg-gray-200 dark:border-zinc-700/80 transition duration-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 focus:outline-none font-medium rounded-md text-sm w-full px-5 py-1.5 mt-[2px] text-center "
        >
          <MdKeyboardBackspace />
          back to Projects
        </Link>
      </div> : ""}
      <div className={`mt-[100px] rounded-lg flex flex-col justify-center items-center transition duration-300 w-full px-6 z-1 ${sideBarOpen && 'blur-sm dark:blur-md'} `}>
        <Outlet sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      </div>
    </div>
  );
}
