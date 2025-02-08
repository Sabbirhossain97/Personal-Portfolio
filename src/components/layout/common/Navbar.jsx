import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CloseIcon, DarkThemeIcon, MenuIcon, LightThemeIcon } from "../../../components/SVG/SvgComponents";
import { navigation } from "../../../helpers/navigation";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { AnimatedMenuBar } from "../../helpers/AnimatedItems";
import { AnimatePresence } from "framer-motion";
import { AiOutlineUser } from "react-icons/ai";
import { Dropdown } from 'antd';
import { menuItems } from "../../../helpers/userMenu";
import { signOut } from "../../../services/auth/signOut";
import Logo from "./Logo";

export default function Navbar({ session }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenuIcon, setOpenMenuIcon] = useState(false);
  const { dark, setDark } = useDarkMode()
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setOpenMenuIcon(false);
  }, [location.pathname]);

  const handleDashboard = () => {
    navigate("/dashboard")
  }

  const handleSignOut = async () => {
    await signOut(navigate)
  }

  const items = menuItems(session, handleDashboard, handleSignOut)

  return (
    <div className="fixed left-0 right-0 top-0 z-[2000] bg-white dark:bg-slate-800/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-10 xl:px-24 bg-opacity-50 backdrop-blur-xl fixed -top-5 md:-top-5 left-0 right-0">
        <div className="flex h-16 mt-6 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              {openMenuIcon ? (
                <CloseIcon setOpenMenuIcon={setOpenMenuIcon} />
              ) : (
                <MenuIcon setOpenMenuIcon={setOpenMenuIcon} />
              )}
            </div>
            <Logo />
          </div>
          <div className="flex items-center justify-end">
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {navigation.map((item, key) =>
                (
                  <li
                    key={key}
                    className="list-none rounded-md p-0.5 transition duration-300"
                    onMouseEnter={() => setHoveredIndex(key)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <NavLink
                      key={item.id}
                      to={item.Link}
                      className="px-3 py-2 text-md hover:text-sky-400"
                      style={({ isActive }) =>
                        item.navLinkStyles({
                          isActive,
                          dark,
                          isHovering: hoveredIndex === key,
                        })
                      }
                      end
                    >
                      {item.Name}
                    </NavLink>
                  </li>
                )
                )}
                {session &&
                  <li
                    className="list-none rounded-md mt-1 transition duration-300"
                  >
                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={['click']}
                      overlayStyle={{ zIndex: 2500, marginTop: "15px" }}
                    >
                      <button>
                        <AiOutlineUser className="text-xl hover:text-sky-400 hover:dark:text-teal-500 transition duration-300 dark:text-white rounded-full" />
                      </button>
                    </Dropdown>
                  </li>
                }
              </div>
            </div>
            <div className="ml-4 flex gap-2 items-center">
              {session && <div className="mt-1 md:hidden">
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={['click']}
                  overlayStyle={{ zIndex: 2500, marginTop: "15px" }}
                >
                  <button>
                    <AiOutlineUser className="text-2xl hover:text-sky-400 hover:dark:text-teal-500 transition duration-300 dark:text-white rounded-full" />
                  </button>
                </Dropdown>
              </div>}
              <div >
                <button
                  type="button"
                  onClick={() => setDark(!dark)}
                  className="rounded-md px-3 py-1 transition duration-300"
                >
                  {dark ? (
                    <DarkThemeIcon />
                  ) : (
                    <LightThemeIcon />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {openMenuIcon &&
            <AnimatedMenuBar>
              <div className="space-y-4 px-2 py-4 w-full md:hidden">
                {navigation.map((item, key) =>
                (
                  <li
                    key={key}
                    className="list-none rounded-md"
                    onMouseEnter={() => setHoveredIndex(key)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <NavLink
                      key={key}
                      to={item.Link}
                      className={`rounded-md py-2 text-base font-medium text-gray-300`}
                      style={({ isActive }) =>
                        item.navLinkStyles({ isActive, dark, isHovering: hoveredIndex === key })
                      }
                      end
                    >
                      {item.Name}
                    </NavLink>
                  </li>
                )
                )}
              </div>
            </AnimatedMenuBar>
          }
        </AnimatePresence >
      </nav>
    </div>
  );
}
