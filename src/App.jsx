import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import { useEffect, useState } from "react";
import {
  addItemToServer,
  deleteItemFromServer,
  getItemsFromServer,
  markItemCompletedOnServer,
} from "./services/itemsService";
import "./App.css";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemsFromServer().then((initialItems) => {
      // Add completed property if it doesn't exist
      const itemsWithCompletedStatus = initialItems.map((item) => ({
        ...item,
        completed: item.completed || false,
      }));
      setTodoItems(itemsWithCompletedStatus);
    });
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const item = await addItemToServer(itemName, itemDueDate);
    const newItem = { ...item, completed: false };
    setTodoItems((prevItems) => [...prevItems, newItem]);
    return newItem;
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    setTodoItems((prevItems) => prevItems.filter((item) => item.id !== deletedId));
    return deletedId;
  };

  const handleToggleComplete = async (id) => {
    const updatedItem = await markItemCompletedOnServer(id);
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem, completed: true } : item,
      ),
    );
    return updatedItem;
  };

  // Sort items: incomplete items first, then completed items
  const sortedItems = [...todoItems].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-[0_20px_60px_rgba(79,70,229,0.12)] backdrop-blur-sm">
          <div className="p-6 sm:p-8">
            <AppName />
            <AddTodo onNewItem={handleNewItem} />
            {todoItems.length === 0 && <WelcomeMessage />}
            <TodoItems
              todoItems={sortedItems}
              onDeleteClick={handleDeleteItem}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;