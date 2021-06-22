const mongoose = require('mongoose');
const { Schema } = mongoose;

const Episodio = new Schema({
    nEpisodio: Number,
    calificacion: Number,
    info: String,
    idtemp: [{
        type: Schema.Types.ObjectId,
        ref:"Temporadas"
    }]
});

module.exports = mongoose.model('Episodios', Episodio);