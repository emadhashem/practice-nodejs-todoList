
const authRoute = require('./routes/authRoute')
const express = require('express');
const handlebars = require('express3-handlebars')
.create({defaultLayout:'main'});
const todosRouter = require('./routes/todos')
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
app.engine('handlebars' , handlebars.engine);
app.set('view engine' , 'handlebars');

/** this the middlewares */
app.use(morgan('dev'))
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors())
/**--------------------- */

/** defult */
app.get('/' , (req , res) => {
    res.render('home' , {obito : 'obito'})
})

/** databas integration */
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todoList')
.then(() => console.log("connects to mongoose"))
.catch(() => console.log("connection faild"))
/** */
/** routes */
app.use('/auth' , authRoute);
app.use('/auth' , todosRouter);
const PORT = process.env.PORT || 3001;
app.listen(PORT , () => {
    console.log(`the server is working and listening on port ${PORT}...`)
})
