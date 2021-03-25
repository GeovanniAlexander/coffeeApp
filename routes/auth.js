const { Router } = require("express");
const { check } = require("express-validator");

const { loginPost } = require("../controllers/auth");
const validateFields = require("../middlewares/fieldsValidator");

const router = Router();

router.post('/login', [
    check('email', 'El email es incorrecto').isEmail(),
    check('password', 'La contrasena es incorrecta').not().isEmpty(),
    validateFields
], loginPost );

module.exports = router;