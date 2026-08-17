import express from "express";
import { startDB } from "./src/config/database.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { perfilRouter } from "./src/routes/perfil.routes.js";
import { roleRouter } from "./src/routes/role.routes.js";

// // pruebas
// import { taskModel } from "./src/models/task.model.js";
// import { userRoleModel } from "./src/models/user_role.model.js";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use("/api/perfiles", perfilRouter);
app.use("/api/roles", roleRouter);

app.listen(PORT, async () => {
    await startDB();
    console.log(`Servidor listo http://localhost:${PORT}`);
});