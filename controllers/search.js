const { isValidObjectId } = require("mongoose");
const categoryModel = require("../models/category");
const productModel = require("../models/product");
const userModel = require('../models/user');


const avaliableCollections = [
    'categories',
    'products',
    'roles',
    'users',
];

const searchUsers = async(res, param) => {
    const isMongoId = isValidObjectId( param );
    if( isMongoId ){
        const user = await userModel.findById( param )
        return res.json({
            result: (user) ? [user] : []
        })
    }

    const regex = new RegExp(param , 'i');
    const users = await userModel.find({
        $or: [
            { name: regex },
            { email: regex }
        ],
        $and: [{userStatus: true}]
    });

    res.json({
        result: (users) ? users : []
    });
}

const searchCategories = async(res, param) => {
    const isMongoId = isValidObjectId( param );
    if( isMongoId ){
        const category = await categoryModel.findById( param );
        return res.json({
            result: (category) ? category : []
        })
    }

    const regex = new RegExp(param, 'i');
    const categories = await categoryModel.find({ name: regex });

    res.json({
        result: (categories) ? categories : []
    });
}

const searchProducts = async( res, param ) => {
    const isMongoId = isValidObjectId( param );
    if( isMongoId ){
        const product = await productModel.findById( param );
        return res.json({
            result: (product) ? product : []
        });
    }

    const regex = new RegExp( param, 'i');
    const products = await productModel.find({ name: regex });

    res.json({
        result: (products) ? products : []
    });
}

const search = (req, res) => {
    const  { collection, param } = req.params;

    if( !avaliableCollections.includes( collection )){
        return res.status(400).send({
            msg: 'No es una coleccion permitida'
        })
    }
    
    switch (collection) {
        case 'categories':
            searchCategories( res, param );
            break;
        case 'products':
            searchProducts( res, param );
            break;
        case 'users':
            searchUsers( res, param);
            break;  
        default:
            break;
    }
}

module.exports = {
    search,
}