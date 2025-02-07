import { IoHome } from "react-icons/io5";
import { FaFolderClosed } from "react-icons/fa6";

export const sideBarContents = [
    {
        name: "Home",
        path: "/",
        logo: (
            <IoHome className="text-xl transition duration-300 text-zinc-400 group-hover:text-sky-400 dark:group-hover:text-teal-500" />
        ),
    },
    {
        name: "Projects",
        path: false,
        logo: (
            <FaFolderClosed className="text-xl transition duration-300 text-zinc-400 group-hover:text-sky-400 dark:group-hover:text-teal-500" />
        ),
    },
];