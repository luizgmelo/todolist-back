import Router from "express";
import {testTask, listTasks, createTask, updateTask, deleteTask } from "./controllers/taskController.js";

const router = Router();

router.get("/", testTask);
router.get("/tasks", listTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
