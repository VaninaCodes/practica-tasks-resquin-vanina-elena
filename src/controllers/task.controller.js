import { taskModel } from "../models/task.model.js";

export const getAllTask = async (req, res) => {
    try{
        const task = await taskModel.findAll();

        return res.status(200).json(task);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const getTaskById = async (req, res) => {
    try{
        const task = await taskModel.findByPk(req.params.id);
        //validacion
        if (task) res.json(task);
        else res.status(404).json({message: "Tarea no encontrada"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const createTask = async (req, res) => {
    try{
        const { title, description, user_id } = req.body;
        // validacion
        if (!title || !description){
            return res.status.json({message: "Debe completar los campos titulo y descripcion"})
        }
        const newTask = await taskModel.create({
            title,
            description,
            user_id,
        });

        res.status(201).json({message: "Tarea creada!", task: newTask});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const updateTask = async (req, res) => {
    try{
        const updated = await taskModel.update(req.body, {
            where: { id: req.params.id},
        });
        //validaciones
        if (updated){
            const updateTask = await taskModel.findByPk(req.params.id);
            res.json(updateTask);
        }
        else{
            res.status(404).json({message: "Tarea no encontrado"});
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

export const deleteTask = async (req, res) => {
    try{
        const deleted = await taskModel.destroy({where: { id: req.params.id}});
       //validacion
       if (deleted) res.json({message: "Tarea eliminada!"});
       else res.status(404).json({message: "Tarea no encontrada"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};