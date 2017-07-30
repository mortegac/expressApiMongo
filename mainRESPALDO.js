import config from './config'
import publicRoutes from './app/public.routes'
import privateRoutes from './app/private.routes'

// Inyección de dependencias
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('simple-express-logger');
// const errorhandler = require('errorhandler')

// Inyección de archivos
//const config =        require('./config');
const product =       require('./app/product/model');
const productCtrl =   require('./app/product/controller');


// Rutas sin validación de token
publicRoutes.forEach((route) => { app.use('/api', route) })

// rutas que deben tener token
privateRoutes.forEach((route) => { app.use('/api/app', route) })


// Inicialización
const app = express();

//Habilito errores solo para Development
// if (process.env.NODE_ENV === 'development') {
//   app.use(errorhandler())
// }
// Midlewares API - Configuración
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set('port', config.puerto);
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', config.domain);
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
	res.setHeader('Content-Type', 'application/json');
	next();
});
app.use(logger());


// Iniciamos las rutas de nuestro servidor/API
let rutas = express.Router();

// Ruta de bienvenida
rutas.get('/', function(req, res) {
	res.send({ 'Mensaje': 'API REST' });
});


//Products
rutas.route('/api/product')
	.get 	(productCtrl.listProduct)
	.post 	(productCtrl.createProduct)
	.put 	(productCtrl.updateProduct)
	.delete (productCtrl.deleteProduct)
	    

app.use(rutas);
// Conexión con la base de datos
var promise = mongoose.connect(`mongodb://localhost/${config.nombredb}`, {
	useMongoClient: true
});
// Inicialización del servicio
app.listen(config.puerto, function() {
	console.log(`Node server ejecutandose en http://localhost:${config.puerto}`);
});

