
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Usuario } from "../entities/Usuario";

const router = Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;
    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const usuarioExistente = await getRepository(Usuario).findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = getRepository(Usuario).create({
      nombre,
      email,
      contraseña: hashedPassword,
      rol: rol || "usuario",
    });

    const resultado = await getRepository(Usuario).save(nuevoUsuario);
    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar el usuario" });
  }
});

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    if (!email || !contraseña) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const usuario = await getRepository(Usuario).findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!validPassword) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.header("auth-token", token).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
});

export default router;
