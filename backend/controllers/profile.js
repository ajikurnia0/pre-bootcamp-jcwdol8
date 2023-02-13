import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// This file is used to fetch/manipulate the data of the user who is LOGGED IN. this includes loading their profile pic, changing data like bio etc.
// Easier way to of managing the distinction between the logged in users profile and other users (at least that is what I think when making this file)

export const getUsernameofLoggedInUser = asyncHandler(async (req, res) => {
    try {
        const findUser = await User.findById(req.user).select('userName profilePic _id')
        // 'following', 'posts')
        res.status(200).json(findUser)

    } catch (err) { throw err }

})

export const getProfileDataForEditPage = asyncHandler(async (req, res) => {

    try {
        const findUserData = await User.findById(req.user).select('profilePic userName fullName bio website')
        res.status(200).json(findUserData)

    } catch (err) {
        throw err
    }


})

export const postUpdatedProfileDataforEditPage = asyncHandler(async (req, res) => {

    try {

        const { fullName, userName, bio, website } = req.body

        const updatedData = {
            fullName,
            userName,
            bio,
            website
        }

        const updatedUserData = await User.findByIdAndUpdate(req.user, updatedData, { new: true })
        return res.json(updatedUserData)

    } catch (err) {
        throw err
    }

})

export const uploadProfilePicToCloudinary = (req, res) => {

    console.log('req.file: ', req.file)
    const parser = new DatauriParser()
    const extName = path.extname(req.file.originalname).toString();
    const file64 = parser.format(extName, req.file.buffer);
    return uploader.upload(file64.content).then((result) => {
        const image = result.url


        return res.status(200).json({
            message: 'Your image has been uploaded to cloudinary',
            data: {
                image
            }
        })
    }).catch((err) => res.status(400).json({
        message: 'Something went wrong with your upload to cloudinary',
        data: { err }
    }))


}

export const uploadProfilePic = async (req, res) => {
    console.log(req.body)
    const newPost = new Post({
        photo: req.body.photo,
        caption: req.body.caption,
        postedBy: req.user,
    })


    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
        await User.findOneAndUpdate({ _id: req.user }, { $push: { posts: savedPost._id }, $inc: { postCount: 1 } }, { new: true })
        console.log('New post created')

    } catch (err) { throw err }

}
