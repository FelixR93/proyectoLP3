const Producto = require('../models/Producto');
const { validarCampos, esNumeroPositivo } = require('../utils/validarDatos');

// Obtener todos los productos
const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// Crear un producto
const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, imagen } = req.body;

  // Validar campos obligatorios
  if (!validarCampos(req.body, ['nombre', 'descripcion', 'precio', 'stock'])) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Validar que precio y stock sean números positivos
  if (!esNumeroPositivo(precio) || !esNumeroPositivo(stock)) {
    return res.status(400).json({ message: 'Precio y stock deben ser números positivos' });
  }

  try {
    const producto = new Producto({ nombre, descripcion, precio, stock, imagen });
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
  const { id } = req.params;

  // Si el cuerpo incluye precio o stock, validarlos
  if (req.body.precio && !esNumeroPositivo(req.body.precio)) {
    return res.status(400).json({ message: 'Precio debe ser un número positivo' });
  }
  if (req.body.stock && !esNumeroPositivo(req.body.stock)) {
    return res.status(400).json({ message: 'Stock debe ser un número positivo' });
  }

  try {
    const producto = await Producto.findByIdAndUpdate(id, req.body, { new: true });
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByIdAndDelete(id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};

module.exports = { getProductos, crearProducto, actualizarProducto, eliminarProducto };
