import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks_users_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export const startDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: true});
        console.log("Se conecto a la base de datos");
    }
    catch(error){
        console.error("No se pudo conectar a la base de datos: ", error);
    }
};