import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { BlogAPI } from "../API";
import Loading from "../components/Loading";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteModel from "../components/DeleteModel";
import FloatNotification from "../components/FloatNotification";
import SearchBar from "../components/SearchBar";
import useDebouncedValue from "../components/Debounce";
import moment from "moment";

const AdminBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [deleteModal, setDeleteModel] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebouncedValue(search, 500);
  const [showNotification, setShowNotification] = useState({
    show: false,
    status: "",
    title: "",
    message: <></>,
  });
  const navigate = useNavigate();
  let ignore = false;
  const getAllBlogs = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetch(BlogAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ exclusive_blog: false, search: search }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.status === "success") {
            setAllBlogs(data.data);
          } else {
            setShowNotification({
              show: true,
              message: <div>{data.error}</div>,
              title: "Backend Error",
              status: "failed",
            });
          }
        });
    }
  };
  useEffect(() => {
    if (!ignore) {
      getAllBlogs();
    }

    return () => {
      ignore = true;
    };
  }, [debouncedSearchTerm]);
  const deleteBlog = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setModelLoading(true);
      fetch(`${BlogAPI}/delete `, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: blogId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setDeleteModel(false);
            setBlogId("");
            getAllBlogs();
          } else {
            setShowNotification({
              show: true,
              message: <div>{data.error}</div>,
              title: "Backend Error",
              status: "failed",
            });
          }
          setModelLoading(false);
        });
    }
  };

  return (
    <div>
      <div className="sm:flex items-center justify-between mb-4 gap-3">
        <div className="mb-4 lg:mb-0">
          <h3 className="font-bold text-2xl">Blogs</h3>
          <p>View your current blogs & summary</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <button
            onClick={() => navigate("/super_admin/dashboard/blog/add-blog")}
            className="bg-primaryColor flex gap-2 items-center hover:bg-lightColor text-white font-bold py-2 px-4 rounded"
          >
            <PlusIcon className="h-5 w-5" />
            Add Blog
          </button>
        </div>
      </div>
      <div>
        <SearchBar
          value={search}
          handleChange={(value) => {
            setSearch(value);
          }}
        />
      </div>
      <div className="my-5">
        <section className="flex flex-col justify-center antialiased text-gray-600 ">
          <div className="h-full">
            <div className="w-full mx-auto rounded-lg border border-gray-200">
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Title</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Description
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Date</div>
                        </th>
                        <th>
                          <div className="font-semibold text-center">
                            Action
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y  divide-gray-300">
                      {loading ? (
                        <tr>
                          <td colSpan={5}>
                            <div className="w-full flex justify-center">
                              <div className="w-20">
                                <Loading />
                              </div>
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      ) : allBlogs.length > 0 ? (
                        allBlogs.map((item, ind) => (
                          <tr key={ind}>
                            <td className="p-2 min-w-48">
                              <div className="flex items-center">
                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                  <img
                                    className="rounded-full object-contain h-10 w-10 border border-primaryColor"
                                    src={item.imgUri}
                                    alt="Alex Shatov"
                                  />
                                </div>
                                <div
                                  onClick={() => {
                                    navigate(`./edit-blog?id=${item._id}`);
                                  }}
                                  className="font-medium text-gray-800 cursor-pointer"
                                >
                                  {item.title}
                                </div>
                              </div>
                              {/* <div
                                onClick={() => {
                                  navigate(`./edit-blog?id=${item._id}`);
                                }}
                                className="font-medium text-gray-800 cursor-pointer"
                              >
                                {item.title}
                              </div> */}
                            </td>
                            <td className="p-2">
                              <div className="text-left line-clamp-2">
                                {item.description}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">
                                {moment(item.date).format("DD MMM YYYY")}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="gap-5 flex justify-center">
                                <button
                                  onClick={() => {
                                    navigate(`./edit-blog?id=${item._id}`);
                                  }}
                                >
                                  <PencilIcon className="w-5 h-5 text-gray-800" />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeleteModel(true);
                                    setBlogId(item._id);
                                  }}
                                >
                                  <TrashIcon className="w-5 h-5 text-primaryColor" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>
                            <div className="w-full flex justify-center pt-3">
                              No data found in blogs
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <DeleteModel
        handleDelete={deleteBlog}
        setShowModal={setDeleteModel}
        title={"Delete Blog"}
        showModal={deleteModal}
        loading={modelLoading}
      />
      <FloatNotification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
      />
    </div>
  );
};

export default AdminBlogs;
