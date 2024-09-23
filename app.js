const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Arreglo para almacenar usuarios registrados
const users = [];

// Clave secreta para firmar el token
const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave más segura

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Ruta para registrar un usuario
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send('El usuario ya existe.');
    }

    // Agregar el nuevo usuario al arreglo
    users.push({ username, password });
    res.status(201).send(`Usuario ${username} registrado con éxito.`);
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar el usuario en el arreglo
    const user = users.find(user => user.username === username);

    // Verificar si el usuario existe y si la contraseña es correcta
    if (user && user.password === password) {
        // Generar el token
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: `Bienvenido, ${username}!`, token });
    } else {
        res.status(401).send('Credenciales inválidas.');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
