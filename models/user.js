const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email:{
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'El contrasena es requerida']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: [true, 'El nombre es requerido'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    google:{
        type: Boolean,
        default: 'false'
    },
    userStatus:{
        type: Boolean,
        default: 'true'
    }
    
});

userSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    
    return user;
}

module.exports = mongoose.model('user', userSchema);