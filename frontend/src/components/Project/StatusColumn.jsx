import { useDroppable } from "@dnd-kit/core";

const StatusColumn = ({ id, title, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-white p-4 rounded shadow min-h-[200px] transition ${
        isOver ? "border border-blue-500 bg-white-50" : ""
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default StatusColumn;
