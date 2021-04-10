const path = require('path');
const fs = require('fs');
const helpUploadFile = require('../helpers/upload-file');
const userModel = require('../models/user');
const productModel = require('../models/product');

const uploadFile = async(req, res) => {
    const valExt = ['jpg', 'png'];
    
    try {
        const fileName = await helpUploadFile(req.files, valExt, 'img' );
        res.json({ fileName });
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
    
}

const updateImg = async(req, res) => {

    const {id, collection} = req.params;
    let model;

    switch (collection) {
        case 'user':
            model = await userModel.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe usuario con id ${ id }`
                })
            }
        break;

        case 'product':
            model = await productModel.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe producto con id ${ id }`
                })
            }
        break;
    
        default:
            break;
    }

    if( model.img ){
        const filePath = path.join( __dirname, '../uploads', collection, model.img );
        if( fs.existsSync( filePath ) ){
            fs.unlinkSync( filePath );
        }
    }
    const fileName = await helpUploadFile(req.files, ['jpg', 'png'], collection);
    model.img = fileName;
    await model.save();
            
    res.json( model );
}


const getImg = async(req, res) => {

    const {id, collection} = req.params;
    let model;

    switch (collection) {
        case 'user':
            model = await userModel.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe usuario con id ${ id }`
                })
            }
        break;

        case 'product':
            model = await productModel.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe producto con id ${ id }`
                })
            }
        break;
    
        default:
            break;
    }
    if( model.img ){
        const filePath = path.join( __dirname, '../uploads', collection, model.img );
        if( fs.existsSync( filePath ) ){
            return res.sendFile( filePath );
        }
    }
    const noImagePath = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile( noImagePath );
}

module.exports = {
    uploadFile,
    updateImg,
    getImg
}

