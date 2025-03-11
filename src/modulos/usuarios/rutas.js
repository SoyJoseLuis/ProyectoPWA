const express = require('express');

const respuestas = require('../../red/respuestas');
const controlador = require('./index'); // cambiamos la ruta de conrolador a index porque hicimos un cambio para que 
//nos podeamos conectar a cualquier bdd

const router = express.Router();

//GET
router.get('/', todos);   
router.get('/:id', uno);

//POST
//router.post('/', agregar);
router.post('/agregar', agregar);

//PUT
router.put('/', eliminar);
 async function todos (req, res, next){
    try{
        const items = await controlador.todos() //ESPERAMOS LA PROMESA QUE SE HACE EN MYSQL.JS
        respuestas.success(req, res, items, 200);   
    }catch(err){
        next(err);
    }
};

async function uno (req, res, next){
    try{
        const items = await controlador.uno(req.params.id)
        respuestas.success(req, res, items, 200);
    }catch(err){
        next(err);
    }
};

async function agregar(req, res, next){
    try{
        const items = await controlador.agregar(req.body)
        if(req.body == 0){
            mensaje = 'Item guardado con exito ';
        }else{
            mensaje = 'Itema ctualizado con extio'
        }
        respuestas.success(req, res, mensaje, 201);
    }catch(err){
       next(err);
    }
};

async function eliminar (req, res, next){
    try{
        const items = await controlador.eliminar(req.body)
        respuestas.success(req, res, 'Item eliminado satisfactoramiente', 200);
    }catch(err){
       next(err);
    }
};

module.exports = router;


//RUTAS.JS SE EJECUTARÁN BAJO /API/CLIENTES....  POR EJEMPLO, SI COLOCAN /API/CLIENTES/ EJECUTAREMOS LA FUNCIÓN TODOS()
// SI COLOCAN /APIC/CLIENTES/:ID EJECUTAMOS UNO(REQ.PARAMS.ID) O SI EJECUTAN /api/clientes/ → Ejecuta la función eliminar(req.body).
// SIGUIENDO CON ELE EJMPLO, SI USA /API/CLIENTES/ USARÍAMOS LA FUNCIÍN TODOS(REQ,RES) EL CUAL NOS LLEVARÍA AL CONTROLADOR GRACIAS A ESTAREMOS
//LINEA DE CÓDIGO "const items = await controlador.todos()"..... --->