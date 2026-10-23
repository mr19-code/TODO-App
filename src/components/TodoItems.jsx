import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick, onToggleComplete }) => {
  return (
    <div className="space-y-3">
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoDate={item.dueDate}
          todoName={item.name}
          completed={item.completed}
          onDeleteClick={() => onDeleteClick(item.id)}
          onToggleComplete={() => onToggleComplete(item.id)}
        />
      ))}
    </div>
  );
};

export default TodoItems;
