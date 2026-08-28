import { Router } from "express";
import {
    getAllPerfiles,
    getPerfilById,
    createPerfil,
    updatePerfil,
    deletePerfil,
} from "../controllers/perfil.controller.js";

import{
    perfilIdValidation,
    createPerfilValidation,
    updatePerfilValidation,
} from "../middlewares/validations/perfil.validation.js";
import { validate } from "../middlewares/validate.js";
export const perfilRouter = Router();

perfilRouter.get("/", getAllPerfiles);
perfilRouter.get("/:id", perfilIdValidation, validate, getPerfilById);
perfilRouter.post("/", createPerfilValidation, validate, createPerfil);
perfilRouter.put("/:id", perfilIdValidation, updatePerfilValidation, validate, updatePerfil);
perfilRouter.delete("/:id", perfilIdValidation, validate, deletePerfil);