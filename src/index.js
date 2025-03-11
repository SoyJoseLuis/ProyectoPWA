const app = require('./app');

app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en el puerto ", app.get("port"));
})


//SIMULANDO ALGO, PRIMERO SE INICIA EL SERVIDOR, COMO VES, TENEMOS UNA APP QUE REQUIERE DE ./APP POR LO QUE TENEMOS TODAS
// LAS FUNCIONES DE APP, Y LUEGO EN LA LINEA DE COÓDIGO "app.get("port"));" DICE QUE QUEREMOS OBTENER ALGO DE APP, QUE ES COMO UNA ESPECIE
// DE ¿"PORTAL"? DONDE ESTAREMOS. SI EN ESE PORTAL COLOCAMOS /api/clientes, nos tendremos que ir a app.js   ---->