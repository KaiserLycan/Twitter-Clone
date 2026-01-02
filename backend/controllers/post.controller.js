import {v2 as cloudinary} from "cloudinary";

import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";

export const createPost = async (req, res) => {
    try {

        const {text} = req.body;
        let {img} = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error: "User not found"});

        if(!text && !img) return res.status(400).json({error: "Post must have text or image."});

        if(img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        console.log(img)

        const newPost = new Post({
            user: userId,
            text,
            img,
        });

        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        console.log("Error in createPost controller", error.message);
        res.status(400).json({error: "Internal Server Error", description: error.message});
    }
}

export const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        if(!post) return res.status(404).json({error: "Post not found"});

        if(post.user.toString() != req.user._id) return res.status(401).json({error: "You are not authorized to modify this post."});


        if( post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(id);
        res.status(200).json({success: "Post deleted successfully."});
    }
    catch (error) {
        console.log("Error in deletePost controller", error.message);
        res.status(500).json({error: "Internal Server Error", description: error.message});
    }
}

export const commentOnPost = async (req, res) => {
    try {

        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if(!text) {
            return res.status(400).json({error: "Text field is required."});
        }

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({error: "Post not found"});
        }

        const comment = {
            user: userId,
            text
        }

        post.comments.push(comment)
        await post.save();

        res.status(200).json(post);
    }
    catch (error) {
        console.log("Error in createPost controller", error.message);
        res.status(500).json({error: "Internal Server Error", description: error.message});
    }

}

export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if(!post) return res.status(404).json({error: "Post not found"});

        const hasLiked = post.likes.includes(userId);

        if(hasLiked) {
            //unlike
            await Post.findByIdAndUpdate(postId, { $pull: {likes: userId}});
            await User.findByIdAndUpdate(userId, { $pull: {likedPosts: postId}});

            res.status(200).json({success: "Post unliked successfully."});
        }
        else {
            //like
            await Post.findByIdAndUpdate(postId, {$push: {likes: userId}})
            await User.findByIdAndUpdate(userId, { $push: {likedPosts: postId}});

            const newNotification = new Notification({
                to: post.user,
                from: userId,
                type: "like",
            });

            await newNotification.save();
            res.status(200).json({success: "Post liked successfully."});
        }

    }
    catch (error) {
        console.log("Error in like post controller", error.message);
        res.status(500).json({error: "Internal Server Error", description: error.message});
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1}).populate({
                path: "user",
                select: "-password"
            }).populate({
                path: "comments.user",
                select: "-password"
            });

        if(posts.length === 0) res.status(200).json([]);
        res.status(200).json(posts);
    }
    catch (error) {
        console.log("Error in getAllPosts controller", error.message);
        res.status(500).json({error: "Internal Server Error", description: error.message});
    }
}

export const getLikedPosts = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user) res.status(4040).json({error: "User not found"});

        const likedPosts = await Post.find({_id: {$in: user.likedPosts}}).
        populate({
            path: "user",
            select: "-password"
        }).populate({
            path: "comments.user",
            select: "-password"
        })



        res.status(200).json(likedPosts);
    }
    catch (error) {
        console.log("Error in getLikedPosts controller", error.message);
        res.status(500).json({error: "Internal Server Error", description: error.message});
    }
}


export const getFollowingPost = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user) res.status(404).json({error: "User not found"});

        const followingPost = await Post.find({user: {$in: user.following}}).sort({createdAt: -1}).
            populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            });

        res.status(200).json(followingPost);
    }
    catch (error) {
        console.log("Error in getFollowingPosts controller", error.message);
        res.status(500).json({error: "Internal Server Error", description: error.message});
    }
}