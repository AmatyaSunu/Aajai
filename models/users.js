var mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  username : String,
  password : String,
  sem : Number,
  faculty : String,
  subjects : [{
    subjectName : String,
    subjectCode : String,
    percent : Number
  }],
  chapters : [{
    chapterName : String,
    subjectCode : String,
    hours : Number,
    marks : Number,
    checked : Boolean
  }]
});

module.exports = mongoose.model('Users', UsersSchema);
