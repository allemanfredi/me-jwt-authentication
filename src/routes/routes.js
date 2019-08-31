const express = require('express');
const router = express.Router();

const { signup } = require('../api/signup');
const { signin } = require('../api/signin');
const { getUserData } = require('../api/user');

const withAuth  = require('../utils/middleware');

router.post('/api/signup', signup);
router.post('/api/signin', signin);
router.get('/api/accessToken', withAuth, (req, res) => { res.sendStatus(200); });

router.post('/api/user/data', withAuth , getUserData);


module.exports = router;