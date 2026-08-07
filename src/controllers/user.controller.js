import { userModel } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try{
        const user = await User.findAll();

        return res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const getUserById = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
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
        const { name, email, password } = req.body;
        // validacion
        if (!name || !email || !password){
            return res.status.json({message: "Debe completar todos los campos"})
        }
        const newUser = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json({message: "User creado!", user});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const updateUser = async (req, res) => {
    try{
        const updated = await User.update(req.body, {
            where: { id: req.params.id},
        });
        //validaciones
        if (updated){
            const updateUser = await User.findByPk(req.params.id);
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
        const deleted = await User.destroy({where: { id: req.params.id}});
       //validacion
       if (deleted) res.json({message: "User eliminado!"});
       else res.status(404).json({message: "User no encontrado"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};