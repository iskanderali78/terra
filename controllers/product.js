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
            s = 'error';
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
            s = 'error';
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
    var res;
    me.pmodel.findOneAndUpdate({_id: id},
        data,
        {},
        function(err, result){
        if(err){
            res = 'errorUpdate';
        }
        else{
            console.log('result:', result);
            res = 'successUpdate';
        }
        callback(res);
    });
}

productController.prototype.createRecord = function(newProduct, callback)
{
    var me = this;
    me.findOneByName(newProduct.name,function(result){
        if(result != 'error' && result != 'non identity'){
            callback('identity');
        }
        else{
            if(result == 'non identity')
            {
                newProduct.save(function (err, product){
                    if(err){
                         callback('errorAdd');
                    }
                    else{
                        callback('successAdd/' + product._id);
                    }
                });
            }
            else
            {
                callback('errorAdd');
            }
        }
    });
}

productController.prototype.deleteRecord = function(id, callback)
{
    var me = this;
    me.findOneByID(id, function(result){
        if(result != 'error' && result != 'non identity'){
            me.pmodel.remove({_id: id},function(err, result){
                if(err){
                    callback('error');
                }
                if(result){
                    callback('success');
                }
            });
        }
        else{
            callback('error');
        }
    });
}

module.exports = productController;