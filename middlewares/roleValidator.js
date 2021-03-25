const validateAdmRole = ( req, res, next ) => {

    const { rol, name } = req.user;

    if ( rol !== 'ADMIN_ROLE'){
        return res.status(401).send({
            msg: `El usuario ${ name } no es administrador` 
        })
    }

    next();
}

const isRole = ( ...roles ) => {
    return (req, res, next) => {
        const role = req.user.rol;
        if ( !roles.includes(role) ){
            return res.status(401).send({
                msg: `El rol debe ser ${ roles }`
            })
        }
        next();
    }
}

module.exports = {
    validateAdmRole,
    isRole
};