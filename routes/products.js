const { Router } = require('express');
const { check } = require('express-validator');

const { createProduct, getProduct, getCategories, updateProduct, deleteProduct } = require('../controllers/product');

const { existCategory, existProduct } = require('../helpers/db-validators');

const validateFields = require('../middlewares/fieldsValidator') 
const { validateAdmRole } = require('../middlewares/roleValidator');

const validateJWT = require('../middlewares/JWTValidator');

const router = Router();



router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    check('category', 'Id categoria invalido').isMongoId(),
    check('category').custom( existCategory ),
    validateFields
], createProduct);

router.get('/:id', [
    check('id','Id de categoria invalido').isMongoId(),
    check('id').custom( existProduct ),
    validateFields
], getProduct);

router.get('/', getCategories);

router.put('/:id', [
    validateJWT,
    check('id','Id de categoria invalido').isMongoId(),
    check('id').custom( existProduct ),
    validateAdmRole,
    validateFields
], updateProduct);

router.delete('/:id',[
    validateJWT,
    check('id','Id de categoria invalido').isMongoId(),
    check('id').custom( existProduct ),
    validateAdmRole,
    validateFields
], deleteProduct);

module.exports = router;