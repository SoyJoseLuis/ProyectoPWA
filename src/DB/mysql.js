const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        }else{
            console.log('DB CONECTADA!!');
        }
    });

    conexion.on('error', err =>{
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}
conMysql();

const prueba = {
    id: 1,
    nombre: 'Juan',
    edad: 43
}

function todos(tabla){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result)=>{
            if(error) return reject(error); 
            resolve(result);
        })
    })
}

function uno(tabla, id){

    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })

}

function agregar(tabla, data){

    return new Promise( (resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data],  (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}


function eliminar(tabla, data){

    return new Promise( (resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id,  (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function query(tabla, consulta){

    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta,  (error, result)=>{
            if(error) return reject(error);
            resolve(result[0]);
        })
    })
}

function obtenerGastosPorUsuario(id_usuario) {
    return new Promise((resolve, reject) => {
        conexion.query(
            'SELECT id_gasto, glosa, monto FROM gastos WHERE id_usuario = ?', 
            [id_usuario], 
            (error, results) => {
                if (error) return reject(error);
                resolve(results); // results será un array de objetos { glosa, monto }
            }
        );
    });
}

function obtenerFotosPorGasto(id_gasto) { 
    return new Promise((resolve, reject) => {
        conexion.query(
            'SELECT id_gasto, foto FROM fotos_gastos WHERE id_gasto = ?', 
            [id_gasto], 
            (error, results) => {
                if (error) return reject(error);
                resolve(results); // results será un array con las fotos asociadas
            }
        );
    });
}




module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    query,
    obtenerGastosPorUsuario,
    obtenerFotosPorGasto,
}




// LLEGANDO ACÁ EJECTUAMOS LA FUNCIÓN CON EL PARÁMETRO RECIBIDO, QUE ES EL NOMBRE DE NUESTRA TABLA, QUE ES CLIENTES. por lo que EJECUTAMOS LA
// CONSULTA DE SQL Y DEVUELVE TODOS LOS CLIENTES EN LAS BASE DE DATOS

// NOS PREGUNTABAMOS POR QUÉ HABÍA UNA PROMESA Y ESTA ES LA RESPUESTA: La razón principal por la que usamos una Promesa en mysql.js es 
// porque la consulta a la base de datos toma tiempo en ejecutarse.
//Si intentamos retornar los resultados de una consulta sin una Promesa, el código no esperaría la respuesta de MySQL y seguiría 
// ejecutándose, lo que podría provocar que devolvamos undefined o errores.
//El problema: conexion.query() es una función asíncrona, lo que significa que no devuelve resultados inmediatamente.
//Una Promesa es un objeto que representa una operación que aún no ha terminado, pero que lo hará en el futuro.



//EXPLICACIÓN DEL WHERE ID ?:
//  Usar ? en la consulta es una forma de decirle a MySQL: "Voy a pasar un valor para este lugar más adelante, pero no 
// lo pondré directamente en la consulta por razones de seguridad".
//El valor data.id es el que se va a reemplazar en el ?.
