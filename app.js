const express = require('express');
const app = express(); 
const ejs = require('ejs')

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static(__dirname + '/public'));

const mainRouter = require('./router/mainRouter')

app.use("/", mainRouter)

app.listen(4000, function(req,res){
    console.log("서버 실행");
})
