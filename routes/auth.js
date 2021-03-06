const { Router } = require("express");
const { check } = require("express-validator");

const { loginPost, googleSignIn } = require("../controllers/auth");
const validateFields = require("../middlewares/fieldsValidator");

const router = Router();

router.post('/login', [
    check('email', 'El email es incorrecto').isEmail(),
    check('password', 'La contrasena es incorrecta').not().isEmpty(),
    validateFields
], loginPost );

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty()
] ,googleSignIn)

module.exports = router;