import mongoose from 'mongoose';

const userPostsSchema = new mongoose.Schema({
    userid:String,
    postid:String,
    role:Number
  });


  export default mongoose.model('userPosts', userPostsSchema);