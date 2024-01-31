import userSchema from "../../models/auth/userSchema.js";
import postSchema from "../../models/vishnu/postSchema.js";
import userPostsSchema from "../../models/vishnu/userPostsSchema.js";

export const myPostsController = async(req, res) => {
    try{
        const userid = req.query.userid;
        const myPosts = await postSchema.find({userid:userid});
        const u = await userSchema.findOne({_id:userid});

        const allTweets = [];
        for (const post of myPosts) {
            const user = await userSchema.findOne({ _id: post.userid });
            const obj = {
              post,
              user
            };
            allTweets.push(obj);
          }
        const header = "My Posts";
        res.render("vishnu/myPosts",{allTweets,u,header});
        
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: "Why this was getting wrong"
        })
    }
};

export const myLikedTweetsController = async(req, res) => {
    try{
        const userid = req.query.userid;
        const bookmakedPosts = await userPostsSchema.find({userid:userid,role:0});
        const u = await userSchema.findOne({_id:userid});

        const allTweets = [];
        for (const p of bookmakedPosts) {
            const post = await postSchema.findOne({_id:p.postid});
            const user = await userSchema.findOne({ _id: post.userid });
            const obj = {
              post,
              user
            };
            allTweets.push(obj);
          }
        const header = "Liked Tweets";

        res.render("vishnu/myPosts",{allTweets,u,header});
        
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: "Why this was getting wrong"
        })
    }
};

export const myBoomarkedTweetsController = async(req, res) => {
    try{
        const userid = req.query.userid;
        const bookmakedPosts = await userPostsSchema.find({userid:userid,role:1});
        const u = await userSchema.findOne({_id:userid});

        const allTweets = [];
        for (const p of bookmakedPosts) {
            const post = await postSchema.findOne({ _id:p.postid });
            const user = await userSchema.findOne({ _id: post.userid });
            const obj = {
              post,
              user
            };
            allTweets.push(obj);
          }
          console.log(allTweets);
        const header = "Bookmarked Tweets";

        res.render("vishnu/myPosts",{allTweets,u,header});
        
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: "Why this was getting wrong"
        })
    }
};
