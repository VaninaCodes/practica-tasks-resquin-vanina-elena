import { Router } from "express";
import {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.get("/", getAllTask);
taskRouter.get("/:id", getTaskById);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);