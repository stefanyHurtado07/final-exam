import { Router } from "express";
import { getRepository } from "typeorm";
import { Organo } from "../entities/Organo";
import { verificarToken, CustomRequest } from "../middleware/auth";

const router = Router();

router.post("/crear", verificarToken, async (req: CustomRequest, res, next) => {
  try {
    const { tipo, donante, fechaDisponibilidad } = req.body;
    if (!tipo || !donante || !fechaDisponibilidad) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const nuevoOrgano = getRepository(Organo).create({
      tipo,
      donante,
      fechaDisponibilidad,
      proveedor: req.user,
    });

    const resultado = await getRepository(Organo).save(nuevoOrgano);
    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;

