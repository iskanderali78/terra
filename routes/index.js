var express = require('express');
var router = express.Router();

//var controller = require('../controllers/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  var controller = require('../controllers/product');
  var model = require('../models/productModel');
  var curCont = new controller(model);
  //var testModel = new model({
  //  name: 'Плитка для стен Acoustic Maiz 31.6x59.2',
  //  category: 'Фоновая плита',
  //  status: 'Не имеет',
  //  price: 2781.07,
  //  image: '00001.jpg'
  //});
  //curCont.createRecord(testModel);
  curCont.findAll(function(result){
      var catalogTable = require('../lib/tableAllViewHTML');
      var catalog = new catalogTable(result);
      var html = catalog.transformToHTML();
      console.log(html);
      res.render('index', { title: 'Терра' , tabl: html});
  });
});

module.exports = router;
