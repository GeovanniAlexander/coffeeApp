const bcryptjs = require('bcryptjs');
const generateJWT = require('../helpers/generateJWT');
const googleValidation = require('../helpers/google-validate');
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

const googleSignIn = async (req, res) => {

    const { id_token } = req.body;

    try {

        const { email, img, name } = await googleValidation( id_token );

        let user = await userModel.findOne({ email });

        if( !user ){
            const data = {
                email,
                img,
                name,
                password: ' ',
                google: true
            }
            user = new userModel( data );
            await user.save();
        }

        if( !user.userStatus ){
            return res.status(401).send({
                msg: 'El usuario esta borrado o bloqueado'
            })
        }

        const token = await generateJWT(user.id);

        res.send({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            msg: 'token de google invalido'
        })

    }
    
}

module.exports = {
  loginPost,
  googleSignIn
};
