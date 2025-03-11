import express from "express";
//Fix para __dirname
import path from 'path';
import { fileURLToPath } from "url";


import cookieParser from "cookie-parser";  // Para leer cookies

const __dirname = path.dirname(fileURLToPath(import.meta.url));



//server
const app = express();
app.set("port", 3000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto: ", app.get("port"));

//configuración (principalmente fue para dejar archivos staticos, para el css)
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());  // Permite leer cookies

//PROTEGER RUTAS:
// Función para verificar si el usuario tiene un token válido

/*const verificarToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;  // Leer el token de las cookies
        //const token = localStorage.getItem('token');
        console.log("TOKEN DEL FRONT---->", token);
        if (!token) {
            return res.redirect("/");  // Si no hay token, redirigir al login
        }

        // Hacer una petición al backend para verificar si el token es válido
        const response = await fetch ("http://localhost:4000/verificar-token", {
            headers: { Authorization: `Bearer ${token}` }  // Enviar el token al backend
        });

        if (response.data.valido) {
            next();  // Si el token es válido, continuar con la petición
        } else {
            res.redirect("/");  // Si el token no es válido, redirigir al login
        }
    } catch (error) {
        console.error("Error verificando token:", error.message);
        res.redirect("/");  // En caso de error, redirigir al login
    }
};*/

/*const verificarToken = (req, res, next) => {
    const token = req.cookies.token; // 🔹 Lee la cookie 'token'
    console.log("TOKEN DEL FRONT---->", token); // ✅ Debug
    if (!token) {
        return res.redirect("/"); // 🔹 Si no hay token, redirigir al login
    }
    next();
}; */


//RUTAS
//END POINTS
app.get("/", (req,res)=>res.sendFile(__dirname + "/pages/login.html")) 
app.get("/register", (req,res)=>res.sendFile(__dirname + "/pages/register.html")) 
app.get("/home", (req,res)=>res.sendFile(__dirname + "/pages/home/home.html"))
app.get("/registrarGasto", /*verificarToken,*/ (req,res)=>res.sendFile(__dirname + "/pages/registrarGasto.html")) 
app.get("/verGasto", (req,res)=>res.sendFile(__dirname + "/pages/verGasto.html")) 



//Vamos a hacer un end point al get, que cuando se geteé solo la barra
//Le colocalmos qué es lo que va a apsar, le pasamos una flecha, con una req y res, y seleccionamos a la respuesta "res" Y enviamos archivo
// con "/pages/login.html"..... Peeero como hay un pequeño problema, asique le colcamos dirname, ya que colocamos typemodule en el package.json
//Si no lo hubieramos colocado no hay problema, pero como hicismos caso al video, nos pasa ese error, pero el trucito está en colocar el dirname
//ademas de importar lo de fix apra __dirname