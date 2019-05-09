const boxModel = require('../models/box.model');

let api = {};

api.list = async (req, res) => {

    
    try {
        
        let box = await boxModel.find({}).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        });
        
        console.log('Boxes listados');
        return res.json(box);
    } catch (error) {
        
        res.status(500).json(
            { 
                fail: 'Não foi possível listar os boxes',
                message: error
            }
        )
    }

};

api.listById = async (req, res) => {

    let box = await boxModel.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        });

    try {
        
        console.log('Box encontrado');
        return res.json(box);
    } catch (error) {
        
        res.status(500).json(
            { 
                fail: 'Não foi possível listar o box',
                message: error
            }
        )
    }

};

api.create = async (req, res) => {

    
    let box = await boxModel.create( req.body );

    try {
        
        console.log('Box criado');
        console.log(box);
        return res.json(box)
    } catch (error) {
        
        res.status(500).json(
            { 
                fail: 'Não foi possível adicionar o box',
                message: error
            }
        )
    }

};

api.remove = async (req, res) => {

    
    try {
        await boxModel.findByIdAndDelete(req.params.id);
        
        console.log('Box removido');
        res.status(200).json({ success: 'Box removido' })
    } catch (error) {
        res.status(500).json(
            { 
                fail: 'Não foi possível remover o box',
                message: error
            }
        )
    }

}

module.exports = api;

