
const express = require('express')
const mongoose 		= require('mongoose');
const ProductScheme = mongoose.model('productos');
const config 		= require('../../config');

mongoose.Promise = global.Promise;

// ::GET
exports.listProduct = (req, res) => {
console.log(req.params.id)
	//let id = req.params.id ? req.params.id : 0
	let id=0
    req.params.id==='undefined' ? id=0 : id=req.params.id


	
	//const id = (! req.params.id) ? 0 : req.params.id
	console.log(id)

	const dataFind = ()=> {
		console.log("Find")
		
		ProductScheme
			.find(function (err, data) {
				err ? res.json( { error: true,data: { msg: err }} ) : 1 //Valido no recibir errores

				!data ? res.status(404).json({ error: true,data: { msg: 'Registro no Encontrado' }}) 	
						:
						res.json({ error: false, data: data })
			});
	}
	const dataFindOne = ()=> {
		console.log("FinOne")
		ProductScheme
			.findOne({ _id: id })
			.exec((err, data) => {
				err ? res.json( { error: true,data: { msg: err }} ) : res.json({ error: false, data: data })

			})
	}
	//Verifico si recibo un id, de lo contrario devuelvo todos los registros
	id != 0 ? dataFindOne() : dataFind()

};

// :GET/:id
// exports.detailProduct = (req, res) => {
// 	const id = req.params.id
// 	const product = new ProductScheme({
// 		_id 		:req.body.id,
// 		name        :req.body.name,
// 		picture     :req.body.picture,
// 		price       :req.body.price,
// 		category    :req.body.category,
// 		description :req.body.description
// 	});

// 	ProductScheme	
// 		.findOne({user: user,  _id: id})
// 		.populate('user')
// 		.exec(function(err, todo) {
// 		if (err) throw err;

// 		if (!todo) {
// 			fn({
// 				message: 'Oops, we couldn\'t find that',
// 				code: 404
// 			});
// 		return;
// 		}

// 		fn(null, todo);
// 		});
		


// }

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

// ::PUT
exports.updateProduct = (req, res) => {

	const product = new ProductScheme({
		name        :req.body.name,
		picture     :req.body.picture,
		price       :req.body.price,
		category    :req.body.category,
		description :req.body.description
	});
	
	console.log(product);

	// product.update(product).then((data) => {
	// 	res.json({ error: false, product: data });

	// }).catch((error) => {
	// 	return res.json({ error: true });
	// });


	/*	employeeModel.update({Name:'rishabh'},{Name:'rishabh dixit'}).exec(function(err,result){
		if(err){
			console.log("Error occurred while updating the record: "+err);
		}else{
			console.log("Record updated: "+result);
		}
	}); */
	// product.update(product).exec((data) => {
	// 	res.json({ error: false, product: data });

	// }).catch((error) => {
	// 	return res.json({ error: true });
	// });
	//return res.json({ error: false, product: product });
	// return res.send({ 'product': product });
	// res.status(200).send({ 'product': product  })
	//res.status(200).send({'prod': 'prod'})

	res.json({ error: false, data: product	});

};

// ::DELETE
exports.deleteProduct = function(req, res) {

	// let product = new ProductScheme({
	// 	name        :req.body.name,
	// 	picture     :req.body.picture,
	// 	price       :req.body.price,
	// 	category    :req.body.category,
	// 	description :req.body.description
	// });

	// product.save().then((data) => {
	// 	res.json({ error: false, product: data });

	// }).catch((error) => {
	// 	return res.json({ error: true });
	// });
	return res.json({ error: false });
};




//	});


	// ProductScheme.findOne(param).lean().exec(function(err, data) {
	// ProductScheme.find({"name": {$regex:".*fis", $options:"i"}},{name:1})(function(err, data) {

	// 	if (err) {
	// 		return res.json({
	// 			error: true
	// 		});
	// 	}

	// 	if (!data) {
	// 		return res.status(404).json({
	// 			'mensaje': 'Producto no encontrado!'
	// 		});
	// 	} else {
	// 		res.json({
	// 			error: false,
	// 			data: data
	// 		});
	// 	}
	// });


