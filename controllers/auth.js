const bcryptjs = require('bcryptjs');
const generateJWT = require('../helpers/generateJWT');
const userModel = require("../models/user");

const loginPost = async (req, res) => {
    const { password, email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user)
        return res.status(400).send({
        msg: "Usuario o contrasena incorrectos - email",
        });

    if (!user.userStatus)
        return res.status(400).send({
        msg: "Usuario o contrasena incorrectos - status",
        });

    const comparePass = bcryptjs.compareSync(password, user.password);
    if(!comparePass)
        return res.status(400).send({
        msg: "Usuario o contrasena incorrectos - password",
        });
    
    const token = await generateJWT(user.id);

    res.send({
        user, 
        token
    });
};

module.exports = {
  loginPost,
};
