
//TOKEN
const jwt = require('jsonwebtoken');

//BORRAR ESO NO FUNCIONA



async function verificacion(req, res, next) {

   const token = req.headers.authorization?.split(' ')[1];  // Obtener el token del encabezado
   if (!token) {
       return res.status(401).json({ mensaje: "No autorizado" });
   }
   console.log("TOKEN DE USUARIO--->", token);

    try {
        
        const decoded = jwt.verify(token, 'notasecreta!');
        const id_usuario = decoded.id
        console.log("ESTE ES EL USUARIO DE VERDAD--->", id_usuario);

        
        respuestas.success(req, res, gasto, 201);
    } catch (err) {
        console.error("Error al verificar el token:", err);
        return res.status(401).json({ mensaje: "Token inválido" });
    }
};


module.exports = verificacion;