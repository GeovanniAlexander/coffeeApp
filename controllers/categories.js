const categoryModel = require('../models/category')

const getCategories = async (req, res) => {
    const { from = 0, to = 5 } = req.query;
    const query = { status: true };
    const [ total, categories ] = await Promise.all([
        categoryModel.countDocuments( query ),
        categoryModel.find( query )
                     .populate('user', 'name')
                     .skip(Number(from))
                     .limit(Number(to))
    ]);

    res.json({
        total,
        categories
    });
}

const getCategory = async (req, res) => {
    const id = req.params.id;
    const category = await categoryModel.findById(id)
                                        .populate('user', 'name');
    res.send( category );
}

const createCategory = async (req, res) => {
    const name = req.body.name.toUpperCase();
    let category = await categoryModel.findOne({ name });
    if( category ){
        return res.status(400).send({
            msg: 'La categoria ya existe'
        })
    }
    const data = {
        name,
        user: req.user._id
    }
    category = new categoryModel( data );
    await category.save();

    res.status(201).send(category);
}

const updateCategory = async (req, res) => {
    const id = req.params.id;
    const { status, user, ...updCategory } = req.body;
    updCategory.name = updCategory.name.toUpperCase();
    updCategory.user = req.user.id;
    const category = await categoryModel.findByIdAndUpdate(id, updCategory, { new: true });
    res.send(category);
}

const deleteCategory = async (req, res) => {
    const id = req.params.id;
    const updateCategory = {
        status: false
    }
    const category = await categoryModel.findByIdAndUpdate(id, updateCategory);
    res.send(category);
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};