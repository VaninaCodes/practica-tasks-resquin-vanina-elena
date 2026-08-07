import express from "express";
import { startDB } from "./src/config/database.js";
// import { taskRoutes } from "./src/routes/task.routes.js";
// import { userRoutes } from "./src/routes/user.routes.js";

const app = express();
const PORT = 3001;

app.use(express.json());

// app.use("/api", taskRoutes);
// app.use("/api", userRoutes);

app.listen(PORT, async () => {
    await startDB();
    console.log(`Servidor listo http://localhost:${PORT}`);
});