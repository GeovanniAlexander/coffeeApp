const productModel = require('../models/product');

const createProduct = async(req, res) => {
    let { 
        name,
        price, 
        category, 
        description 
    } =  req.body;
    name = name.toUpperCase();
    let product = await productModel.findOne({ name });
    if ( product ){
        return res.status(400).send({
            msg: 'El producto ya existe'
        })
    }
    const user = req.user._id;
    const data = {
        name,
        price,
        category,
        description,
        user
    }
    product = new productModel(data);
    product.save();

    res.send(product);
}

const getProduct = async (req, res) => {
    const id = req.params.id;
    const product = await productModel.findById( id )
                                      .populate('user', 'name')
                                      .populate('category', 'name');
    res.send( product );
}

const getCategories = async (req, res) => {
    const { from = 0, to = 5 } = req.query;
    const query = { status: true };
    const [ total, products ] = await Promise.all([
        productModel.countDocuments( query ),
        productModel.find( query )
                    .populate('user', 'name')
                    .populate('category', 'name')
                    .skip(Number(from))
                    .limit(Number(to))
    ]);

    res.json({
        total,
        products
    })

}

const updateProduct = async (req, res) => {
    const { 
        status, 
        user,
        ...data 
    } = req.body
    if( data.name ){
        data.name = data.name.toUpperCase();
    }
    const id = req.params.id;
    const product = await productModel.findByIdAndUpdate( id, data, { new: true } );

    res.send(product);
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await productModel.findByIdAndUpdate(id, { status: false }, {new: true});
    res.send( product );
}

module.exports = {
    createProduct,
    getProduct,
    getCategories,
    updateProduct,
    deleteProduct
}