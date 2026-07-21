import { useState, useEffect } from "react";
import { Spinner } from "../../SVG/SvgComponents";
import { BsArrowRight } from "react-icons/bs";
import { allBlogs } from "../../../services/allBlogs";
import { blogCoverUrl, blogAppUrl } from "../../../services/config";
import { RightGradient } from "../../helpers/Gradient";
import moment from "moment";

export default function BlogFeed() {
  const [allBlog, setAllBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBlogs = async () => {
    try {
      setLoading(true);
      let data = await allBlogs()
      setAllBlog(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="relative py-20">
      <RightGradient />
      <section className="px-4 sm:px-10 xl:px-24 mx-auto max-w-7xl">
        <div>
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 data-aos="fade-up" className="text-center font-semibold mb-12 tracking-normal text-zinc-800 dark:text-zinc-100 text-3xl">Blogs</h2>
          </div>
          {loading ? (
            <div className="h-96 flex justify-center items-center">
              <div role="status">
                <Spinner />
              </div>
            </div>
          ) : allBlog?.length === 0 ? (
          <div className="relative flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sky-400/10 text-sky-400 dark:bg-teal-500/10 dark:text-teal-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5A3.375 3.375 0 0 0 10.125 2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15A2.25 2.25 0 0 0 6.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-5.25Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 2.25V6a2.25 2.25 0 0 0 2.25 2.25h3.75M8.25 15h7.5M8.25 18h4.5"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
              No blogs found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              There are no blog posts available right now. Please check back later.
            </p>
          </div>
          ) : 
            (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 mx-auto border dark:border-white">
                {allBlog?.slice(0, 4)?.map((blog, index) => (
                  <div data-aos="zoom-in" key={index} className="relative col-span-2 lg:col-span-1">
                    <div
                      className="flex flex-col sm:flex-row rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700/60"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="h-48 w-full sm:w-56 md:w-72 lg:w-56 object-cover"
                          src={blogCoverUrl + blog.thumbnail}
                          loading="lazy"
                          alt="blog cover"
                        />
                      </div>
                      <div className="flex items-center px-4 py-4 sm:py-0">
                        <div className="flex-1">
                          <div className="block">
                            <p className="text-xl font-semibold dark:text-gray-200">
                              {blog.title}
                            </p>
                            <p className="mt-2 text-md  gap-4 dark:text-teal-600 text-sky-400">
                              {moment(blog.inserted_at).format("MMMM D, YYYY")}
                            </p>
                            <p className="mt-2 block sm:hidden dark:text-white">
                              {blog.introduction}
                            </p>
                            <div className="mt-6 flex items-center">
                              <a href={blogAppUrl + 'blog/' + blog.slug} target="_blank" rel="noreferrer">
                                <button className="bg-zinc-200 rounded-xl flex items-center group bg-sky-400/10 hover:bg-sky-400/20 dark:bg-teal-500/10 text-sky-400 dark:text-teal-500 text-md px-4  py-2 cursor-pointer dark:hover:bg-teal-500/30 transition duration-300">
                                  <span>Read more</span>
                                  <BsArrowRight className='ml-2 mt-1 translate-x-0 group-hover:translate-x-2 transition-transform duration-300' />
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          {allBlog?.length > 4 ?
            (<div className="mt-8 flex justify-center relative">
              <a
                href={blogAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 justify-center rounded-md py-3 px-8 text-sm outline-offset-2 transition active:transition-none bg-zinc-100 font-medium text-zinc-900 hover:text-sky-400 hover:bg-zinc-200/50 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900/50 dark:hover:text-teal-500 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-2 w-full sm:w-[200px]">
                Show All
              </a>
            </div>) : null
          }
        </div>
      </section >
    </div>

  )
}
