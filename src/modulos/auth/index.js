// EN ESTE CASO LO QUE HACE ESTE ARCHIVO ES PROVEER LA CONEXIÓN DE LA BDD  AL CONTROLADOR


const db = require('../../DB/mysql'); // Primero, se importa la base de datos (db) desde el archivo mysql.js usando require('../../DB/mysql').
const ctrl = require('./controlador'); // Luego, se importa el controlador (controlador.js) con require('./controlador').

module.exports = ctrl(db);  // Lo que haces con ctrl(db) es llamar a la función exportada en controlador.js y pasarle db como argumento.
//¿Por qué module.exports en index.js?
//Porque en index.js estás haciendo un proceso intermedio: llamas a la función exportada desde controlador.js, pasándole la base 
// de datos, y luego exportas el resultado de esa llamada (que es el objeto con las funciones). De esta forma, otros archivos pueden 
//  acceder al objeto que regresa, no a la función directamente.

