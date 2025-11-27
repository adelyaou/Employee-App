const express = require('express');
const router = express.Router();
const empCtrl = require('../controllers/employee.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, empCtrl.list);
router.get('/:id', auth, empCtrl.get);
router.post('/', auth, empCtrl.create);
router.put('/:id', auth, empCtrl.update);
router.delete('/:id', auth, empCtrl.delete);

module.exports = router;
