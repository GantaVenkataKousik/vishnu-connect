import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userid:String,
    postid:String,
    comment:String
});


export default mongoose.model('commentsSchema', commentSchema);
