import postSchema from "../../models/vishnu/postSchema.js";
import userSchema from "../../models/auth/userSchema.js";
import userPostsSchema from "../../models/vishnu/userPostsSchema.js";
import commentsSchema from "../../models/vishnu/commentsSchema.js";

export const homeController = async(req, res) => {
    try{
        const userid = req.query.userid;
        const posts = await postSchema.find();
       
        const user = await userSchema.findOne({_id:userid});

        const allTweets = [];
        for (const post of posts) {
            const uid = post.userid;
            const user = await userSchema.findOne({ _id: uid });
            const obj = {
              post,
              user,
            };
            allTweets.push(obj);
          }
        res.render("vishnu/socialapp",{allTweets,user});
        
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: "Why this was getting wrong"
        })
    }
};

export const addCommentController = async(req,res) => {
    try {
        const { userid, postid, text } = req.body;
        console.log(text);
        const newComment = new commentsSchema({ userid, postid, comment:text });
        await newComment.save();
        res.redirect(`http://localhost:9002/api/v2/vishnu/home?userid=${userid}`); 
      } catch (err) {
        console.error(err);
        res.status(500).send('Error adding comment');
      }
}


export const commentController = async(req,res) => {
    try{
        const userid = req.query.userid;
        const postid=req.query.postid;
        const post = await postSchema.find({_id:postid});
        const u = await userSchema.findOne({_id:post[0].userid});
        const comments = await commentsSchema.find({postid:postid});
        const user = await userSchema.findOne({_id:userid});
        const allCmts = [];
        for (const p of comments) {
            const user = await userSchema.findOne({ _id: p.userid });
            const obj = {
              comment:p.comment,
              user
            };
            allCmts.push(obj);
          }
        console.log(allCmts)

        const allTweets = [];
        allTweets.push(...post,u);
        console.log(allTweets);
        res.render("vishnu/postComments",{
            allCmts,allTweets,user
        })

    }
    catch(err){
        console.log(err);
    }
}


export const incrementLikeCntController = async(req, res) => {
    try{
        const userid = req.query.userid;
        const postid = req.query.postid;

        const isAlreadyLiked = await userPostsSchema.findOne({userid:userid,postid:postid,role:0});
        if(!isAlreadyLiked){
            const updateResult = await postSchema.updateOne(
                { _id : postid },
                {
                  $inc: { likesCnt: 1 } 
                }
              );
              const newLikedUser = new userPostsSchema({
                userid: userid,
                postid: postid,
                role:0
              })
              await newLikedUser.save();
              
        }
        res.redirect(`http://localhost:9002/api/v2/vishnu/home?userid=${userid}`);
    }
    catch(err){
        res.send("error: " + err.message);
    }
}

export const bookmarkTweetController = async(req, res) => {
    try{
        const userid = req.query.userid;
        const postid = req.query.postid;

        const isAlreadyBookmarked = await userPostsSchema.findOne({userid:userid,postid:postid,role:1});
        if(!isAlreadyBookmarked){
              const newBookmarkedUser = new userPostsSchema({
                userid: userid,
                postid: postid,
                role:1
              })
              await newBookmarkedUser.save();
              
        }
        res.redirect(`http://localhost:9002/api/v2/vishnu/home?userid=${userid}`);
    }
    catch(err){
        res.send("error: " + err.message);
    }
}


export const postUploadController = async (req, res) => {
    try {

        const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const meridiem = hours >= 12 ? 'PM' : 'AM'

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${meridiem}`


       const {userid, tweetBody , imgUrl} = req.body;
       const newPost = new postSchema({
        userid,
        tweetBody,imgUrl
       });
       await newPost.save();
       res.redirect(`http://localhost:9002/api/v2/vishnu/home?userid=${userid}`);
    }
    catch (err) {
        console.error(err); // Log the error for debugging.
        return res.status(500).send({
            success: false,
            message: "The product is not added!"
        })
    }
}