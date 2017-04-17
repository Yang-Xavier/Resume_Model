/**
 * Created by yangbingxun on 2017/4/16.
 */

var index = require('./routes/index');
var users = require('./routes/users');
var resumeModel = require('./routes/resumeModel');
var save = require('./routes/save');
var resumes = require('./routes/resumes');

module.exports=function(app){
    app.use('/', index);
    app.use('/users', users);
    app.use('/resumemodel',resumeModel);
    app.use('/save',save);
    app.use('/resumes',resumes);
};