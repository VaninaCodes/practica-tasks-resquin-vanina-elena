import { roleModel } from "../models/role.model.js";
import { userModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const getAllRoles = async (req, res) => {
    try{
        const roles = await roleModel.findAll({
            include: { model: userModel, as: "users", attributes: ["id", "name", "email"] }
        });
        return res.status(200).json(roles);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const getRoleById = async (req, res) => {
    try{
        const role = await roleModel.findByPk(req.params.id, {
            include: { model: userModel, as: "users", attributes: ["id", "name", "email"] }
        });
        if (role) res.json(role);
        else res.status(404).json({message: "Rol no encontrado"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const createRole = async (req, res) => {
    try{
        // const { rolename } = req.body;
        // const newRole = await roleModel.create({ rolename });
        const validatedData = matchedData(req.body);
        const newRole = await roleModel.create(validatedData);
        res.status(201).json({message: "Rol creado!", role: newRole});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const updateRole = async (req, res) => {
    try{
        // const existente = await roleModel.findByPk(req.params.id);
        // if (!existente){
        //     return res.status(404).json({message: "Rol no encontrado"});
        // }
        // await roleModel.update(req.body, { where: { id: req.params.id } });
        // const updated = await roleModel.findByPk(req.params.id);
        // res.json(updated);
        const validatedDataBody = matchedData(req, {locations:["body"]});
        const {id} = matchedData(req, {locations: ["params"]});
        const existente = await roleModel.findByPk(id);
            if(!existente){
                res.status(404).json({message: "Rol no encontrado"});
            }
        await existente.update(validatedDataBody);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

export const deleteRole = async (req, res) => {
    // try{
    //     const deleted = await roleModel.destroy({ where: { id: req.params.id } });
    //     if (deleted) res.json({message: "Rol eliminado!"});
    //     else res.status(404).json({message: "Rol no encontrado"});
    // }
    // catch(error){
    //     res.status(500).json({error: error.message});
    // }
    try{
        const existente = await roleModel.findByPk(id);
        if (!existente){
            return res.status(404).json({message: "No se encuentra el rol con ese id"});
        }
        await existente.destroy();
        return res.status(200).json({message: "Rol eliminado!"});
    }
    catch(error){
        res.status(500).json({message: "Error interno del servidor :c"});
    }
};