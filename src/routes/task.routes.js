import { Routes } from "express";
import {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from "../controllers/task.controller.js";

export const taskRoutes = Routes();

taskRoutes.get("/", getAllTask);
taskRoutes.get("/:id", getTaskById);
taskRoutes.post("/", createTask);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);