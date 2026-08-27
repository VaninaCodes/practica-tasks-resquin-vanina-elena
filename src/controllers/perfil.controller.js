import { perfilModel } from "../models/perfil.model.js";
import { userModel } from "../models/user.model.js";

export const getAllPerfiles = async (req, res) => {
    try{
        const perfiles = await perfilModel.findAll({
            include: { model: userModel, as: "user", attributes: ["id", "name", "email"] }
        });
        return res.status(200).json(perfiles);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const getPerfilById = async (req, res) => {
    try{
        const perfil = await perfilModel.findByPk(req.params.id, {
            include: { model: userModel, as: "user", attributes: ["id", "name", "email"] }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const createPerfil = async (req, res) => {
    try{
        const { name, username } = req.body;
        const newPerfil = await perfilModel.create({ name, username });
        res.status(201).json({message: "Perfil creado!", perfil: newPerfil});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const updatePerfil = async (req, res) => {
    try{
        const existente = await perfilModel.findByPk(req.params.id);
        if (!existente){
            return res.status(404).json({message: "Perfil no encontrado"});
        }
        await perfilModel.update(req.body, { where: { id: req.params.id } });
        const updated = await perfilModel.findByPk(req.params.id);
        res.json(updated);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

export const deletePerfil = async (req, res) => {
    try{
        const deleted = await perfilModel.destroy({ where: { id: req.params.id } });
        if (deleted) res.json({message: "Perfil eliminado!"});
        else res.status(404).json({message: "Perfil no encontrado"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};