/**
 * Created by MASTER on 23.11.2016.
 */
var mongoose = require('mongoose');
//var Model = require('../models/productModel');

var productController = function(productModel){
    this.pmodel = productModel;
};

//productController.prototype.findAll = function()
//{
//    var me = this;
//    var answer = me.pmodel.findAll();
//    console.log(answer);
//    console.log('1');
//    return answer;
//}

productController.prototype.findOne = function(sname, callback)
{
    var me = this;
    var s;
    me.pmodel.findOne({name: sname}, function(err, name){
        if(err){
            console.log(err);
        }
        if(name){
            console.log('identity');
            s = name;
        }
        else{
            console.log('non identity');
            s = 'non identity';
        }
        callback(s);
    });
}

productController.prototype.findAll = function(callback)
{
    var me = this;
    var s;
    me.pmodel.find({}, function(err, name){
        if(err){
            console.log(err);
        }
        if(name){
            console.log('identity');
            s = name;
        }
        else{
            console.log('non identity');
            s = 'non identity';
        }
        callback(s);
    });
}

productController.prototype.createRecord = function(newProduct)
{
    var me = this;
    var s = me.pmodel.findOne({name: newProduct.name}, function(err, name){
        if(err){
            console.log(err);
        }
        if(name){
            console.log(name);
        }
        else{
            console.log('recording');
            newProduct.save(function (err, product, numberAffected){
                if(err){
                    console.log(err);
                }
                if(numberAffected === 1){
                    console.log('Success!');
                }
                else{

                }
            });
        }
    });
    console.log(s.name);
}

module.exports = productController;