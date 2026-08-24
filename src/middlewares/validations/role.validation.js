import {body, param } from "express-validator";
import {roleModel} from "../models/role.model.js";

export const roleIdValidation = [
    param("id")
    .isInt({min: 1}).withMessage("El id debe ser un numero rntero positivo")
    .custom(async(id)=> {
        const role = await roleModel.findByPk(id);
        if (!role) throw new Error("El rol no existe");
        return true;
    }),
]; 

export const createPerfilValidation = [
    body("rolename")
        .notEmpty().withMessage("El rolename no debe ser vacio")
        .isLength({min:2, max:100}).withMessage("Los caracteres del rolename deben ser 2 minimo y 100 maximo")
        // valido si no tiene simbolos raros
        .custom((value)=>{
            if(!/^[a-zA-Z0-9_]+$/.test(value)){
                throw new Error("El rolename solo puede contener letras, numeros y guion bajo");
            }
            return true;
        })
        .custom(async(rolename)=> {
            const existe = await roleModel.findOne({where: {rolename}});
            if (existe) throw new Error("Ese rol ya existe");
            return true;
        }),
];

export const updatePerfilValidation = [
    body("rolename")
        .optional()
        .notEmpty().withMessage("El rolename no debe ser vacio")
        .isLength({min:2, max:100}).withMessage("Los caracteres del rolename deben ser 2 minimo y 100 maximo")
        .custom(async(rolename, {req}) =>{
            const existe = await roleModel.findOne({where: {rolename}});
            if(existe && existe.id !== Number(req.params.id)) {
                throw new Error("El role ya esta en existe");
            }
            return true;
        }),
];