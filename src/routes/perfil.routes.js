import { Router } from "express";
import {
    getAllPerfiles,
    getPerfilById,
    createPerfil,
    updatePerfil,
    deletePerfil,
} from "../controllers/perfil.controller.js";

export const perfilRouter = Router();

perfilRouter.get("/", getAllPerfiles);
perfilRouter.get("/:id", getPerfilById);
perfilRouter.post("/", createPerfil);
perfilRouter.put("/:id", updatePerfil);
perfilRouter.delete("/:id", deletePerfil);