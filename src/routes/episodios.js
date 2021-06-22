const express = require('express');
const router = express.Router();

const Episodio = require('../models/Episodios');

// Ver
router.get('/', async (req, res) => {
    const episodios = await Episodio.find();
    res.json(episodios);
});
// Editar
router.get('/:id', async(req, res) => {
    const episodio = await Episodio.findById(req.params.id);
    res.json(episodio);
})
// Guardar
router.post('/', async(req, res)=> {
    const episodio = new Episodio(req.body);
    await episodio.save();
    res.json({
        status: 'episodio Saved'
    });
});

// Actualizar
router.put('/:id', async (req, res) =>{
    await Episodio.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        status: 'Episodio Updated'
    });
});

// Borrar
router.delete('/:id', async (req, res) => {
   await Episodio.findByIdAndRemove(req.params.id);
   res.json({
        status: 'episodio Deleted'
   });
});

module.exports = router;