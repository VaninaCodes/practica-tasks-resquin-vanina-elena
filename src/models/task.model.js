import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { userModel } from "./user.model.js";

export const taskModel = sequelize.define( "Task", {
    title: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        default: false, 
    }
});

// relacion tarea-usuario
// una tarea pertenece a un usuario
taskModel.belongsTo(userModel, { foreignKey:"user_id", as: "user"});

// un usuario puede tener muchas tareas
userModel.hasMany(taskModel, {foreignKey:"user_id", as: "tasks"});