const rolModel = require('../models/role');
const userModel = require('../models/user');
const categoryModel = require('../models/category');
const productModel = require('../models/product');
 
const validateRole = async (role) => {
  const rolVal = await rolModel.findOne({ role });
  if (!rolVal) throw new Error(`El rol ${role} no existe en la BD`);
}

const valUniqueEmail = async (email) => {
  const valEmail = await userModel.findOne( {email} );
  if ( valEmail ) throw new Error(`El correo ${ email } ya esta registrado`)
}

const existUserById = async (id) => {
  const valUserById = await userModel.findById(id);
  if ( !valUserById ) throw new Error(`El usuario con id ${ id } no existe`);
}

const existCategory = async (id) => {
  const valCategory = await categoryModel.findById(id);
  if ( !valCategory ) throw new Error(`La categoria con el id: ${ id } no existe`);
}

const existProduct = async(id) => {
  const valProduct = await productModel.findById(id);
  if ( !valProduct ) throw new Error(`El producto con id: ${ id } no existe`);
}

const allowsCollections = (collection, collections) => {
  const valCollecion = collections.includes(collection);
  if( !valCollecion ){
    throw new Error(`La coleccion no esta permitida`);
  }
  
  return true;
}

module.exports = { validateRole, valUniqueEmail, existUserById, existCategory, existProduct, allowsCollections};