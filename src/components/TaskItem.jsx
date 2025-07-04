import { useState } from "react";

const TAG_STYLES = {
  Work: "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-white",
  Personal: "bg-green-200 text-green-800 dark:bg-green-700 dark:text-white",
  Urgent: "bg-red-200 text-red-800 dark:bg-red-700 dark:text-white",
};

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const { id, title, description, completed, createdAt, tag, dueDate } = task;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);

  const formattedDate = new Date(createdAt).toLocaleString();

  const handleSave = () => {
    if (editTitle.trim() === "") {
      alert("Title cannot be empty");
      return;
    }

    onEdit(id, editTitle, editDesc);
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 rounded-lg border mb-4 transition-all shadow-sm ${
        completed
          ? "bg-green-100 dark:bg-green-800"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      {/* Top: Title + Toggle */}
      <div className="flex justify-between items-start sm:items-center gap-2">
        {isEditing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <h3
            className={`text-lg font-semibold break-words ${
              completed
                ? "line-through text-gray-600 dark:text-gray-400"
                : "text-gray-800 dark:text-white"
            }`}
          >
            {title}
          </h3>
        )}
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="w-5 h-5 shrink-0"
        />
      </div>

      {/* Tag Badge */}
      {tag && (
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded mt-2 ${TAG_STYLES[tag]}`}
        >
          {tag}
        </span>
      )}

      {/* Description */}
      <div className="mt-2">
        {isEditing ? (
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        ) : (
          description && (
            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300 break-words">
              {description}
            </p>
          )
        )}
      </div>

      {/* Dates */}
      <div className="mt-3 space-y-1 text-xs">
        <p className="text-gray-500 dark:text-gray-400">
          Created: {formattedDate}
        </p>
        {dueDate && (
          <p
            className={`${
              new Date(dueDate) < new Date() && !completed
                ? "text-red-600 dark:text-red-400 font-semibold"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Due: {new Date(dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4 text-sm">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:underline dark:text-green-400"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:underline dark:text-gray-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(id)}
              className="text-red-600 hover:underline dark:text-red-400"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
