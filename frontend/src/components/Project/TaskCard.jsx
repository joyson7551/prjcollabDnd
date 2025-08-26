import React, { useState } from "react";
import { useAddCommentMutation } from "../../features/adminApi/adminApi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, projectId }) => {
  const [commentText, setCommentText] = useState("");
  const [addComment, { isLoading }] = useAddCommentMutation();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task._id,
      data: { status: task.status },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      await addComment({
        projectId,
        taskId: task._id,
        text: commentText,
      }).unwrap();
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const assignedUsers =
    task.assignedTo?.map((a) => a.user).join(", ") || "Unassigned";

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="border p-4 rounded bg-white mb-4 shadow hover:shadow-md transition cursor-grab"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-1">{task.title}</h3>
      <p className="text-sm text-gray-700 mb-2">
        {task.description || "No description provided."}
      </p>

      <div className="text-xs text-gray-600 space-y-1 mb-3">
        <p>
          <strong>📅 Due:</strong>{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
        </p>
        <p>
          <strong>👤 Assigned to:</strong> {assignedUsers}
        </p>
        <p>
          <strong>🕒 Created:</strong>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>📝 Updated:</strong>{" "}
          {new Date(task.updatedAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-semibold mb-2">💬 Comments</h4>
        <ul className="space-y-1 mb-3 max-h-32 overflow-y-auto">
          {task.comments?.length > 0 ? (
            task.comments.map((c, i) => (
              <li
                key={i}
                className="text-xs text-gray-800 bg-gray-100 p-2 rounded border"
              >
                {c.text}
                <span className="block text-gray-500 text-[0.7rem] mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </li>
            ))
          ) : (
            <li className="text-xs text-gray-500">No comments yet.</li>
          )}
        </ul>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type a comment..."
            className="flex-grow px-2 py-1 border rounded text-sm"
          />
          <button
            onClick={handleAddComment}
            disabled={isLoading}
            className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
