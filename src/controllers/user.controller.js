import { userModel } from "../models/user.model.js";
import { taskModel } from "../models/task.model.js";
import { perfilModel } from "../models/perfil.model.js";

export const getAllUsers = async (req, res) => {
    try{
        const user = await userModel.findAll({
            include: { 
                model: taskModel, 
                as: "tasks", 
                attributes: ["id", "title", "description", "isComplete"] 
            }
        });

        return res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const getUserById = async (req, res) => {
    try{
        const user = await userModel.findByPk(req.params.id, {
            include: { 
                model: taskModel, 
                as: "tasks", 
                attributes: ["id", "title", "description", "isComplete"] }
        });
        //validacion
        if (user) res.json(user);
        else res.status(404).json({message: "User no encontrado"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const createUser = async (req, res) => {
    try{
        const { name, email, password, perfil_id } = req.body;
        const newUser = await userModel.create({
            name,
            email,
            password,
            perfil_id 
        });

        return res.status(201).json({message: "User creado!", user:newUser});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
};

export const updateUser = async (req, res) => {
    try{
        const updated = await userModel.update(req.body, {
            where: { id: req.params.id},
        });
        //validaciones
        if (updated){
            const updateUser = await userModel.findByPk(req.params.id);
            res.json(updateUser);
        }
        else{
            res.status(404).json({message: "User no encontrado"});
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try{
        const existente = await userModel.findByPk(id);
        if (!existente){
            return res.status(404).json({message: "No se encuentra el usuario con ese id"});
        }
        await existente.destroy();
        return res.status(200).json({message: "Usuario eliminado!"});
    }
    catch(error){
        res.status(500).json({message: "Error interno del servidor :c"});
    }
};