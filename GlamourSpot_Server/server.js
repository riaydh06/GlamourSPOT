const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));

const db = require('./config/dbConfig').mongoURI;

mongoose.connect(db, {useNewUrlParser: true}).then(() => {
    console.log("connected to mongoDB")
}).catch(err => console.log(err));

app.use("/api", require('./api/productsAPI'));

app.use('/api/auth', require('./api/authAPI'));

app.get("/", (req, res) =>{
    res.json("welcome to glamourSPOT SERVER");
});

let port =  process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`node-express server running at port ${port}`)
});