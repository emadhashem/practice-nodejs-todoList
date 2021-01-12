
const {todoValidation , Todo}  = require('../models/todoMode') 
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = require('express').Router();
const Joi = require('joi')
const authMiddleware = require('../middlewares/authmiddleware')
router.post('/add' , authMiddleware , (req , res) => {
    res.send(req.user)
})
module.exports = router;
