const mongoose = require('mongoose');

const file = new mongoose.Schema({

    title: {
        required: true,
        type: String
    },
    path: {
        required: true,
        type: String
    }
}, 
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

file.virtual('url').get(function() {
    const url = process.env.URL || 'http://localhost:3001';

    return `${ url }/file/${ encodeURIComponent(this.path) }`;
})

module.exports = mongoose.model('file', file);