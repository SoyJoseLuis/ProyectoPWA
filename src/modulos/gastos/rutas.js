const express = require('express');

const respuestas = require('../../red/respuestas');
const controlador = require('./index'); // cambiamos la ruta de conrolador a index porque hicimos un cambio para que 
//nos podeamos conectar a cualquier bdd

const router = express.Router();

//POST
router.post('/agregar', agregar);
//GET
router.get('/ver', ver);

//TOKEN
const jwt = require('jsonwebtoken');



async function agregar(req, res, next) {

   const token = req.headers.authorization?.split(' ')[1];  // Obtener el token del encabezado
   if (!token) {
       return res.status(401).json({ mensaje: "No autorizado" });
   }
   console.log("TOKEN DE USUARIO--->", token);

    try {
        
        const decoded = jwt.verify(token, 'notasecreta!');
        const id_usuario = decoded.id
        console.log("ESTE ES EL USUARIO DE VERDAD--->", id_usuario);

        
        const { glosa, monto, fotos } = req.body;  // Desestructuramos los datos recibidos, incluyendo la foto (base64)
        
        if (!fotos) {
            return respuestas.error(req, res, 'Foto es obligatoria', 400);
        }

        const gasto = await controlador.agregar({ glosa, monto, id_usuario });

        // Si hay fotos, las procesamos
        if (fotos && fotos.length > 0) {
        for (let foto of fotos) {
            await controlador.agregarFoto(gasto.id, foto); // Asociamos la foto con el id_gasto
        }
        }
        
        respuestas.success(req, res, gasto, 201);
    } catch (err) {
        console.error("Error al verificar el token:", err);
        return res.status(401).json({ mensaje: "Token inválido" });
    }
};


async function ver(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];  // Obtener el token del encabezado
    if (!token) {
        return res.status(401).json({ mensaje: "No autorizado" });
    }

    try {
        const decoded = jwt.verify(token, 'notasecreta!');
        const id_usuario = decoded.id;
        console.log("ESTE ES EL USUARIO DE VERDAD--->", id_usuario);

        const gastos = await controlador.obtenerGastos(id_usuario);

        let fotos = [];
        for (const gasto of gastos) {
            const fotosGasto = await controlador.obtenerFotos(gasto.id_gasto); // Llamamos a la función con id_gasto
            fotos.push(...fotosGasto); // Agregamos las fotos encontradas
        }

        //console.log("FOTOS OBTENIDAS:---->", fotos);



        
        respuestas.success(req, res, { gastos, fotos }, 200);
    } catch (err) {
        console.error("Error al verificar el token:", err);
        return res.status(401).json({ mensaje: "Token inválido" });
    }

}



















module.exports = router;






























//RUTAS.JS SE EJECUTARÁN BAJO /API/CLIENTES....  POR EJEMPLO, SI COLOCAN /API/CLIENTES/ EJECUTAREMOS LA FUNCIÓN TODOS()
// SI COLOCAN /APIC/CLIENTES/:ID EJECUTAMOS UNO(REQ.PARAMS.ID) O SI EJECUTAN /api/clientes/ → Ejecuta la función eliminar(req.body).
// SIGUIENDO CON ELE EJMPLO, SI USA /API/CLIENTES/ USARÍAMOS LA FUNCIÍN TODOS(REQ,RES) EL CUAL NOS LLEVARÍA AL CONTROLADOR GRACIAS A ESTAREMOS
//LINEA DE CÓDIGO "const items = await controlador.todos()"..... --->