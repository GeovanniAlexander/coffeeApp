const { Schema, model } = require('mongoose');


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

categorySchema.methods.toJSON = function() {
    const {__v, status, ...category} = this.toObject();
    return category;
}

module.exports = model( 'category', categorySchema);