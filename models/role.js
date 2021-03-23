const { Schema, model } = require('mongoose');

const rolSchema = new Schema({
    role:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


module.exports = model('role', rolSchema);