import { useSelector } from "react-redux";
import { useGetProjectsQuery } from "../../features/adminApi/adminApi";
import { useState } from "react";
import CreateProject from "./CreateProject";
import OwnProjects from "./OwnProjects";

const ProjectPage = () => {
  const [loadPage, setLoadpage] = useState("own");
  const { data, isLoading, isError } = useGetProjectsQuery();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const userName = user?.name;
  console.log(data);

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col pt-12 px-4">
      <h1 className="text-3xl font-bold mb-8">
        {isLoading
          ? "Loading..."
          : `Welcome, ${userName || "User(not fetched correctly)"}`}
      </h1>
      <h2>Name: {userName}</h2>
      <h2>Designation: Senior Manager</h2>

      <div className="flex gap-6 pt-6">
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setLoadpage("create")}
        >
          Create Project
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setLoadpage("own")}
        >
          Own Projects
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setLoadpage("participating")}
        >
          Participating Projects
        </button>
      </div>

      <div className="mt-8">
        {loadPage === "create" && (
          <div>
            <CreateProject />
          </div>
        )}
        {loadPage === "own" && (
          <div>
            <OwnProjects />
          </div>
        )}
        {loadPage === "participating" && <div>Participating Projects List</div>}
      </div>
    </div>
  );
};

export default ProjectPage;

//naviagtion :create own and participationg
//1-<div className="min-h-screen bg-gray-100 text-black flex flex-col  pt-32 px-4 gap-6 ">
//2-<div className="min-h-screen bg-gray-100 text-black pt-32 px-4 gap-6 ">
