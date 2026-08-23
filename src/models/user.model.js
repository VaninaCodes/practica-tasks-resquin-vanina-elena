import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { perfilModel } from "./perfil.model.js";

export const userModel = sequelize.define( "User", {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false, 
    },
    perfil_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: "Perfils",
            key: "id",
        },
    },
});

// relacion uno a uno
// user-perfil
userModel.belongsTo(perfilModel, { foreignKey: "perfil_id", as: "owner"});

perfilModel.hasOne(userModel, {foreignKey: "perfil_id", as:"user"});