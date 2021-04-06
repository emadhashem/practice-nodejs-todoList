const bcrpt = require('bcrypt');
const jwt = require('jsonwebtoken')
async function getPass(password = "") {
    const salt = await bcrpt.genSalt()
    const hashPassword = await bcrpt.hash(password , salt);
    // console.log(hashPassword);
    return hashPassword
}

async function checkPass(password = "" , hashPassword = "") {
    const result = await bcrpt.compare(password , hashPassword)

    return result;
}
async function geneAuthToken(_id = "") {
    const token = jwt.sign({_id} , process.env.jwtSecret);
    return token
}
module.exports = {getPass , checkPass , geneAuthToken ,}