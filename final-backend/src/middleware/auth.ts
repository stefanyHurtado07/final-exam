import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extensión del tipo Request para incluir `user`
export interface CustomRequest extends Request {
    user?: any; // Cambia `any` al tipo exacto si está definido
}

export const verificarToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Acceso denegado");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Token inválido");
    }
};
