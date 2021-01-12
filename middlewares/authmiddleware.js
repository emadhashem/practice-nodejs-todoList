const jwt = require('jsonwebtoken')
const blackList = require('../blackList')
module.exports = function (req , res , next) {
    const token = req.header('x-auth-token')
    if(!token) res.status(401).send('denied')
    const blackToken = blackList.find(item => item == token)
    if(blackToken) res.status(401).send('denied')
    try {
        const verf = jwt.verify(token , process.env.TOKEN_SECRET)
        req.user = {...verf , token}
        next()
    } catch (ex) {
        res.status(400).send('not valid token' + `${ex.message}`)
    }
}