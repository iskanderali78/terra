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
        var infoTable = require('../lib/tableInfoViewHTML');
        var info = new infoTable(result);
        var html = info.transformToHTML();
        var context = {
            table: html
        };
        res.render('information.html',context);
    });
});

router.get('/edit/*', function(req, res, next) {

    var arr = req.url.split('/');
    var addr = arr[2];
    //console.log("addr " + addr);
    var curCont = new controller(model);
    curCont.findOneByID(addr, function(result){
        var editForm = require('../lib/formEdit');
        var edit = new editForm(result, addr);
        var html = edit.transformToHTML();
        var context = {
            form: html
        };
        res.render('edit.html',context);
    });
});

router.post('/update/*', function(req, res, next) {
    var arr = req.url.split('/');
    var addr = arr[2];
    console.log("addr " + addr);
    var data = {
        name: req.body.name,
        category: req.body.category,
        status: req.body.status,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        producer: req.body.producer,
        size: req.body.size,
        weight: req.body.weight,
        country: req.body.country
    }
    var curCont = new controller(model);
    curCont.editRecord(addr, data, function(result){
        res.sendStatus(304);
    });
});

module.exports = router;
