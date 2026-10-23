import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <div className="mb-8 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter Todo Here"
            value={todoName}
            onChange={(event) => setTodoName(event.target.value)}
            className="w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-base text-gray-700 shadow-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            required
          />
        </div>

        <div className="md:w-56">
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-base text-gray-700 shadow-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <button
          type="button"
          className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
          onClick={async () => {
            if (!todoName.trim()) return;
            const created = await onNewItem(todoName.trim(), dueDate);
            if (created) {
              setTodoName("");
              setDueDate("");
            }
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
