const { Router } = require('express');
const { check } = require('express-validator');

const { createCategory, getCategories,  getCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { existCategory } = require('../helpers/db-validators');

const validateFields = require('../middlewares/fieldsValidator');
const validateJWT = require('../middlewares/JWTValidator');
const { validateAdmRole, isRole } = require('../middlewares/roleValidator');

const router = Router();

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existCategory ),
    validateFields
], getCategory);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory);

router.put('/:id', [
    validateJWT, 
    check('name', 'El campo nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existCategory ),
    validateFields
], updateCategory);

router.delete('/:id',[
    validateJWT,
    validateAdmRole,
    isRole('ADMIN_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existCategory ),
], deleteCategory);

module.exports = router; 