const express = require("express");
const router = express.Router();
const Citas = require("../models/Citas");

router.post("/", async (req, res) => {
  try {     // si hay un error el programa sigue
    const cita = new Citas(req.body);
    await cita.save();
    res.status(201).json(cita);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const citas = await Citas.find();
    res.json(citas)
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const citas = await Citas.findById(req.params.id);
    if (!citas) return res.status(404).json({message: 'No se encontro la cita'})
    res.json(citas)
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// eliminar registro en base a un ID

router.delete("/:id", async (req, res) => {
    try {
        const deletedCita = await Citas.findByIdAndDelete(req.params.id);
        if (!deletedCita) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        res.json({ message: "Cita eliminada correctamente" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
