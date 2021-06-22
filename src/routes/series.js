const express = require('express');
const router = express.Router();

const Serie = require('../models/Serie');

// Ver
router.get('/', async (req, res) => {
    const series = await Serie.find();
    res.json(series);
});
// Editar
router.get('/:id', async(req, res) => {
    const serie = await Serie.findById(req.params.id);
    res.json(serie);
})
// Guardar
router.post('/', async(req, res)=> {
    const serie = new Serie(req.body);
    await serie.save();
    res.json({
        status: 'Serie Saved'
    });
});

// Actualizar
router.put('/:id', async (req, res) =>{
    await Serie.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        status: 'Serie Updated'
    });
});

// Borrar
router.delete('/:id', async (req, res) => {
   await Serie.findByIdAndRemove(req.params.id);
   res.json({
        status: 'Serie Deleted'
   });
});

module.exports = router;