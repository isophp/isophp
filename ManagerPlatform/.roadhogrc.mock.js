var proxy = require('express-http-proxy');
const formidable = require('formidable');
const fs = require('fs');
const superagent = require('superagent');

export default {
    'GET /public' : 'http://devel.isophp.cn',
    'POST /adminApiGate': 'http://devel.isophp.cn',
    'POST /article/upload': function (req, response) {
        var fields=[];
        var files=[];
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.keepExtensions= true;                     //保留后缀格式
        form.uploadDir = '/Users/liushuai/Documents/phpProject/isophp/ManagerPlatform/public/upload/upload';
        form
            .on('field', function(field,value){
                console.log(field,value);
                fields.push({field,value});
            })
            .on('file', function(field,file){
                console.log(field,file);
                files.push({field,file});
            })
            .on('end', function(){
            });
        form.parse(req, function (err) {
            console.log('-> upload done');
            superagent.post("http://devel.isophp.cn/article/upload")
                .attach('editormd-image-file', files[0].file.path)
                /*请求头暂不设置，因为不知道是要'multipart/form-data'还是'json'*/
                // .set("Content-Type", "multipart/form-data")
                .end(function(err,res){

                    if(err || !res.ok){
                        response.json(err);
                    }
                    response.json(res.body);
                });
        });
    }
}