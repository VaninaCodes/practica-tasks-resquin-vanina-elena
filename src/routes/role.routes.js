import { Router } from "express";
import {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
} from "../controllers/role.controller.js";

export const roleRouter = Router();

roleRouter.get("/", getAllRoles);
roleRouter.get("/:id", getRoleById);
roleRouter.post("/", createRole);
roleRouter.put("/:id", updateRole);
roleRouter.delete("/:id", deleteRole);