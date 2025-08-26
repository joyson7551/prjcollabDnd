import React from "react";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../../features/adminApi/adminApi";

const OwnProjects = () => {
  const { data, isLoading, isError } = useGetProjectsQuery();

  const projects = data?.data || [];

  if (isLoading)
    return <p className="p-6 text-gray-600">Loading your projects...</p>;
  if (isError)
    return <p className="p-6 text-red-500"> Failed to fetch projects</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Projects</h2>

      {projects.length === 0 ? (
        <p className="text-gray-600">You haven’t created any projects yet.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project._id}
              className="border p-4 rounded hover:shadow-md transition"
            >
              <Link
                to={`/getproject/${project._id}`}
                className="text-xl font-bold text-blue-600 hover:underline"
              >
                {project.name}
              </Link>
              <p className="text-sm text-gray-700 mt-1">
                {project.description || "No description provided"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Members: {project.members.length} | Tasks:{" "}
                {project.tasks.length}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnProjects;
