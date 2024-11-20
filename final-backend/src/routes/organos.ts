
import { Router } from "express";
import { getRepository } from "typeorm";
import { Organo } from "../entities/Organo";
import { verificarToken, verificarAdmin } from "../middleware/auth";

const router = Router();

// Crear un nuevo órgano
router.post("/crear", verificarToken, async (req, res) => {
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
    res.status(500).json({ mensaje: "Error al crear el órgano" });
  }
});

// Verificar un órgano
router.put("/verificar/:id", verificarToken, verificarAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const organo = await getRepository(Organo).findOne(id);
    if (!organo) return res.status(404).json({ mensaje: "Órgano no encontrado" });

    organo.verificado = true;
    const resultado = await getRepository(Organo).save(organo);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al verificar el órgano" });
  }
});

export default router;
