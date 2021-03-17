const { Router } = require('express');
const { userGet, userPost, userIdGet } = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.post('/', userPost);

router.get('/:id', userIdGet);

module.exports = router;