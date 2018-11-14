var express = require('express');
var router = express.Router();
var Subjects = require('../models/subjects');
var Chapters = require('../models/chapters');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aajhai' });
});

router.get('/main', function(req, res, next) {
  res.render('main');
});

router.get('/todo', function(req, res, next) {
  res.render('todo');
});

router.get('/addSubject',function(req,res){
  res.render('addSubject');
});

router.get('/signup', function(req, res){
	res.render('signup');
});

router.post('/signup', function (req, res) {
	console.log('sign up successful', req.body);
});

router.get('/profile', function(req, res) {
	res.render('profile');
});

router.post('/profile', function (req, res) {
	console.log("profile enter", req.body);
	res.render('profile');
})

router.post('/addSubject', function(req, res){
  //res.send(req.body);
  var subject = new Subjects({
    subjectName : req.body.subName,
    subjectCode : req.body.subCode,
    sem : req.body.sem,
    faculty : req.body.faculty,
    numOfChapters : req.body.numOfChapters
  });

  var promise = subject.save();
  promise.then((subject) => {
    //console.log('saved subject is',subject);
    res.render('addChapters',{subject});
  }).catch((error) => {
    console.log(error);
  });
});

router.post('/addChapters',function(req, res){
  //res.send(req.body);
  for (var i = 0; i < (req.body.chapterName).length; i++) {
    var chapter = new Chapters({
      chapterName : req.body.chapterName[i],
      subjectCode : req.body.subjectCode[i],
      hours : req.body.hours[i],
      marks : req.body.marks[i]
    });

    var promise = chapter.save();
    promise.then((chapter) => {
      console.log(chapter);
    });
  }
  res.redirect('/adminView');
});

router.get('/adminView',function(req,res){
  Subjects.find().exec(function(err, subjects){
    res.render('adminView',{subjects});
  });
});

router.get('/viewChapters/:subCode',function(req,res){
  Chapters.find({ subjectCode : req.params.subCode }).exec(function(err, chapters){
    //res.send(chapters);
    res.render('viewChapters',{chapters});
  })
});

router.get('/editSubject/:subCode', function(req,res){
  //res.send(req.params.subCode);
  Chapters.find({ subjectCode : req.params.subCode}).exec(function(err,chapters){
    res.render('editSubject',{chapters});
  });
})

router.post('/saveEdited', function(req, res){
  //res.send(req.body);
  for(var i=0; i<req.body.num; i++){
    Chapters.findOneAndUpdate({ _id : req.body._id[i] }, { $set : req.body }, (err, chapter) => {
      if(!err){
        res.redirect('/adminView');
      }else{
        console.log("Error!!",err);
      }
    });
  }
});

router.post('/setProfile',function(req, res){
  //res.send(req.body);
  Subjects.find({ sem : req.body.sem, faculty : req.body.faculty}).exec(function(err, subjects){
    //res.send(subjects);
    res.render('examPrep',{subjects, faculty : req.body.faculty, sem : req.body.sem});
  });
});

module.exports = router;
