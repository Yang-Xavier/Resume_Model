/**
 * Created by yangbingxun on 2017/4/16.
 */
var express = require('express');

var fs = require('fs');
var iconv = require('iconv-lite');
// var cheerio = require('cheerio');

var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {
    res.end('save');
});

router.post('/*',function(req,res,next){
    var data=JSON.parse(req.body.data);

    var html=data.html;

    var name=req.path.substr(1,req.path.length);

    name=littleUrl.decode(name);

    if(!/^[^\/|^\.]*$/.test(name)){
        res.end('输入名字含有非法字符！');
        console.log('输入名字含有非法字符！');
        return
    };

    var fname=require('path').resolve(__dirname,'../resumes/'+name+'.html');


    html=html.replace(/\/plus\//g,'+');

    fs.open(fname,'w',function(err){
        if(err){
            console.log(err);
            res.end(err);
        }


        fs.writeFile(fname,html,function(err){
            if(err){
                console.log(err);
                res.end(err);
            }
            // res.end('http://resume.forybx.com/resumes/'+name);
            res.end('http://localhost:3000/resumes/'+name);
        })
    })

});

var littleUrl ={
// public method for url encoding
    encode : function (string){
        return escape(this._utf8_encode(string));
    },
// public method for url decoding
    decode : function (string){
        return this._utf8_decode(unescape(string));
    },
// private method for UTF-8 encoding
    _utf8_encode : function (string){
        string = string.replace(/ /g,"");
        var utftext ="";
        for (var n = 0; n < string.length; n++){
            var c = string.charCodeAt(n);
            if (c < 128){
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)){
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else{
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
// private method for UTF-8 decoding
    _utf8_decode : function (utftext){
        var string ="";
        var i = 0;
        var c =0,
            c1 =0,
            c2 = 0,
            c3;
        while ( i < utftext.length ){
            c = utftext.charCodeAt(i);
            if (c < 128){
                string += String.fromCharCode(c);
                i++;
            }else if((c > 191) && (c < 224)){
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else{
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
module.exports = router;

