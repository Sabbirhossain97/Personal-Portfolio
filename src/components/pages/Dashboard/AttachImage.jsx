import { useEffect, useState } from "react";
import { Attachments } from '../../SVG/SvgComponents';

function AttachImage({ setFile, isCreate, projects }) {

    const [preview, setPreview] = useState(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const viewImage = URL.createObjectURL(file);
        setFile(file)
        setPreview(viewImage)
    };

    const handleFileCancel = () => {
        setPreview(null);
        setFile(null);
    }

    useEffect(() => {
        if (!isCreate) {
            setPreview(projects && projects.coverphoto);
        }
    }, [isCreate, projects]);

    return (
        <div className="mb-6">
            <div>
                {isCreate ? preview ?
                    (
                        <div>
                            <img
                                src={preview}
                                alt="preview"
                                className="flex justify-center w-full"
                            />
                            <div className="flex flex-row">
                                <button
                                    type="button"
                                    onClick={handleFileCancel}
                                    className="mt-[25px] flex justify-center rounded-md border border-transparent text-zinc-900 bg-zinc-200 dark:bg-zinc-700/50 dark:hover:bg-zinc-900/50 py-2 px-4 text-sm font-medium dark:text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="sm:border-gray-200 sm:pt-5">
                            <div className="mt-1 sm:mt-0">
                                <label htmlFor="file" className="relative transition duration-300 rounded-md font-medium text-sky-500 dark:text-teal-500 dark:hover:text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-sky-700">
                                    <div className="flex w-full justify-center rounded-md border-2 border-dashed border-slate-500/20 px-6 pt-5 pb-6 cursor-pointer">
                                        <div className="space-y-1 text-center">
                                            <Attachments />
                                            <span>Attach an image</span>
                                            <input
                                                id="file"
                                                type="file"
                                                required
                                                name="file"
                                                accept="image/gif, image/*"
                                                onChange={handleUpload}
                                                className="hidden" />
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    ) :
                    <div>
                        {preview ?
                            <>
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="flex justify-center w-full rounded-md"
                                />
                                <div className="flex flex-row">
                                    <button
                                        type="button"
                                        onClick={handleFileCancel}
                                        className="mt-[25px] flex justify-center rounded-md border border-transparent text-zinc-900 bg-zinc-200 dark:bg-zinc-700/50 dark:hover:bg-zinc-900/50 py-2 px-4 text-sm font-medium dark:text-white transition duration-300 shadow-sm hover:bg-zinc-300 focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                            :
                            <div className="sm:border-gray-200 sm:pt-5">
                                <div className="mt-1 sm:mt-0">
                                    <label htmlFor="file" className="relative transition duration-300 rounded-md font-medium text-sky-500 dark:text-teal-500 dark:hover:text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-sky-700">
                                        <div className="flex w-full justify-center rounded-md border-2 border-dashed border-slate-500/20 px-6 pt-5 pb-6 cursor-pointer">
                                            <div className="space-y-1 text-center">
                                                <Attachments />
                                                <span>Attach an image</span>
                                                <input
                                                    id="file"
                                                    type="file"
                                                    name="file"
                                                    accept="image/gif, image/*"
                                                    onChange={handleUpload}
                                                    className="hidden" />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default AttachImage