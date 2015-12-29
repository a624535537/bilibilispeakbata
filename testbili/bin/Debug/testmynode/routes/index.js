var express = require('express');
var router = express.Router();

/* GET home page. */
function routes(app){
app.get('/',function(req,res){
  res.render('lt');

})

}

module.exports = routes;
