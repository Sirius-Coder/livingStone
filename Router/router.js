const express = require('express');
const { createPlan } = require('../Controller/createPlan');
const router = express.Router();

// Our Routes go here

router.post('/plan', createPlan)


module.exports = router