import { useEffect, useState, useCallback } from "react";
import { TagsInput } from "react-tag-input-component";
import AttachImage from "./AttachImage";
import { useSession } from "../../../hooks/useSession";
import { loadProject } from "../../../services/dashboard/loadProject";
import { createProject } from "../../../services/dashboard/createProject";
import { updateProject } from "../../../services/dashboard/updateProject";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";

export default function AddProject() {
  const navigate = useNavigate()
  let location = useLocation();
  let currentPath = location.pathname.split("/");
  let slug = currentPath[3];
  const isCreate = currentPath.includes("createproject");
  const { session } = useSession();
  const [projects, setProjects] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCreate) {
      try {
        setLoading(true)
        await createProject(session, projects, file, navigate);
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    else {
      try {
        setLoading(true)
        await updateProject(session, projects, file, slug, navigate)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  };

  const loadProjectContent = useCallback(async () => {
    try {
      let projectData = await loadProject(slug);
      setProjects(projectData)
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  useEffect(() => {
    if (!isCreate) {
      loadProjectContent();
    }
  }, [isCreate, loadProjectContent])

  const handleFormData = (e) => {
    const { name, value } = e.target;
    if (value.startsWith(" ")) {
      return;
    }
    setProjects((prev) => {
      const updatedProjects = { ...prev, [name]: value }
      return updatedProjects
    })
  };

  const handleTechnologies = (tags) => {
    setProjects((prev) => ({
      ...prev,
      technologies: tags,
    }))
  };

  const handleFeatures = (tags) => {
    setProjects((prev) => ({
      ...prev,
      features: tags,
    }))
  };

  return (
    <div className="rounded-lg mt-[20px] w-full max-w-3xl border dark:border-zinc-700/80 p-4 lg:p-8">
      <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        {isCreate ? "Add" : "Update"} Project Details
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-zinc-400"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={projects?.title ?? ""}
            onChange={handleFormData}
            className="bg-zinc-100 w-full p-2.5 text-gray-900 dark:text-zinc-400 text-sm rounded-lg transition duration-300 border border-zinc-100 dark:border-slate-500/20 focus:border-sky-400 dark:focus:border-teal-500 focus:outline-none dark:bg-slate-500/20"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="github"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-zinc-400"
          >
            Github link
          </label>
          <input
            type="text"
            id="github"
            name="githublink"
            value={projects?.githublink}
            onChange={handleFormData}
            className="bg-zinc-100 w-full p-2.5 text-gray-900 dark:text-zinc-400 text-sm rounded-lg transition duration-300 border border-zinc-100 dark:border-slate-500/20 focus:border-sky-400 dark:focus:border-teal-500 focus:outline-none dark:bg-slate-500/20"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="live"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-zinc-400"
          >
            Live link
          </label>
          <input
            type="text"
            id="live"
            name="livelink"
            value={projects?.livelink}
            onChange={handleFormData}
            className="bg-zinc-100 w-full p-2.5 text-gray-900 dark:text-zinc-400 text-sm rounded-lg transition duration-300 border border-zinc-100 dark:border-slate-500/20 focus:border-sky-400 dark:focus:border-teal-500 focus:outline-none dark:bg-slate-500/20"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="project_type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-zinc-400"
          >
            Project Type
          </label>
          <input
            type="text"
            id="project_type"
            name="project_type"
            value={projects?.project_type}
            onChange={handleFormData}
            className="bg-zinc-100 w-full p-2.5 text-gray-900 dark:text-zinc-400 text-sm rounded-lg transition duration-300 border border-zinc-100 dark:border-slate-500/20 focus:border-sky-400 dark:focus:border-teal-500 focus:outline-none dark:bg-slate-500/20"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="design_source"
            className={`block mb-2 text-sm font-medium ${projects.project_type === "Design" ? "text-gray-900 dark:text-zinc-400" : "text-gray-900 dark:text-zinc-400"} `}
          >
            Design Source
          </label>
          <input
            type="link"
            id="design_source"
            name="design_source"
            value={projects?.design_source}
            placeholder="https://www.figma.com/file/"
            onChange={handleFormData}
            className={`${projects.project_type === "Design" ? "bg-gray-50 dark:bg-slate-500/20 cursor-default" : "cursor-not-allowed bg-zinc-300 dark:bg-slate-700/20 dark:border-slate-600/20"} transition duration-300 border border-gray-300 dark:border-slate-500/20 text-gray-900 text-sm focus:outline-none focus:border-sky-400 dark:focus:border-teal-500 rounded-lg block w-full p-2.5 dark:placeholder-gray-400 `}
            disabled={projects.project_type === "Design" ? false : true}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="project_features"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-zinc-400"
          >
            Project Features
          </label>
          <TagsInput
            id="project_features"
            value={projects?.features ?? []}
            onChange={handleFeatures}
            name="features"
            classNames={{
              tag: "text-black dark:bg-zinc-800 dark:text-gray-300",
              input: "text-zinc-900 dark:text-zinc-400 p-1",
            }}
            placeHolder="Enter Features..."
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="technologies"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-zinc-400"
          >
            Technologies Used
          </label>
          <TagsInput
            id="technologies"
            value={projects && projects?.technologies}
            onChange={handleTechnologies}
            name="technologies"
            classNames={{
              tag: "text-black dark:bg-zinc-800 dark:text-gray-300",
              input: "text-zinc-900 dark:text-zinc-400 p-1",
            }}
            placeHolder="Enter Technologies..."
          />
        </div>
        <AttachImage
          setFile={setFile}
          isCreate={isCreate}
          projects={projects}
        />
        <div className="flex flex-col items-center mb-4">
          <button
            type="submit"
            className="bg-gray-100 border flex gap-2 items-center justify-center dark:text-zinc-400 border-gray-300 hover:bg-gray-200 dark:border-transparent transition duration-300 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 focus:outline-none font-medium rounded-md text-sm w-full px-5 py-2.5 text-center "
          >
            {loading ? <><Spinner /> Processing...</> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
