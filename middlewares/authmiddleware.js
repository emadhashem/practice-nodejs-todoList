const jwt = require('jsonwebtoken')
const blackList = require('../blackList')
const {verefAuthToken} = require('../helpers')
module.exports = async function (req , res , next) {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('denied')
    // const blackToken = blackList.find(item => item == token)
    // if(blackToken) res.status(401).send('denied')
    try {
        const verf = jwt.verify(token , process.env.jwtSecret)
        req.user = verf
        next()
    } catch (ex) {
        res.status(400).send('not valid token' + `${ex.message}`)
    }
}