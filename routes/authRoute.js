const router = require('express').Router()
const {validateUserRege , validateUserLogIn , User} = require('../models/authModel')

const _ = require('lodash')
const blackList = require('../blackList');
const { getPass, checkPass , geneAuthToken } = require('../helpers');
router.post('/signup' , async (req , res) => {
    const userReq = req.body;
    const {error} = validateUserRege(userReq)
    if(error) {
        res.status(400).send(`bad req ... ${error.message}`)
        return
    }
    
    try {
        const password =  await getPass(userReq.password)
        const newUser = new User({
            userName : userReq.userName,
            password,
            email : userReq.email
        })
        const sendUSer = await newUser.save()
        res.status(200).send(sendUSer)
       
    } catch (ex) {
        res.status(400).send(`some thing wrong with req ${ex.message}`)
        
    }
})
router.post('/login' , async (req , res) => {
    const userReq = req.body;
    const {error} = validateUserLogIn(userReq)
    if(error) {
        res.status(400).send(`not valid req... ${error.message}`)
        return
    }
    try {
        const findUser = await User.findOne({email : userReq.email})
        const result = await checkPass(userReq.password , findUser.password)
        if(result == false) return res.status(400).send('email or pass not valid')
        const token = await geneAuthToken(findUser._id)
        res.setHeader('x-auth-token' , token)
        res.send({token , _id : findUser._id})
    } catch (ex) {
        res.status(400).send(`some thing wrong with req ${ex.message}`)
        
    }
})
module.exports = router;