const express = require('express');
const router = express.Router();

const Comentario = require('../models/Comentarios');

// Ver
router.get('/', async (req, res) => {
    const comentarios = await Comentario.find();
    res.json(comentarios);
});
// Editar
router.get('/:id', async(req, res) => {
    const comentario = await Comentario.findById(req.params.id);
    res.json(comentario);
})
// Guardar
router.post('/', async(req, res)=> {
    const comentario = new Comentario(req.body);
    await comentario.save();
    res.json({
        status: 'Comentario Saved'
    });
});

// Actualizar
router.put('/:id', async (req, res) =>{
    await Comentario.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        status: 'Comentario Updated'
    });
});

// Borrar
router.delete('/:id', async (req, res) => {
   await Comentario.findByIdAndRemove(req.params.id);
   res.json({
        status: 'Comentario Deleted'
   });
});

module.exports = router;