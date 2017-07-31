// Inyección de dependencias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('simple-express-logger');
// const errorhandler = require('errorhandler')

// Inyección de archivos
const config =        require('./config');
const product =       require('./app/product/model');
const productCtrl =   require('./app/product/controller');

// Inicialización
const app = express();

//Habilito errores solo para Development
// if (process.env.NODE_ENV === 'development') { app.use(errorhandler()) }


// Midlewares API - Configuración
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('port', config.puerto);
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', config.domain);
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PATCH,PUT,DELETE');
	res.setHeader('Content-Type', 'application/json');
	next();
});
app.use('*', (req, res, next) => {
	!connected ? 
		res.status(500).json( { error: true, data: { msg: 'Sin conexión con la Base de datos, reintente más tarde' }})
		:
		next()
});

app.use(logger());



// Midleware para evitar 
//	Error: Can't set headers after they are sent.
//  at validateHeader (_http_outgoing.js:504:11)
app.use(function(req,res,next){
 	var _send = res.send;
	var sent = false;
	res.send = function(data){
		if(sent) return;
		_send.bind(res)(data);
		sent = true;
	};
	next();
});


// Iniciamos las rutas de nuestro servidor/API
let rutas = express.Router();

// Ruta de bienvenida
rutas.get('/', function(req, res) {
	res.send({ 'Mensaje': 'API REST v1' });
});
// app.get('*', function (req, res) {
//     res.send({ 'Mensaje': 'API REST v1' });
// });

rutas.route('/api/product/:id')
	.get 	(productCtrl.listProduct)
	.post 	(productCtrl.createProduct)
	.patch 	(productCtrl.updateProduct)
	.delete (productCtrl.deleteProduct)

//···································································································
// PUT 	    Cambia la estructura de la tabla si no tiene los mismo campos 
// PATCH    Conserva la estructura y solo modifica los datos


app.use(rutas);
// Conexión con la base de datos
mongoose
	.connect(`mongodb:${config.domain}/${config.nombredb}`, { useMongoClient: true })
	.on('connected', function () { console.log('Mongoose connection open') })
	.on('error', function (err) { console.log(`Mongoose error ${err}`) })
	.on('disconnected', function (err) { console.log('Mongoose connection disconnected') })
	.then(() => { connected = true })
  	.catch(err => { connected = false});

// Inicialización del servicio
app.listen(config.puerto, function(err) {
	console.log(`Node server ejecutandose en http:${config.domain}:${config.puerto}`);
	if (err) {
		console.error('Unable to listen for connections', err);
		process.exit(1);
	}
});

