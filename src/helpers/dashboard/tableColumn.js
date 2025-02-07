import { projectStorageUrl } from "../../services/config";
import { Image, Tooltip, Popconfirm, Button } from "antd";
import { deleteProject } from "../../services/dashboard/deleteProject";
import { message } from "antd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const tableColumns = (setLoading, getProjects) => {

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            await deleteProject(id)
            await getProjects();
        } catch (error) {
            message.error(error);
        } finally {
            setLoading(false)
        }
    };

    const confirm = (id) => {
        handleDelete(id)
    }

    return [
        {
            title: 'Title',
            dataIndex: 'title',
            width: 150
        },
        {
            title: 'Thumbnail',
            dataIndex: 'image',
            width: 150,
            render: (record) =>
                <Image
                    style={{
                        width: "100px",
                        height: "50px",
                        objectFit: "cover",
                    }}
                    src={`${projectStorageUrl + record}`}
                    alt="error"
                />
        },
        {
            title: 'Github Link',
            dataIndex: 'githublink',
            width: 250,
            render: (text) =>
                <p className=" w-[200px]" >{text}</p>
        },
        {
            title: 'Live Link',
            dataIndex: 'livelink',
            width: 250,
            render: (text) =>
                <a href={text} target="__blank">
                    <p className=" w-[200px] hover:text-sky-400 dark:hover:text-teal-500" >{text}</p>
                </a>
        },
        {
            title: 'Inserted at',
            dataIndex: 'inserted_at',
            width: 150
        },
        {
            title: 'Project Type',
            dataIndex: 'project_type',
            width: 150,
            render: (text) =>
                <p >{text}</p>
        },
        {
            title: 'Project Features',
            dataIndex: 'features',
            width: 250,
            ellipsis: true,
            render: (text) => (
                <div>
                    <Tooltip title={text}>
                        <p className="truncate ...">{text ? text : "N/A"}</p>
                    </Tooltip>
                </div>
            )
        },
        {
            title: 'Technologies',
            dataIndex: 'technologies',
            width: 250,
            render: (text) => {
                return (
                    <div className="inline-flex flex-wrap justify-center">
                        <ul className="space-x-2 space-y-2">
                            {text && text.map((item, index) => (
                                <li key={index} className="inline-flex items-start justify-start dark:text-white text-zinc-900 bg-sky-500/20 dark:bg-teal-500/20 px-2 py-[2px] text-[10px] rounded-md">{item}</li>
                            ))}
                        </ul>
                    </div>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 150,
            render: (_, record) => (
                <div>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirm(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button style={{ border: 'none', boxShadow: "none", padding: '5px' }}>
                            <MdDelete className="text-2xl text-red-500 hover:text-red-600 transition duration-300" />
                        </Button>
                    </Popconfirm>
                    <Link to={`/dashboard/project/${record.id}/update`}>
                        <button>
                            <FaEdit className="text-2xl text-sky-500 hover:text-sky-600 dark:text-teal-500 dark:hover:text-teal-600 transition duration-300" />
                        </button>
                    </Link>
                </div>
            )
        },
    ];
}
