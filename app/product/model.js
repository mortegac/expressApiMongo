
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('productos', new Schema({
        name        : {type: String},
        picture     : {type: String},
        price       : {type: String},
        category    : {type: String, enum:['computer', 'phones', 'accesories'] },
        description : {type: String}
}));
