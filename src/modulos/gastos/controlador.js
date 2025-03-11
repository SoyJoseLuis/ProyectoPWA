

const TABLA = 'gastos';
const auth = require('../auth');

module.exports = function (dbInyectada) { //EXPORTO LA FUNCIÓN QUE TOMARÁ COMO PARÁMETRO A LA BDD

    let db = dbInyectada;
    if(!db){
        db = require('../../DB/mysql');
    }

    

    async function agregar(body) {

        console.log("Datos recibidos en el backend:", body);
        console.log("Foto recibida en el backend:", body.foto);
        
        const nuevoGasto = {
            id_usuario: body.id_usuario, // Esto ya es el id_usuario del backend
            glosa: body.glosa,
            monto: body.monto,
            
        };
    
        // Insertamos el nuevo gasto en la base de datos
        const gastoInsertado = await db.agregar(TABLA, nuevoGasto);
        const idGasto = gastoInsertado.insertId;
    
        return { mensaje: "Gasto registrado correctamente", id: idGasto };
    }
    

    // Función para agregar una foto
    async function agregarFoto(idGasto, foto) {
    // Creamos el objeto para insertar la foto asociada al gasto
        const nuevaFoto = {
        id_gasto: idGasto,
        foto: foto
        };

        // Insertamos la foto en la tabla de fotos
        await db.agregar('fotos_gastos', nuevaFoto);  // 'fotos' es la tabla donde guardamos las fotos

    return { mensaje: "Foto registrada correctamente" };
    }





    async function obtenerGastos(id_usuario) {
        try {
            const gastos = await db.obtenerGastosPorUsuario(id_usuario);
            return gastos; //incluyendo el id_gastp
        } catch (err) {
            console.error("Error al obtener los gastos:", err);
            throw new Error('Error al obtener los gastos');
        }
    }
    
    async function obtenerFotos(id_gasto) {
        try {
            const fotos = await db.obtenerFotosPorGasto(id_gasto);
            return fotos;
        } catch (err) {
            console.error("Error al obtener las fotos:", err);
            throw new Error('Error al obtener las fotos');
        }
    }
    




    return{
        agregar,
        agregarFoto,
        obtenerGastos,
        obtenerFotos,
    }

}
