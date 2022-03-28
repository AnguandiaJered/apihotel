const router = require('express').Router();
const storageImg = require('../middlewares/storage_img');
const auth = require('../middlewares/auth');

const salaire = require('../controllers/salaire');

// salaire roots
router.post('/salaire/create', auth,salaire.createSalaire);
router.get('/salaire/show', auth,salaire.findSalaire);
router.put('/salaire/:salaireId', auth,salaire.updateSalaire);
router.delete('/salaire/:salaireId', auth,salaire.deletSalaire);

module.exports = router;