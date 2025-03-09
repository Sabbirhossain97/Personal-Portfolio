import { useState, useEffect } from "react";
import { projectStorageUrl } from "../../../services/config";
import { projectsData } from "../../../services/projects/fetchProjects";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { LeftGradient } from "../../helpers/Gradient";

export default function Projects() {

  const [allprojects, setAllProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const getProjects = async () => {
      try {
        let data = await projectsData(filter)
        setAllProjects(data)
      } catch (error) {
        console.error(error)
      }
    };
    getProjects();
  }, [filter]);

  const handleProjectDetailsModal = (id) => {
    setIsModalOpen(true);
    setSelectedProjectId(id)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return (
    <main className="mt-[80px] bg-white dark:bg-slate-800 min-h-screen relative">
      <LeftGradient />
      <ProjectDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
      />
      <div className="mx-auto max-w-7xl border">
        <div data-aos="fade-up" className="relative px-4 sm:px-10 xl:px-24">
          <div className="transition-opacity mt-16 sm:mt-20">
            <div className="text-white flex justify-end">
              <select onChange={(e) => handleFilter(e)} id="project-type" className="custom-select bg-gray-50 border border-gray-300 transition duration-300 hover:border-sky-500 dark:hover:border-teal-500 text-gray-900 text-sm rounded-lg block p-2.5 focus:border-sky-500 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                <option selected value="all">All Projects</option>
                <option value="Design">Figma to Website</option>
                <option value="Frontend">Frontend</option>
                <option value="Full Stack">Full Stack</option>
              </select>
            </div>
            <ul className="mx-auto mt-8 grid grid-cols-1 gap-6 sm:px-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-8 xl:gap-x-8">
              {allprojects.map((project, index) => (
                <li
                  data-aos="zoom-in"
                  key={index}
                  className="shadow-md hover:shadow-xl ring-1 ring-sky-400/30 dark:ring-teal-500/30 dark:highlight-white/5 group relative rounded-3xl bg-slate-100 p-6 scale-100 transition duration-300 hover:bg-slate-200/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-900/50"
                >
                  <div className="rounded-lg aspect-[672/400] transform overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.08)] dark:bg-slate-700">
                    <div>
                      <img
                        alt="error"
                        src={`${projectStorageUrl + project.image}`}
                        className="rounded-md absolute h-full w-full"
                        style={{
                          color: "transparent",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col items-start">
                    <div className="flex flex-row">
                      <h2 className="text-sm font-semibold leading-6 transition duration-300 text-slate-900 group-hover:text-sky-500 dark:text-white dark:group-hover:text-teal-500">
                        <p target="_blank">
                          <span className="inset-0 rounded-3xl"></span>
                          {project.title}
                        </p>
                      </h2>
                    </div>
                    <div className="mt-2">
                      <a
                        href={project.livelink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-[1px] rounded-md bg-sky-200/50 dark:bg-zinc-700 group-hover:cursor-pointer w-full transition duration-300 pr-2  dark:border-white hover:dark:border-sky-500 hover:border-sky-500 flex-none text-[0.8125rem] leading-6 text-zinc-500 hover:text-sky-500 dark:hover:text-teal-500 dark:text-zinc-300"
                      >
                        Live Demo
                      </a>
                      <a
                        href={project.githublink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-[1px] ml-2 rounded-md bg-sky-200/50 dark:bg-zinc-700 group-hover:cursor-pointe transition duration-300r w-full pr-2 dark:border-white hover:dark:border-sky-500 hover:border-sky-500 flex-none text-[0.8125rem] leading-6 text-zinc-500 hover:text-sky-500 dark:hover:text-teal-500 dark:text-zinc-300"
                      >
                        Github
                      </a>
                      <span
                        className="px-2 py-[1px] rounded-md bg-sky-200/50 dark:bg-zinc-700 hover:cursor-pointer w-full ml-2 transition duration-300 flex-none text-[0.8125rem] leading-6 text-zinc-500 hover:text-sky-500 dark:hover:text-teal-500 dark:text-zinc-300"
                        onClick={() => {
                          handleProjectDetailsModal(project.id)
                        }}
                      >
                        Details
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
