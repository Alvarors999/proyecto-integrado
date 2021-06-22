const express = require('express');
const Temporada = require('../models/Temporadas');
const router = express.Router();


// Ver
router.get('/', async (req, res) => {
    const temporadas = await Temporada.find();
    res.json(temporadas);
});
// Editar
router.get('/:id', async(req, res) => {
    const temporada = await Temporada.findById(req.params.id);
    res.json(temporada);
})
// Guardar
router.post('/', async(req, res)=> {
    const temporada = new Temporada(req.body);
    await temporada.save();
    res.json({
        status: 'Temporada Saved'
    });
});

// Actualizar
router.put('/:id', async (req, res) =>{
    await Temporada.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        status: 'Temporada Updated'
    });
});

// Borrar
router.delete('/:id', async (req, res) => {
   await Temporada.findByIdAndRemove(req.params.id);
   res.json({
        status: 'Temporada Deleted'
   });
});

module.exports = router;