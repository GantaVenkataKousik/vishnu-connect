import express from 'express';

import path from 'path';
import { postUploadController,homeController,incrementLikeCntController,bookmarkTweetController,commentController,addCommentController } from '../controllers/vishnu/postControllers.js';
import { myPostsController,myLikedTweetsController,myBoomarkedTweetsController} from '../controllers/vishnu/userPostController.js';


//router object
const router = express.Router()

//TWEET POST
// router.post("/uploadTweet", postUploadController);

router.get("/home",homeController);

router.get("/home/incrementLikeCnt",incrementLikeCntController);

router.get("/myLikedTweets",myLikedTweetsController);

router.get("/myBoomarkedTweets",myBoomarkedTweetsController);

router.get("/bookmarkTweet",bookmarkTweetController);

router.get("/getComments",commentController );

router.post("/addComment",addCommentController);

router.get("/myPosts", myPostsController);

router.post("/upload",postUploadController);
  
  export default router;