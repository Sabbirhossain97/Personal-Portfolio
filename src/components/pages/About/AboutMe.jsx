import { BsLinkedin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import { Link, useLocation } from 'react-router-dom';
import { certifications } from '../../../helpers/certification';
import { Download, Experience } from '../../SVG/SvgComponents';
import { downloadCv } from "../../../services/dashboard/downloadCV";
import { LeftGradient } from "../../helpers/Gradient";

function AboutMe() {
    const params = useLocation();

    const handleCVDownload = async () => {
        await downloadCv()
    };

    return (
        <div className={`relative ${params.pathname === "/" && "py-0 lg:py-20"}`}>
            <LeftGradient />
            <div className={`max-w-7xl px-4 sm:px-10 xl:px-24 mx-auto ${params.pathname === "/about" ? "mt-16" : "mt-0"}`}>
                <section className="text-gray-600 body-font">
                    <div data-aos="fade-right" className="mx-auto flex py-24 flex-col gap-8 lg:flex-row items-center justify-center">
                        <div className="lg:flex-grow lg:w-1/2 flex flex-col lg:text-left lg:items-start mb-16 lg:mb-0 items-center text-center">
                            <h1 className="title-font sm:text-5xl text-3xl mb-4 font-semibold text-zinc-800 dark:text-zinc-100">About Me</h1>
                            <div className='mt-4'>
                                <h1 className="title-font sm:text-3xl text-3xl mb-4 font-medium text-zinc-800 dark:text-zinc-100"><span className='text-sky-400 dark:text-teal-500'>Meet</span> Sabbir Hossain </h1>
                                <p className="mb-4 leading-relaxed text-zinc-800 dark:text-zinc-400">With the expertise of a passionate, motivated and committed Web Application Developer, I am dedicated to assisting people and organizations in realizing their maximum potential. I have a wealth of expertise and a successful track record in problem-solving.</p>
                                {params.pathname === "/about" &&
                                    <>
                                        <p className="mb-4 leading-relaxed text-zinc-800 dark:text-zinc-400">
                                            I have expertise in crafting dynamic user experiences using <span className='text-sky-400 dark:text-teal-500'>ReactJS</span> and <span className='text-sky-400 dark:text-teal-500'>NextJS</span>. I thrive on creating sleek and responsive designs, powered by modern CSS frameworks like <span className='text-sky-400 dark:text-teal-500'>TailwindCSS</span> and <span className='text-sky-400 dark:text-teal-500'>Ant Design</span>.With a keen eye for detail, I specialize in <span className='text-sky-400 dark:text-teal-500'>HTML5</span> and <span className='text-sky-400 dark:text-teal-500'>CSS3</span> to bring designs to life, while my <span className='text-sky-400 dark:text-teal-500'>GitHub</span> profile reflects my dedication to collaboration and version control.
                                        </p>
                                        <p className="mb-4 leading-relaxed text-zinc-800 dark:text-zinc-400">
                                            Outside of coding, you'll often find me refining APIs and testing endpoints with <span className='text-sky-400 dark:text-teal-500'>Postman</span>, ensuring smooth communication between front and backend systems. Get in touch, and let's build something incredible!
                                        </p>
                                    </>
                                }
                                <div className="flex justify-center lg:justify-start">
                                    {params.pathname === "/" ?
                                        <>
                                            <Link to="/about">
                                                <p className="inline-flex items-center gap-2 justify-center rounded-md py-3 px-24 md:px-16 text-sm outline-offset-2 transition duration-300 active:transition-none bg-zinc-100 font-medium text-zinc-900 hover:text-sky-400 hover:bg-zinc-200/50 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900/50 dark:hover:text-teal-500 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-2">
                                                    Read More
                                                </p>
                                            </Link>
                                        </> :
                                        <button
                                            onClick={handleCVDownload}
                                            className="inline-flex items-center gap-2 justify-center rounded-md py-3 px-8 text-sm outline-offset-2 transition active:transition-none bg-zinc-100 font-medium text-zinc-900 hover:text-sky-400 hover:bg-zinc-200/50 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900/50 dark:hover:text-teal-500 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-2 w-full">
                                            Download CV
                                            <Download />
                                        </button>
                                    }
                                </div>
                            </div>
                            {params.pathname === "/" && <div className="mt-6 flex gap-2">
                                <a href="https://www.linkedin.com/in/sabbir-hossain-b73726214/" target="_blank" rel="noreferrer">
                                    <BsLinkedin className="cursor-pointer text-xl text-gray-500 hover:text-sky-400 dark:hover:text-teal-400 scale-100 hover:scale-105 transition duration-300" />
                                </a>
                                <a href="https://github.com/Sabbirhossain97" target="_blank" rel="noreferrer">
                                    <AiFillGithub className="cursor-pointer text-xl text-gray-500 hover:text-sky-400 dark:hover:text-teal-400 ml-4 scale-100 hover:scale-105 transition duration-300" />
                                </a>
                                <a href="mailto:sabbirhossainbd199@gmail.com" target="_blank" rel="noreferrer">
                                    <SiGmail className="cursor-pointer text-xl text-gray-500 hover:text-sky-400 dark:hover:text-teal-400 ml-4 scale-100 hover:scale-105 transition duration-300" />
                                </a>
                            </div>
                            }
                        </div>
                        <div data-aos="zoom-in" className="w-full lg:w-1/2 flex items-center justify-center">
                            <img
                                className="aspect-square w-64 sm:w-72 lg:w-96 rounded-full object-cover object-bottom"
                                src="./assets/me.jpg"
                                alt="Sabbir Hossain"
                            />
                        </div>
                    </div>
                </section>
                {params.pathname === "/about" &&
                    <div className="rounded-2xl relative z-20 border border-zinc-200 p-5 mx-auto xl:mx-0 dark:border-zinc-700/40">
                        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            <Experience className="text-white dark:text-slate-800 h-6 w-6" />
                            <span className="ml-3 mt-1">
                                Experience and Certifications
                            </span>
                        </h2>
                        <ol className="mt-6 space-y-4">
                            {certifications.map((item, key) => (
                                <li key={key} className="flex gap-4 ">
                                    <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                                        <img
                                            alt=""
                                            src={item.logo}
                                            width="32"
                                            height="32"
                                            decoding="async"
                                            data-nimg="future"
                                            className="rounded-full h-10 w-10"
                                            loading="lazy"
                                            style={{ color: "transparent" }}
                                        />
                                    </div>
                                    <dl className="flex flex-col md:flex-row flex-auto flex-wrap gap-x-2 ">
                                        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100 ">
                                            {item.certificate}
                                        </dd>
                                        <dd className="text-xs text-zinc-500 dark:text-zinc-400 ">
                                            {item.Institution}
                                        </dd>
                                        <dd className="md:ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                                            <span aria-hidden="true">
                                                {item.Issued}
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                            ))}
                        </ol>
                    </div>
                }
            </div>
        </div>
    )
}

export default AboutMe