const rolModel = require('../models/role');
const userModel = require('../models/user')
 
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

module.exports = { validateRole, valUniqueEmail, existUserById };