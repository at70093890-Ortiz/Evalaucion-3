const mongoose = require("mongoose");

const citaSchema = new mongoose.Schema({
  idCita: { type: String, required: true, unique: true },
  dniPaciente: { type: String, required: true, unique: true },
  nombrePaciente: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  especialidad: { type: String, required: true },
  medico: { type: String, required: true },
  motivoConsulta: { type: String }
});

module.exports = mongoose.model("Citas", citaSchema);
