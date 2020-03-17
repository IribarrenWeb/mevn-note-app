import express from "express";
const router = express.Router();
import Nota from "../models/nota";

// Crear un registro de Nota
router.post("/nota", async (req, res) => {
    const body = req.body;

    try {
        const notaDB = await Nota.create(body);
        return res.status(200).json({
            mensaje: "Nota creada.",
            nota: notaDB
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error en el servidor.",
            error
        });
    }
});

// Obtener un solo registro de Notas
router.get('/nota/:id',async(req,res) => {

    const id = req.params.id;
    try {
        const nota = await Nota.findOne({_id: id});
        return res.json({nota});
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error en el servidor.",
            error
        });
    }

});

// Obtener todos los registros de Notas
router.get('/notas', async(req,res) => {

    try {
        
        const notas = await Nota.find();
        return res.json({notas});

    } catch (error) {
        return res.status(400).json({
            mensaje: "Error en el servidor.",
            error
        });
    }

});

// Eliminar registro de notas
router.delete('/nota/:id',async(req,res) => {

    const id = req.params.id;

    try {
        let response = await Nota.findByIdAndDelete({_id:id});

        if(!response){
            return res.status(400).json({
                mensaje: "No hay ninguna nota con ese id.",
                error
            });
        }

        return res.json({response});

    } catch (error) {
        return res.status(400).json({
            mensaje: "Error en el servidor.",
            error
        });        
    }

});

// Actualizar registro de notas
router.put('/nota/:id', async(req,res) => {

    const id = req.params.id;
    const body = req.body;

    try {

        const nota = await Nota.findByIdAndUpdate({_id:id},body,{new:true});
        if(!nota){
            return res.status(400).json({
                mensaje: "Id no encontrado"
            }); 
        }
        return res.json({nota});

    } catch (error) {
        return res.status(400).json({
            mensaje: "Error en el servidor.",
            error
        }); 
    }

});

module.exports = router;
