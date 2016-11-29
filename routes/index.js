var express = require('express');
var router = express.Router();

var controller = require('../controllers/product');
var model = require('../models/productModel');
var dialog = require('dialog');

router.get('/', function(req, res, next) {
  var curCont = new controller(model);
  curCont.findAll(function(result){
      //console.log(result);
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

router.get('/new', function(req,res,next){

    var readdr = "/add";
    var data = {
        name: "",
        category: "",
        status: "",
        price: 0,
        image: "",
        description: "",
        producer: "",
        size: "",
        weight: 0,
        country: ""
    };
    var editForm = require('../lib/formEdit');
    var edit = new editForm(data, readdr);
    var html = edit.transformToHTML();
    var context = {
        form: html
    };
    res.render('edit.html',context);
});

router.post('/add', function(req, res, next) {
    var data = req.body;
    var curCont = new controller(model);
    var testModel = new model(data);
    curCont.createRecord(testModel, function(result){
        if(result == 'identity'){
            var context = {
                error: 'Ошибка сохранения записи! В базе данных уже присутствует товар с таким названием!'
            }
//            req.flash('info','Ошибка сохранения записи! В базе данных уже присутствует товар с таким названием!');
            res.render('error.html',context);
        }
        else if(result == 'error'){
            console.log('router.error');
        }
        else{
            var readdr = "/edit/" + result;
            res.redirect(readdr);
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
    var readdr = "/update/" + addr;
    console.log("addr " + addr);
    var curCont = new controller(model);
    curCont.findOneByID(addr, function(result){
        var editForm = require('../lib/formEdit');
        //console.log(result);
        var edit = new editForm(result, readdr);
        var html = edit.transformToHTML();
        var context = {
            form: html
        };
        res.render('edit.html',context);
    });
});

router.post('/update/*', function(req, res, next) {
    var arr = req.url.split('/');
    console.log("arr " + arr);
    var addr = arr[2];
    console.log("addr " + addr);
    console.log("req.body.name " + req.body.name);
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
    console.log("data " + data);
    var curCont = new controller(model);
    curCont.editRecord(addr, data, function(){
        var readdr = "/catalog/" + addr;
        res.redirect(readdr);
        //res.sendStatus(304);
    });
});

router.get('/delete/*', function(req, res, next) {

    var arr = req.url.split('/');
    var addr = arr[2];
    console.log(addr);
    var curCont = new controller(model);
    curCont.deleteRecord(addr, function(result){
        res.redirect('/');
    });
});

module.exports = router;
