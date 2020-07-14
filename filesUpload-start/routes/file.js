var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        console.log("DATA")
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});


_router.post('/download', function(req,res,next){
    console.log(req.body.filename)
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

_router.post('/delete', function(req,res,next){
    console.log(req.body.filename)
    fs.unlinkSync( path.join(__dirname,'../uploads/') + req.body.filename)       
    res.send({menssage:"Completo"})
});



module.exports = _router;