'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User  = require('./userModel')

var TaskSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  },
  owner: {
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'Person'
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);