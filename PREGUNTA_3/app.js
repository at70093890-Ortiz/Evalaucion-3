const express = require('express')
const PORT = 3000

const app = express();

app.use(express.json())

const citas = [
    {
        idCita: "CITA001",
        dniPaciente: "12345678",
        nombrePaciente: "Juan Pérez",
        fecha: "2025-07-25",
        hora: "09:30",
        especialidad: "Dermatología",
        medico: "Dra. García",
        motivoConsulta: "Revisión de lunares"
    }
]

app.get('/listar-citas', (req, res) => {
    res.send(citas)
})

app.post('/crear-citas', (req, res) => {
    const { body } = req
    const { idCita, dniPaciente, nombrePaciente, fecha, hora, especialidad, medico, motivoConsulta} = body

    citas.push({
        idCita, dniPaciente, nombrePaciente, fecha, hora, especialidad, medico, motivoConsulta
    })

    res.send("La cita se ha registrado correctamente")
})

app.put('/actualizar-citas/:id', (req, res) => {
    const { body, params} = req
    const { id } = params
    const { nombrePaciente, dniPaciente, fecha, hora, especialidad, medico, motivoConsulta} = body

    const cita = citas.find((p) => p.id == id)

    cita.nombrePaciente = nombrePaciente
    cita.dniPaciente = dniPaciente
    cita.fecha = fecha
    cita.hora = hora
    cita.especialidad = especialidad
    cita.medico = medico
    cita.motivoConsulta = motivoConsulta

    res.send("Cita actualizada correctamente")
})

app.delete('/eliminar-cita/:id', (req, res) =>{
    const { id } = req.params;

    const citaIndex = citas.findIndex((p) => p.id === id)

    citas.splice(citaIndex, 1);
    
    res.send("Cita eliminada exitosamente")
})

app.listen(PORT, ()=>{
    console.log("mi servidor esta corriendo en el puerto:", PORT)
})

