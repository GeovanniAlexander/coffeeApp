const { Schema, model } = require('mongoose');


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: 'true'
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    desctiption: {
        type: String,
        default: ''
    },
    disponibility: {
        type: Boolean,
        default: true
    }
});

productSchema.methods.toJSON = function() {
    const { __v, status, ...product } = this.toObject();
    return product;
}

module.exports = model('product', productSchema);