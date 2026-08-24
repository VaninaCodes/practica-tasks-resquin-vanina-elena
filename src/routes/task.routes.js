import { Router } from "express";
import {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from "../controllers/task.controller.js";

import{
    taskIdValidation,
    createTaskValidation,
    updateTaskValidation,
} from "../middlewares/validations/task.validation.js";
import { validate } from "../middlewares/validation.middleware.js";

export const taskRouter = Router();

taskRouter.get("/", getAllTask);
taskRouter.get("/:id", taskIdValidation, validate, getTaskById);
taskRouter.post("/", createTaskValidation, validate, createTask);
taskRouter.put("/:id", taskIdValidation, updateTaskValidation, validate, updateTask);
taskRouter.delete("/:id", taskIdValidation, validate, deleteTask);