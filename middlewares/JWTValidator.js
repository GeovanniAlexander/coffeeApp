const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const validateJWT = async(req, res, next) => {
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).send({
            msg: "Token invalido"
        })
    }

    try {
        const { payload } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await userModel.findById({ _id:payload });

        if ( !user ){
            return res.status(401).send({
                msg: 'Token invalido'
            });
        }

        if ( !user.userStatus ){
            return res.status(401).send({
                msg: 'Token invalido'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            msg: 'Token invalido'
        })
    }

}

module.exports = validateJWT;