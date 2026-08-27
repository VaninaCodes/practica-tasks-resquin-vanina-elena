import { Router } from "express";
import {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
} from "../controllers/role.controller.js";

import{
    roleIdValidation,
    createRoleValidation,
    updateRoleValidation,
} from "../middlewares/validations/role.validation.js";
import { validate } from "../middlewares/validation.middleware.js";

export const roleRouter = Router();

roleRouter.get("/", getAllRoles);
roleRouter.get("/:id", roleIdValidation, validate, getRoleById);
roleRouter.post("/", createRoleValidation, validate, createRole);
roleRouter.put("/:id", roleIdValidation, updateRoleValidation, validate,updateRole);
roleRouter.delete("/:id", roleIdValidation, validate, deleteRole);