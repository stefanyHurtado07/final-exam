import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acceso denegado.");

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = verificado;
    next();
  } catch (err) {
    res.status(400).send("Token no válido.");
  }
};

export const verificarAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.rol !== "admin") return res.status(403).send("Acceso denegado. No eres administrador.");
  next();
};
