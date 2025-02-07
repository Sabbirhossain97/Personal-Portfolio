import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { Modal } from 'antd';
import Spinner from "../../../components/helpers/Spinner"
import { projectStorageUrl } from "../../../services/config";
import { singleProjectData } from "../../../services/projects/fetchProjects";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectDetailsModal({ isModalOpen, setIsModalOpen, selectedProjectId, setSelectedProjectId }) {

  const [projectDetails, setProjectDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProjectId) {
      const getProjectsDetails = async () => {
        try {
          setLoading(true)
          let data = await singleProjectData(selectedProjectId);
          setProjectDetails({
            ...data,
            features: data?.features ? JSON.parse(data.features) : [],
            technologies: data?.technologies ? JSON.parse(data.technologies) : [],
          })
        }
        catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      };
      getProjectsDetails();
    }
  }, [selectedProjectId]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null)
  };

  return (

    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={800} zIndex={3000} className="custom-modal">
      <div className="h-full relative rounded-lg">
        {loading ?
          <div className="h-screen flex items-center justify-center">
            <Spinner className="text-xl" />
          </div>
          :
          <div
            className="h-full mt-8 mb-8"
          >
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Thumbnail
            </h3>
            <img
              style={{
                objectFit: "cover",
                width: "100%",
              }}
              src={`${projectStorageUrl + projectDetails?.image}`}
              className="rounded-md"
              alt="thumbnail"
            />
            <h3 className="mt-4 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Project Title
            </h3>
            <p className="text-lg font-normal text-zinc-400">
              {projectDetails?.title}
            </p>
            <h3 className="mt-4 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Project Type
            </h3>
            <p className="text-lg font-normal text-zinc-400">
              {projectDetails?.project_type}
            </p>
            {projectDetails?.project_type !== "Design" &&
              <>
              <h3 className="mb-4 mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Project Features
                </h3>
                <div className="flex">
                  <div className="font-medium text-md text-gray-500 text-left">
                    {projectDetails && projectDetails?.features?.map((item, index) => (
                      <div key={index} className="flex flex-row">
                        <span>
                          <TiTick className="mt-3 text-sky-400 dark:text-teal-500 text-lg" />
                        </span>
                        <li className="list-none ml-1 mt-2 dark:text-zinc-400">{item}</li>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            }
            {
              projectDetails?.project_type === "Design" &&
              <>
                <h3 className="mb-4 mt-4 text-xl font-medium text-gray-900 dark:text-white">
                  Design Source
                </h3>
                <div className="flex flex-row">
                  <a target="_blank" rel="noreferrer" href={projectDetails?.design_source} className="list-none flex gap-2 items-center transition duration-300 text-lg text-zinc-400 hover:text-sky-400 dark:hover:text-teal-500">Go to Figma file <span><FaExternalLinkAlt /></span>
                  </a>
                </div>
              </>
            }
            <h3 className="mb-4 mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              Technologies
            </h3>
            <div className="font-medium text-gray-500 flex flex-row gap-2 flex-wrap">
              {projectDetails && projectDetails?.technologies?.map((item, index) => (
                <div key={index} className="flex flex-row">
                  <li className="list-none text-md px-2 text-zinc-600 dark:text-zinc-300 bg-sky-200/50 dark:bg-zinc-700 rounded-lg">
                    <p className="px-2">{item}</p>
                  </li>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </Modal >
  );
}
