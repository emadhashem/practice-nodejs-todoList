const router = require('express').Router()
const {validateUserRege , validateUserLogIn } = require('../models/authModel')

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
        res.status(200).send({...userReq , password})
       
    } catch (ex) {
        res.status(400).send(`some thing wrong with req ${ex.message}`)
        
    }
})
router.post('/login' , async (req , res) => {
    const userReq = req.body;
    const {error} = validateUserLogIn(userReq)
    if(error) {
        res.status(400).send(`bad req ... ${error.message}`)
        return
    }
    try {
        // const result = await checkPass(userReq.password , hashPass)
        const token = await geneAuthToken(userReq.email)
        res.header('x-auth-token' , token).send(200 , token)
    } catch (ex) {
        res.status(400).send(`some thing wrong with req ${ex.message}`)
        
    }
})
module.exports = router;