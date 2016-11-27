/**
 * Created by MASTER on 23.11.2016.
 */
var mongoose = require('mongoose');

var productController = function(productModel){
    this.pmodel = productModel;
};

productController.prototype.findOneByName = function(sname, callback)
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

productController.prototype.findByCategory = function(scat, callback)
{
    var me = this;
    var s;
    me.pmodel.find(null, {category: scat}, function(err, cat){
        if(err){
            console.log(err);
        }
        if(cat){
            console.log('identity');
            s = cat;
        }
        else{
            console.log('non identity');
            s = 'non identity';
        }
        callback(s);
    });
}

productController.prototype.findOneByID = function(id, callback)
{
    var me = this;
    var s;
    me.pmodel.findOne({_id: id}, function(err, id){
        if(err){
            console.log(err);
        }
        if(id){
            console.log('identity');
            s = id;
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

productController.prototype.editRecord = function(id, data, callback)
{
    var me = this;
    me.pmodel.findOneAndUpdate({_id: id},
        data,
        {},
        function(err){
        if(err){
            console.log(err);
        }
        callback();
    });
}

productController.prototype.createRecord = function(newProduct)
{
    var me = this;
    var s = me.pmodel.findOneByName({name: newProduct.name}, function(err, name){
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