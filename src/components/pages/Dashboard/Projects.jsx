import { useState, useEffect, useCallback } from "react";
import { getAllProjects } from "../../../services/dashboard/getAllProjects";
import { uploadCV } from "../../../services/dashboard/uploadCV";
import Spinner from "../../helpers/Spinner";
import { Link } from "react-router-dom";
import { Table, Spin } from 'antd';
import { tableColumns } from "../../../helpers/dashboard/tableColumn";

function AllProjects() {
    const [loading, setLoading] = useState(false);
    const [allprojects, setAllProjects] = useState([]);
    const [isCvUploaded, setIsCvUploaded] = useState(false);

    const getProjects = useCallback(async () => {
        try {
            setLoading(true)
            let data = await getAllProjects()
            setAllProjects(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    const handleCVUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsCvUploaded(true);
            await uploadCV(file)
        } catch (error) {
            console.error(error)
        } finally {
            setIsCvUploaded(false);
        }
    };

    return (
        <>
            <div className="flex flex-row gap-4 sm:gap-0 overflow-hidden justify-end items-end w-full">
                <div className="flex gap-4">
                    <div className="overflow-hidden sm:mt-0 sm:ml-16 sm:flex-none">
                        <label htmlFor="file" className="cursor-pointer overflow-hidden inline-flex items-center justify-center rounded-md border border-transparent bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-900/50 dark:text-zinc-300 px-4 py-2 text-sm font-medium transition duration-300 text-zinc-900 shadow-sm hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                            <input
                                type="file"
                                id="file"
                                accept="application/pdf"
                                onChange={(e) => handleCVUpload(e)}
                                className="hidden mt-[5px] w-full text-sm text-gray-900 bg-zinc-200 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none"
                            />
                            {isCvUploaded ? <><Spinner /> <span className="pl-3">Processing</span> </> : "Upload CV"}
                        </label>
                    </div>
                    <div className="overflow-hidden sm:flex-none">
                        <Link to="/dashboard/createproject">
                            <button
                                type="button"
                                className="overflow-hidden inline-flex items-center justify-center rounded-md border border-transparent bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-900/50 dark:text-zinc-300 px-4 py-2 text-sm font-medium transition duration-300 text-zinc-900 shadow-sm hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Add projects
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative w-full">
                <Table
                    scroll={{ x: 1000 }}
                    style={{ marginTop: '20px', opacity: loading ? '50%' : '100%' }}
                    columns={tableColumns(setLoading)}
                    dataSource={allprojects}
                    pagination={false}
                    className="custom-table border-separate border-spacing-0"
                />
                {loading && <Spin className="absolute top-1/2 left-1/2" size="large" />}
            </div>
        </>
    )
}

export default AllProjects