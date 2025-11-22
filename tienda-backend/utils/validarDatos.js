/**
 * Función para validar campos de un objeto.
 * Retorna true si todos los campos requeridos existen y no están vacíos.
 * @param {Object} obj - Objeto a validar
 * @param {Array} campos - Lista de campos obligatorios
 */
const validarCampos = (obj, campos) => {
  for (let campo of campos) {
    if (!obj[campo] && obj[campo] !== 0) { // permite cero
      return false;
    }
  }
  return true;
};

/**
 * Validar que un número sea positivo
 * @param {number} numero
 */
const esNumeroPositivo = (numero) => {
  return typeof numero === 'number' && numero >= 0;
};

module.exports = {
  validarCampos,
  esNumeroPositivo
};
