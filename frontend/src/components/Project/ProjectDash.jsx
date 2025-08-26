import { useParams } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useUpdateTaskStatusMutation,
  useGetProjectByIdQuery,
} from "../../features/adminApi/adminApi";
import TaskCard from "./TaskCard";
import StatusColumn from "./StatusColumn";

const STATUS_COLUMNS = [
  { id: "Todo", title: "Todo" },
  { id: "In Progress", title: "In Progress" },
  { id: "Completed", title: "Completed" },
];

const ProjectDash = () => {
  const { id: projectId } = useParams();
  const { data, isLoading, error, refetch } = useGetProjectByIdQuery(projectId);
  const [updateTaskStatus, { isLoading: isUpdating }] =
    useUpdateTaskStatusMutation();

  const tasksByStatus = {
    Todo: [],
    "In Progress": [],
    Completed: [],
  };

  data?.data?.tasks?.forEach((task) => {
    tasksByStatus[task.status].push(task);
  });

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    console.log(over, "over");
    console.log(active, "active");
    console.log("🟦 Drag End Triggered");
    console.log("🔸 Active Task ID:", active.id);
    console.log("🔸 Original Status:", active.data.current?.status);
    console.log("🔹 Drop Target ID (new status):", over?.id);

    if (!over || active.data.current?.status === over.id) return;

    try {
      const response = await updateTaskStatus({
        taskId: active.id,
        projectId,
        status: over.id,
      }).unwrap();

      console.log("Status updated:", response);
      refetch();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  if (isLoading) return <p>Loading project tasks...</p>;
  if (error) return <p>Error loading project: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{data?.data.name}</h1>
      <p className="mb-6 text-gray-700">{data?.data.description}</p>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {STATUS_COLUMNS.map(({ id, title }) => (
            <StatusColumn key={id} id={id} title={title}>
              <SortableContext
                items={tasksByStatus[id].map((t) => t._id)}
                strategy={verticalListSortingStrategy}
              >
                {tasksByStatus[id].map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    disabled={isUpdating}
                    projectId={projectId}
                  />
                ))}
              </SortableContext>
            </StatusColumn>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default ProjectDash;
