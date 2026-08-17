import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { userModel } from "./user.model.js";
import { roleModel } from "./role.model.js";

export const userRoleModel = sequelize.define(
    "User_Role", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true,
        },
    },
);

// relacion muchos a muchos
// user-role
userModel.belongsToMany(roleModel, {
    through: userRoleModel,
    foreignKey: "user_id",
    as: "roles",
});

roleModel.belongsToMany(userModel, {
    through: userRoleModel,
    foreignKey: "role_id",
    as: "users",
});