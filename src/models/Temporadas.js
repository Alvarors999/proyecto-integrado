const mongoose = require('mongoose');
const { Schema } = mongoose;

const Temporada = new Schema({
    nTemporadas: Number,
    idserie: [{
        type: Schema.Types.ObjectId,
        ref:"Serie"
    }]
});

module.exports = mongoose.model('Temporadas', Temporada);