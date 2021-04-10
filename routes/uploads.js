const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFile, updateImg, getImg } = require('../controllers/uploads');

const { allowsCollections } = require('../helpers/db-validators');
const validateFields = require('../middlewares/fieldsValidator') 
const existFile = require('../middlewares/fileValidations');

const router = Router();

router.post('/', existFile, uploadFile);

router.put('/:collection/:id', [
    existFile,
    check('id', 'El id no es valido').isMongoId(),
    check('collection').custom( collection => allowsCollections(collection, ['user','product'])),
    validateFields
], updateImg);

router.get('/:collection/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('collection').custom( collection => allowsCollections(collection, ['user','product'])),
    validateFields
], getImg);

module.exports = router;