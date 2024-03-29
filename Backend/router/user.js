const router = require("express").Router();
const User = require("../Modals/User");
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTSEC = "#2@!@$ndja45883 r7##";
const { verifyToken } = require("./verifytoken");
const Post = require("../Modals/Post");


//Create User
router.post("/create/user",
    body('email').isEmail(),
    // password must be at least 6 chars long
    body('password').isLength({ min: 6 }),
    body('username').isLength({ min: 5 }),
    body('phonenumber').isLength({ min: 10 }),
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json("some error occured !")
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(200).json("please login with correct password")
            };
            const salt = await bycrypt.genSalt(10);
            const secpass = await bycrypt.hash(req.body.password, salt)

            user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: secpass,
                profile: req.body.profile,
                phonenumber: req.body.phonenumber
            })
            const accessToken = jwt.sign({
                id:user._id,
                username:user.username
            }, JWTSEC);
            await user.save();
            res.status(200).json({user, accessToken})
        }
        catch (error) {
            return res.status(400).json('Internal error occured')
        }
    }    
)

//Login 
router.post("/login", 
    body('email').isEmail(), 
    body('password').isLength({min: 6}),
    async(req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json("Some Error Occured")
        }
        try{
            const user = await User.findOne({email:req.body.email});
            if(!user){
                return res.status(400).json("User doesn't found")
            }
            const Comparepassword = await bycrypt.compare(req.body.password, user.password);
            if(!Comparepassword){
                return res.status(400).json("password error")
            }
            const accessToken = jwt.sign({
                id: user._id,
                username: user.username
            }, JWTSEC);
            const {password, ...other} = user._doc
            res.status(200).json({other, accessToken});
        } catch (error){
            res.status(500).json("Internal error occured")
        }
    }
)

//Following
router.put("/following/:id", verifyToken, async(req, res) => {
    if(req.params.id !== req.body.user){
        const user = await User.findById(req.params.id);
        const otheruser = await User.findById(req.body.user);

        if(!user.Followers.includes(req.body.user)){
            await user.updateOne({$push:{Followers:req.body.user}});
            await otheruser.updateOne({$push:{Following:req.params.id}});
            return res.status(200).json("User has followed");
        }else{
            await user.updateOne({$pull:{Followers:req.body.user}});
            await otheruser.updateOne({$pull:{Following:req.params.id}});
            return res.status(200).json("User has Unfollowed");
        }

    }else{
        return res.status(400).json("You can't follow yourself")
    }
})

//Fetch post from followers
router.get("/flw/:id", verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const followersPost = await Promise.all(
            user.Following.map((item) => {
                return Post.find({ user: item })
            })
        )
        const userPost = await Post.find({ user: user._id });

        res.status(200).json(userPost.concat(...followersPost));
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
})
   
//Update User Profile
router.put("/update/:id", verifyToken, async(req, res) => {
    try{
        if(req.params.id === req.user.id){
            if(req.body.password){
                const salt = await bycrypt.genSalt(10);
                const secpass = await bycrypt.hash(req.body.password, salt);
                req.body.password = secpass;
                const updateuser = await User.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                });
                await updateuser.save();
                res.status(200).json(updateuser);
            }
        }else{
            return res.status(400).json("Your are not allow to update this user")
        }

    } catch(error){
        return res.status(500).json("Internal server error")
    }
})

//Delete User account
router.delete("/delete/:id", verifyToken, async(req, res) => {
    try{
        if(req.params.id !== req.user.id){
            return res.status(400).json("Account doesn't match")
        } else{
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("User account has been deleted")
        }
    } catch (error){
        return res.status(500).json("Internal server error")
    }
})

//get user details for post
router.get("/post/user/details/:id", async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json("User not found")
        }
        const {email, password, phonenumber, Followers, Following, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error){
        return res.status(500).json("Internal server error")
    }
})

//get user to follow
router.get("/all/user/:id", async(req, res) =>{
    try{
        const allUser = await User.find();
        const user = await User.findById(req.params.id);
        const followinguser = await Promise.all(
            user.Following.map((item) => {
                return item;
            })
        )
        let UserToFollow = allUser.filter((val) => {
            return !followinguser.find((item) => {
                return val._id.toString() === item;
            })
        })
        let filteruser = await Promise.all(
            UserToFollow.map((item) =>{
                const {email, phonenumber, Followers, Following, password, ...others} = item._doc;
                return others
            })
        )
        res.status(200).json(filteruser)
    } catch (error) {

    }
})

module.exports = router;