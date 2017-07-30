const express = require('express')
// const config 		= require('../../config');
const Ctrl 		= require('./controller');



exports.routerProduct = (req, res) => {

    const router = express.Router()

	//Products
    rutas.route('/api/product/:id')
        .get 	(Ctrl.listProduct)
        .post 	(Ctrl.createProduct)
        .patch 	(Ctrl.updateProduct)
        .delete (Ctrl.deleteProduct)
        


    };
    