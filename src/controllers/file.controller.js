const fileModel = require('../models/file.model');
const boxModel  = require('../models/box.model');

let api = {};

api.list = async (req, res) => {

    let file = await fileModel.find({});

    try {
        
        console.log('Files listados');
        return res.json(file);
    } catch (error) {
        
        res.status(500).json(
            { 
                fail: 'Não foi possível listar os files',
                message: error
            }
        )
    }
};

api.listById = async (req, res) => {

    let file = await fileModel.findById(req.params.id);
    
    try {
        
        console.log('Box encontrado');
        return res.json(file);
    } catch (error) {
        
        console.log(error)
        res.status(500).json(
            { 
                fail: 'Não foi possível encontrar o file'
            }
        )
    }

};

api.create = async (req, res) => {

    console.log(req.file);
    let box = await boxModel.findById(req.params.id);

    let file = await fileModel.create({
        title: req.file.originalname,
        path: req.file.filename
    });

    try {
        
        box.files.push(file);
    
        await box.save();

        req.io.sockets.in(box._id).emit('file', file);
    
        console.log('File adicionado');
        console.log(file);
    
        return res.json(file);
    } catch (error) {
        
        console.log(error);

        res.status(500).json(
            { 
                fail: 'Não foi possível adicionar o file',
                message: error
            }
        )
    }

};

api.remove = async (req, res) => {

};

module.exports = api;
// 58:22