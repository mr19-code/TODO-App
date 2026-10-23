function TodoItem({
  id,
  todoName,
  todoDate,
  completed,
  onDeleteClick,
  onToggleComplete,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border p-4 shadow-sm transition-all duration-200 sm:flex-row sm:items-center sm:justify-between ${
        completed
          ? "border-gray-200 bg-gray-50/80"
          : "border-violet-100 bg-white hover:shadow-md"
      }`}
    >
      <div className="flex items-center sm:flex-1">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleComplete(id)}
          className="mr-3 h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
        />
        <span
          className={`text-base font-semibold ${
            completed ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {todoName}
        </span>
      </div>

      <div className="text-sm font-medium text-gray-500 sm:w-44 sm:text-right">
        {formatDate(todoDate)}
      </div>

      <button
        type="button"
        className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-100"
        onClick={() => onDeleteClick(id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
