import {body, param } from "express-validator";
import {perfilModel} from "../models/perfil.model.js";

// valido el id
export const perfilIdValidation = [
    param("id")
    // que sea valido
    .isInt({min: 1}).withMessage("El id debe ser un numero rntero positivo")
    // que exista el id
    .custom(async(id)=> {
        const perfil = await perfilModel.findByPk(id);
        if (!perfil) throw new Error("El perfil no existe");
        return true;
    }),
];

// valido la creacion de un nuevo perfil
export const createPerfilValidation = [
    // el nombre no debe estar vacio y con caracteres min 2 max 100
    body("name")
        .notEmpty().withMessage("El nombre no debe ser vacio")
        .isLength({min:2, max:100}).withMessage("Los caracteres del nombre deben ser 2 minimo y 100 maximo"),
        // username no puede estar vacio, min 2 max 100
    body("username")
        .notEmpty().withMessage("El username no debe ser vacio")
        .isLength({min:2, max:100}).withMessage("Los caracteres del username deben ser 2 minimo y 100 maximo")
        // valido que ese username ya exista
        .custom(async(username) =>{
            const existe = await perfilModel.findOne({where: {username}});
            if(existe) throw new Error("El username ya esta en uso");
            return true;
        }),
];

export const updatePerfilValidation = [
    body("name")
    // .optional para que el rellenar los campos solo sea una opcion y no estricto
        .optional()
        .notEmpty().withMessage("El nombre no debe ser vacio")
        .isLength({min:2, max:100}).withMessage("Los caracteres del nombre deben ser 2 minimo y 100 maximo"),
    body("username")
        .optional()
        .notEmpty().withMessage("El username no debe ser vacio")
        .isLength({min:2, max:100}).withMessage("Los caracteres del username deben ser 2 minimo y 100 maximo")
        .custom(async(username, {req}) =>{
            // valida si eciste un perfil con ese username y si no es el mismo que esta cambiando ahora
            const existe = await perfilModel.findOne({where: {username}});
            if(existe && existe.id !== Number(req.params.id)) {
                throw new Error("El username ya esta en uso");
            }
            return true;
        }),
];