import {body, param} from "express-validator";
import {taskModel} from "..models/task.model.js";
import {userModel} from "../models/user.model.js";

export const taskIdValidation = [
    param("id")
    .isInt({min: 1}).withMessage("El id debe ser un numero rntero positivo")
    .custom(async(id)=> {
        const task = await taskModel.findByPk(id);
        if (!task) throw new Error("La tarea no existe");
        return true;
    }),
]; 

export const createTaskValidation = [
    body("title")
        .notEmpty().withMessage("El titulo no debe ser vacio")
        .isLength({min:2, max:100}).withMessage("Los caracteres del titulo deben ser 2 minimo y 100 maximo")
        .custom(async(title)=>{
            const existe = await taskModel.findOne({where: {title}});
            if (existe) throw new Error("Ya existe una tarea con ese titulo");
            return true;
        }),
    body("description")
        .notEmpty().withMessage("La descripcion no debe ser vacio")
        .isLength({min:2, max:100}).withMessage("Los caracteres de la dedscripcion deben ser 2 minimo y 100 maximo"),
    body("user_id")
        .notEmpty().withMessage("El user_id no debe ser vacio")
        .isInt({min:1}).withMessage("El user_id debe ser un numero entero positivo")
        .custom(async(user_id)=> {
            const user = await userModel.findByPk(user_id);
            if (!user) throw new Error("No se puede crear la tarea sin un usuario");
            return true;
        }),
];

export const updateTaskValidation = [
    body("title")
        .optional()
        .notEmpty().withMessage("El titulo no debe ser vacio")
        .isLength({min:2, max:100}).withMessage("Los caracteres del titulo deben ser 2 minimo y 100 maximo")
        .custom(async(title, {req})=>{
            const existe = await taskModel.findOne({where: {title}});
            if (existe && existe.id !== Number(req.params.id)) {
                throw new Error("Ya existe una tarea con ese titulo");
            }
            return true;
        }),
    body("description")
        .optional()
        .notEmpty().withMessage("La descripcion no debe ser vacio")
        .isLength({min:2, max:100}).withMessage("Los caracteres de la dedscripcion deben ser 2 minimo y 100 maximo"),
    body("isComplete")
        .optional()
        .isBoolean().withMessage("isComplete dedbe ser true o false"),
    body("user_id")
        .optional()
        .isInt({min:1}).withMessage("El user_id debe ser un numero entero positivo")
        .custom(async(user_id)=> {
            const user = await userModel.findByPk(user_id);
            if (!user) throw new Error("No se puede crear la tarea sin un usuario");
            return true;
        }),
];