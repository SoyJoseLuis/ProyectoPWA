const express = require('express');
const morgan = require('morgan');

const config = require('./config');

const clientes = require('./modulos/clientes/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const auth = require('./modulos/auth/rutas');

const registrarGastos = require('./modulos/gastos/rutas')

const verGasto = require('./modulos/gastos/rutas')


const error = require('./red/errors');

const app = express();


//IMPORTACIONES


//Middleware
app.use(morgan('dev'));
/*ESTE ES EL NUEVO ---> */ app.use(express.json({ limit: '50mb' })); // Aumentar el límite de tamaño 
/*ESTE ES EL NUEVO ---> */ app.use(express.urlencoded({ extended: true, limit: '50mb' }));  

//Configuración 
app.set('port', config.app.port)

//HAbilitación de Ccors
const cors = require('cors');
//Ahora si la habilitamos
app.use(cors());


//rUTas

app.use('/api/clientes', clientes)
app.use('/api/usuarios', usuarios)
app.use('/api/auth', auth)

app.use('/api/gastos', registrarGastos)

app.use('/api/gastos', verGasto)



/*const JWT_SECRET = process.env.JWT_SECRET_KEY;  // Tu clave secreta en el .env
app.get("/verificar-token", (req, res) => {
    //const token = req.cookies.token;  // Leer el token desde las cookies
    const token = req.headers.authorization?.split(' ')[1];  // Obtener el token del encabezado
    console.log("ESTE ES EL TOKEN O COOKIE--->", token);
    if (!token) {
        return res.json({ valido: false });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ valido: false });
        }
        res.json({ valido: true, usuario: decoded });
    });
}); */



app.use(error); // SI EN RUTAS USAMOS NEXT() NOS DIRIGIRIAMOS A LA RUTA DE ERROR QUE ESTÁ EN "const error = require('./red/errors')"

module.exports = app;


// ACÁ DICE QUE SI "app.use('/api/clientes', clientes)" USAMOS LA RUTA /API/CLIENTES, TENDREMOS QUE USAR EL MODULO "CLIENTES" PARA MANEJARLA
//ENTONCES EXPRESS REDIRIGIRÁ LA SOLICITUD AL MÓDULO CLIENTES QUE EN ESTE CASO ES RUTAS.JS, ESO SIGNIFICA QUE TODAS LAS RUTAS DENTRO DE 
//RUTAS.JS SE EJECUTARÁN BAJO /API/CLIENTES....  --->