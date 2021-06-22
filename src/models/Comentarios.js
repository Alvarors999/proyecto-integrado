const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comentario = new Schema({
    texto: String,
    date: Date,
    iduser: [{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]

});

module.exports = mongoose.model('Comentarios', Comentario);