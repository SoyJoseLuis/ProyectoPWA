const express = require('express');

const respuestas = require('../../red/respuestas');
const controlador = require('./index'); // cambiamos la ruta de conrolador a index porque hicimos un cambio para que 
//nos podeamos conectar a cualquier bdd

const router = express.Router();

//GET
router.post('/login', login);

async function login (req, res, next){
    try{
        const token = await controlador.login(req.body.usuario, req.body.password);

        // 🔹 Guardar el token en una cookie HTTP-Only
        res.cookie("token", token, {
            httpOnly: true, // Evita acceso desde JavaScript
            secure: false,  // Cambiar a true en producción con HTTPS
            sameSite: "Lax" // Controla el envío de la cookie entre sitios
        });  //ESTO ES NUEVO
        
        respuestas.success(req, res, token, 200);
    }catch(err){
        next(err);
    }
};

module.exports = router;
