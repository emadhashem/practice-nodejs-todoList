class Helper {

    createTodo(text = "") {
        return {
            text ,
            id : (Math.floor(Math.random()* 100) ) + ""
        }
    }
    updateTodo(id = "" , newText = "") {
        return {
            text : newText,
            id
        }
    }
}
module.exports = Helper;