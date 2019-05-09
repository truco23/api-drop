const mongoose = require('mongoose');

const box = new mongoose.Schema({

    title: {
        required: true,
        type: String
    },
    files: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'file'
        }
    ]
}, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('box', box);