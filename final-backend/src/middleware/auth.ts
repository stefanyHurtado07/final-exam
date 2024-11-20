import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: any;
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

export const verificarAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user?.rol !== "admin") {
    return res.status(403).send("Acceso denegado");
  }
  next();
};
