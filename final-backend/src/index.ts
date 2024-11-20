import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import organoRoutes from "./routes/organos";
import usuarioRoutes from "./routes/usuarios";

dotenv.config(); // Cargar variables de entorno

const app = express();

// Middleware global
app.use(express.json());

// Rutas
app.use("/api/organos", organoRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ error: "Algo salió mal en el servidor. Intenta nuevamente." });
});

// Conexión a la base de datos y arranque del servidor
const startServer = async () => {
    try {
        await createConnection();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        process.exit(1);
    }
};

startServer();
