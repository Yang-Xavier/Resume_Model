/**
 * Created by yangbingxun on 2017/4/16.
 */
var fs = require('fs');
var iconv = require('iconv-lite');

fs.readFile('font-awesome.css',function(err,data){
    if(err) console.log(err);

    data = iconv.decode(data, 'gbk')

    var arr = data.split('.')

    var arr2=[];

    arr.forEach(function(icon){
        arr2.push("'"+icon.split(':')[0]+"'")
    })

    var fstr = ['export default{ icons:','','}'];
    var arrstr = ['[','',']'];

    arrstr[1]=arr2.join(',')
    fstr[1]=arrstr.join('');

    fs.open('icons.js','w',function(err){
        fs.writeFile('icons.js',fstr.join(''),function(err){
            if(err) console.log(err)

            console.log('ok')
        })
    })
})
