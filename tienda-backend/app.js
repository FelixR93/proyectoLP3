const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarDB = require('./config/db');
const productoRoutes = require('./routes/productoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// Conexión a MongoDB
conectarDB(process.env.MONGO_URI);

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json()); // necesario para leer req.body

// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/proveedores', proveedorRoutes);

// Middleware de errores
app.use(errorHandler);

module.exports = app;
