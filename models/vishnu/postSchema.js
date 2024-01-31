import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userid:String,
    postedOn:Date,
    tweetBody:String,
    imgUrl:String,
    commentsCnt:{
      type:Number,
      default:0
    },
    repostCnt:{
      type:Number,
      default:0
    },
    likesCnt:{
      type:Number,
      default:0
    }
  });


  export default mongoose.model('posts', postSchema);