import express from 'express';
import { json,urlencoded } from 'express';
import createTables from './db/queries';

const logger = require ('morgan');
const dotenv = require ('dotenv');
dotenv.config();
// const mongoose = require ('mongoose');

const app = express();
// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true} )

app.use(json());
app.use(urlencoded({extended: false }));
app.use(logger('dev'));

const port = process.env.PORT || 8000;
app.set('port',  port);

const indexRouter = require("./routes/index")
app.get('/', (req, res) => res.status(200).json({status: 'success', message: 'welcome to practice API'}));

app.use(indexRouter)
app.use((req, res, next) => res.status(404).json({status:'fail', message: 'oops you have reached a dead end'}));
app.use( function (err, req, res, next) { 
    console.error(err.stack) 
    res.status(500).json({status: 'server failure', message: 'Something broke!'})
});

(async() => {
    try{
        await createTables;
        app.listen(port, ()=> {
            console.log(`Amazing stuff is happening on port: ${port}`)
        })
    }
    catch(e){
      console.log(e.message)
    }
})();





module.exports = app;