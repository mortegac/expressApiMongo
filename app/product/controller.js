
const express = require('express')
const mongoose 		= require('mongoose');
const ProductScheme = mongoose.model('productos');
const config 		= require('../../config');

mongoose.Promise = global.Promise;

// ::GET
exports.listProduct = (req, res) => {
	let id = req.params.id 

	const dataFind = ()=> {		
		ProductScheme
			.find(function (err, data) {
				err ? res.json( { error: true,data: { msg: err }} ) : 1 //Valido no recibir errores

				!data ? res.status(404).json({ error: true,data: { msg: 'Registro no Encontrado' }}) 	
						:
						res.json({ error: false, data: data })
			});
	}
	const dataFindOne = ()=> {
		ProductScheme
			.findOne({ _id: id })
			.exec((err, data) => {
				err ? res.json( { error: true,data: { msg: err }} ) : res.json({ error: false, data: data })

			})
	}
	//Verifico si recibo un id, de lo contrario devuelvo todos los registros
	id != 0 ? dataFindOne() : dataFind()

};

// ::POST
exports.createProduct = (req, res) => {

	const product = new ProductScheme({
		_id 		:req.body.id,
		name        :req.body.name,
		picture     :req.body.picture,
		price       :req.body.price,
		category    :req.body.category,
		description :req.body.description
	});

	product
		.save().then((data) => {
			res.json({ error: false, product: data });
			})
		
		.catch((error) => {
			return res.json({ error: true });
			});
};

// ::PATCH
exports.updateProduct = (req, res) => {
	let id = req.params.id
	let payload = req.body
	
	ProductScheme
		.findByIdAndUpdate(id, payload, (err, data)=>{
			err ? 	res.json({ 	error: true,
								response:{ 
											text: 'Error al actualizar el Producto',
											error: err
										},
								data: data
							}) 
					:
					res.json({ 	error: false,
								response:{ 
											text: 'Registo Actualizar',
											error: ''
										},
								data: { data }
							})
		})

	}
	

// ::DELETE
exports.deleteProduct = function(req, res) {

	let id=0
	req.params.id==='undefined' ? res.json( { error: true,data: { msg: `Debe ingresar el id, ${err}` }} ) : id=req.params.id

	ProductScheme
		.findById(id, (err, data)=>{
			err ? res.json( { error: true,data: { msg: 'Error al borrar el Producto', error: err }} ) : 1 

			data.remove(err =>{
				err ? res.json({ 	error: true,
									response:{ 
												text: 'Error al borrar el Producto',
												error: err
											},
									data: data
								}) 
				: 
				res.json({ 	error: false,
							response:{ 
										text: 'Registo Eliminado',
										error: ''
									},
							data: { data }
						})

			})
		})
};