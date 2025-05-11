const express = require('express');
const router = express.Router();
const { ActivationCode } = require('../models');
const { isAuthenticated } = require('../middleware/auth');

router.use(isAuthenticated);

router.post('/create', async (req, res) => {
    const { grade, code } = req.body;
    const activationCode = await ActivationCode.create({ grade, code });
    res.status(201).json(activationCode);
});

router.get('/', async (req, res) => {
    const activationCodes = await ActivationCode.findAll({ limit: 100 });
    res.status(200).json(activationCodes);
});

router.post('/', async (req, res) => {
    const { grade, limit } = req.body;
    const activationCodes = await ActivationCode.findAll({ where: { category: grade }, limit: limit });
    res.status(200).json(activationCodes);
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await ActivationCode.destroy({ where: { id } });
    res.status(204).send();
});


module.exports = router;
