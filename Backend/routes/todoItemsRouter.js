// External Module
const express = require("express");
const todoItemsRouter = express.Router();

// Local Module
const todoItemsController = require("../controllers/todoItemsController");
todoItemsRouter.post("/", todoItemsController.createTodoItem);
todoItemsRouter.get("/", todoItemsController.getTodoItems);
todoItemsRouter.delete("/:id", todoItemsController.deleteTodoItem);
todoItemsRouter.put("/:id/completed", todoItemsController.markCompleted);

module.exports = todoItemsRouter;
