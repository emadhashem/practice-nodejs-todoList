const router = require('express').Router()
const { User , validateUserRege , validateUserLogIn } = require('../models/authModel')
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const blackList = require('../blackList');
const authmiddleware = require('../middlewares/authmiddleware');
router.post('/signup' , async (req , res) => {
    const reqUser = req.body;
    const {error} = validateUserRege(reqUser)
    if(error) {
        return res.status(400).send(`some thing wrong with input data ... ${error.message}`)
    }
    const userExist = await User.findOne({email : reqUser.email}) 
    if(userExist) return res.status(400).send('email used before')

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(reqUser.password , salt);

    reqUser.password = hashPassword;
    const newUser = new User(reqUser);
    try {
        const user = await newUser.save()
        res.send(_.pick(user , ['_id' , "userName" , "email"] ))
    } catch (ex) {
        res.status(400).send('some thing wrong with database ..' + `${ex.message}`)
    }
})
router.post('/login' , async (req , res) => {
    const reqUser = req.body;
    
    const {error} = validateUserLogIn(reqUser)
    if(error) {
        return res.status(400).send(`some thing wrong with input data ... ${error.message}`)
    }
    const userExist = await User.findOne({email : reqUser.email})
    if(!userExist) return res.status(400).send('email or password is wrong')
    const validPass = await bcrypt.compare(reqUser.password , userExist.password)
    if(!validPass) return res.status(400).send('email or password is wrong')
    const token = userExist.generateAuthToken()
    res.header('x-auth-token' , token).send(token);
})
router.get('/logout' , authmiddleware , (req , res) => {
    const token = req.user.token
    blackList.push(token);
    res.send(blackList)
})
module.exports = router