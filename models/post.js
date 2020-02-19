const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');

const postSchema = new Schema ({
    heading: { type:String, required: true },
    post:  { type:String, required: true },
    owner: {
        ref: 'user',
        type: Schema.Types.ObjectId
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('post', postSchema)