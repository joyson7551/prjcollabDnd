import { useForm, useFieldArray } from "react-hook-form";
import { useCreateProjectMutation } from "../../features/adminApi/adminApi";

const CreateProject = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      members: [],
      tasks: [],
    },
  });

  const [createProject, { isLoading, isError }] = useCreateProjectMutation();

  const {
    fields: memberFields,
    append: addMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: "members",
  });

  const {
    fields: taskFields,
    append: addTask,
    remove: removeTask,
  } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmit = async (formData) => {
    try {
      const response = await createProject(formData).unwrap();
      console.log("Project created!", response);
      reset();
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Project</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
        <div>
          <label className="block font-medium mb-1">
            Project Name<span className="text-red-600">*</span>
          </label>
          <input
            {...register("name", { required: "Project name is required" })}
            className="w-full p-2 border rounded"
            placeholder="Project title"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>


        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded"
            placeholder="Optional description"
          />
        </div>


        <div>
          <label className="block font-medium mb-2">Project Members</label>
          {memberFields.map((member, index) => (
            <div key={member.id} className="flex gap-4 items-center mb-3">
              <input
                {...register(`members.${index}.user`)}
                className="w-1/2 p-2 border rounded"
                placeholder="User ID"
              />
              <select
                {...register(`members.${index}.role`)}
                className="w-1/3 p-2 border rounded"
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
              <button
                type="button"
                onClick={() => removeMember(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addMember({ user: "", role: "Member" })}
            className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
          >
            ➕ Add Member
          </button>
        </div>


        <div>
          <label className="block font-medium mb-2">Project Tasks</label>
          {taskFields.map((task, index) => (
            <div
              key={task.id}
              className="space-y-2 mb-4 border p-3 rounded bg-gray-50"
            >
              <input
                {...register(`tasks.${index}.title`, { required: false })}
                className="w-full p-2 border rounded"
                placeholder="Task title"
              />
              <textarea
                {...register(`tasks.${index}.description`)}
                className="w-full p-2 border rounded"
                placeholder="Task description"
              />
              <input
                {...register(`tasks.${index}.dueDate`)}
                type="date"
                className="w-full p-2 border rounded"
              />
              <select
                {...register(`tasks.${index}.priority`)}
                className="w-full p-2 border rounded"
              >
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
              <button
                type="button"
                onClick={() => removeTask(index)}
                className="text-red-500 text-sm"
              >
                Remove Task
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addTask({})}
            className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
          >
            ➕ Add Task
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
        {isError && (
          <p className="text-red-500 text-sm mt-2">Project creation failed.</p>
        )}
      </form>
    </div>
  );
};

export default CreateProject;

