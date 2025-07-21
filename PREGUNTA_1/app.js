const express = require('express')
const mysql = require ('mysql2');
const bodyparser = require ('body-parser');
const cors = require ('cors');

const PORT = 3000

const app = express()

app.use(cors())
app.use(bodyparser.json())

// Cambiar las credenciales para que se conecte a la BD

//conexion a la BD
//mysql:
// //root:
// FegCFkxeXrkUNPZTtigTzNjdokGVomIC@
// shuttle.proxy.rlwy.net:
// 29601/
// railway
const connection = mysql.createConnection({
    user: 'root',
    host: 'shuttle.proxy.rlwy.net',
    password: 'FegCFkxeXrkUNPZTtigTzNjdokGVomIC',
    database: 'railway',
    port: 29601,
    insecureAuth: true
})

connection.connect(err => {
    if  (err) throw err;
    console.log('Conectado a la base de datos')
})

app.get('producto-database', (req, res) => {
    const query = 'Select * from productos';
    connection.query(query, (err, result) => {
        if (err) throw err
        res.json(result)
    })
})


const productos = [
    {
        id: "pro-1",
        nombre: "Laptop Asus TUF Gaming F15",
        marca: "ASUS",
        precio: 6500,
    },
    {
        id: "pro-2",
        nombre: "Teclado logi",
        marca: "logi",
        precio: 50,
    }
]


app.get('/listar-productos', (req, res) => {
    res.send(productos)
})

app.post('/crear-productos', (req, res) => {
    const { body } = req
    const { id, nombre, marca, precio} = body

    const existe = productos.some((p) => p.id === id);
    if (existe) {
        return res.status(400).send("Ya existe un producto con ese ID");
    }

    productos.push({
        id, nombre, marca, precio
    })

    res.send("Producto registrado exitosamente")
})


app.put('/actualizar-productos/:id', (req, res) => {
    const { body, params} = req
    const { id } = params
    const { nombre, marca, precio} = body

    const producto = productos.find((p) => p.id == id)

    producto.nombre = nombre
    producto.marca = marca
    producto.precio = precio

    res.send("Producto actualizado exitosamente")
})

app.delete('/eliminar-producto/:id', (req, res) =>{
    const { id } = req.params;

    const productoIndex = productos.findIndex((p) => p.id === id)

    productos.splice(productoIndex, 1);
    
    res.send("El producto ha sido eliminado exitosamente")
})

app.listen(PORT, ()=>{
    console.log("Mi servidor esta corriendo en el puerto:", PORT)
})

