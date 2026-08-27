import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const perfilModel = sequelize.define(
    "Perfil",
    {
        name: { 
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }
)