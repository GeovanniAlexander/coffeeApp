const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userIdGet, userPut, userDelete } = require('../controllers/user');

const { validateRole, valUniqueEmail, existUserById } = require('../helpers/db-validators');

const validateFields = require('../middlewares/fieldsValidator');
const validateJWT = require('../middlewares/JWTValidator');
const { validateAdmRole, isRole } = require('../middlewares/roleValidator');

const router = Router();

router.get('/', userGet);

router.post('/', 
[  
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es incorrecto').isEmail(),
    check('email').custom(valUniqueEmail),
    check('password', 'La contrasena debe tener minimo 8 caracteres').isLength({ min: 6 }),
    check('rol').custom((rol) => validateRole(rol)),
    validateFields
], userPost);

router.get('/:id', userIdGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existUserById ),
    check('rol').custom((rol) => validateRole(rol)),
    validateFields
], userPut);

router.delete('/:id', [
    validateJWT,
    validateAdmRole,
    isRole('ADMIN_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existUserById ),
] ,userDelete);

module.exports = router;