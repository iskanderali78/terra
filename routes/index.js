var express = require('express');
var router = express.Router();

var controller = require('../controllers/product');
var model = require('../models/productModel');

/* GET home page. */
router.get('/', function(req, res, next) {
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
      if(result != 'non identity'){
        var catalogTable = require('../lib/tableAllViewHTML');
        var catalog = new catalogTable(result);
        var html = catalog.transformToHTML();
        var context = {
            ready: "Каталог товаров",
            table: html
        };
        res.render('index.html', context);
      }
      else{
          html = "<p>В базе данных отсутствуют записи!</p>";
          var context = {
              ready: "Ошибка!",
              table: html
          };
          res.render('index.html', context);
      }
  });
});

router.get('/catalog/*', function(req, res, next) {

    var arr = req.url.split('/');
    var addr = arr[2];
    var curCont = new controller(model);
    curCont.findOneByID(addr, function(result){
        console.log(result);
        var context = {
            table: addr
        };
        res.render('information.html',context);
    });
});

module.exports = router;
