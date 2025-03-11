//EXPLICACIÓN DE POR QUÉ SE HIZO TODO ESTE CAMBIO. EL CAMBIO FUE DE QUE PASAMOS DE USAR UNA BDD LOCAL A USAR CUALQUIER BDD QUE QUERAMOS
//¿CÓMO? Antes, exportabamos directamente las funciones. Ahora exportamos una función que recibe un parámetro dbInyectada. Por qué?
//Porque queremos que el controlador acepte cualquier bdd que le pasemos como argumento. Esto hace que el código sea más flexible.
//Si se pasa una base de datos (como dbInyectada), se usa esa.
// si no se pasa nada, se usa la base de datos predeterminada (mysql en este caso).

//VAMOS A INDEX.JS DE CARPETA CLIENTES... --->

const TABLA = 'usuario';
const auth = require('../auth');

module.exports = function (dbInyectada) { //EXPORTO LA FUNCIÓN QUE TOMARÁ COMO PARÁMETRO A LA BDD

    let db = dbInyectada;
    if(!db){
        db = require('../../DB/mysql');
    }

    function todos (){
        return db.todos(TABLA);
    }
    
    function uno (id){
        return db.uno(TABLA, id);
    }

    async function agregar (body){ //¿Dónde se define body? body no se define en el código directamente, sino que viene de req.body, desde rutas.js
        const nuevoUsuario = {
            usuario: body.usuario, 
            email: body.email,
        }

        // Insertamos el usuario en la tabla "usuario"
         const usuarioInsertado = await db.agregar(TABLA, nuevoUsuario); 

         // Tomamos el ID generado automáticamente
        const idUsuario = usuarioInsertado.insertId; 

        // Guardamos la contraseña en la tabla "auth" (ya encripta internamente)
         await auth.agregar({ id: idUsuario, usuario: body.usuario, password: body.password });

        return { mensaje: "Usuario registrado correctamente", id: idUsuario };


    }
    
    
    function eliminar (body){
        db.eliminar("auth", body);
        return db.eliminar(TABLA, body);
    }

    return{
        todos,
        uno,
        eliminar,
        agregar,
    }

}


// ACÁ EN EL CONTROLADOR, USARÍAMOS NUEVAMENTE TODOS(), PERO TENDRÍAMOS QUE RETONRAR UNA RESPUESTAS, Y ESA RESPUESTAS LA SACARÍAMOS DE mysql
// GRACIAS A LA LINEA DE CÓDIGO DE return db.todos(TABLA);, YA QUE NOMBRAMOS COMO DB A MYSQL GRACIAS A LA LINEA 
// DE CÓDIGO const db = require('../../DB/mysql');

// TENÍAMOS LA PREGUNTA DE POR QUE LE PASABAMOS EL PARÁMETRO DE TABLA A " return db.todos(TABLA);" Y ES PORQUE TABLA TIENE EL VALOR DE CLIENTES
// Y CLIENTES SE LLAMA NUESTRA TABLA QUE CREAMOS EN la base de datos