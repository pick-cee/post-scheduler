import express, { NextFunction } from 'express'
import client from '../config/redis'
import Post from '../models/post'

export async function createPost(
    request: express.Request,
    response: express.Response,
    next: NextFunction
) {
    try {
        let newPost, user
        const { content, isPrivate, date } = request.body
        user = await client.get('user') as any
        const newUser = JSON.parse(user)
        if (!user) {
            user = request.user
            await client.setEx('user', 86400, JSON.stringify(user._id))
            newPost = new Post({
                author: user._id,
                content,
                private: isPrivate,
                date
            })
            await newPost.save()
            return response.status(201).json({
                message: 'Post created successfully'
            })
        }
        newPost = new Post({
            author: newUser,
            content,
            private: isPrivate,
            date
        })
        await newPost.save()
        return response.status(201).json({
            message: 'Post created successfully'
        })
    }
    catch (error: any) {
        return response.status(500).json({
            message: 'Server error.....',
            error: error.message
        })
    }
}

export async function getAllPosts(
    request: express.Request,
    response: express.Response,
    next: NextFunction
) {
    let posts
    posts = await client.get('all_posts')
    if (!posts) {
        posts = await Post.find().exec()
        await client.setEx('all_posts', 300, JSON.stringify(posts))

        return response.status(200).json({
            message: 'All posts....',
            posts
        })
    }
    return response.status(200).json({
        message: 'All posts',
        data: JSON.parse(posts)
    })
}

export async function getUserPosts(
    request: express.Request,
    response: express.Response,
    next: NextFunction
) {
    const userId = request.user._id
    const redisKey = `user:${userId}:posts`
    let userPosts, user: any
    userPosts = await client.get(redisKey) as any
    if (!userPosts) {
        userPosts = await Post.find({ author: userId })
        if (userPosts.length === 0) {
            return response.status(200).json({
                message: 'No posts yet.... try making a post'
            })
        }
        await client.setEx(redisKey, 300, JSON.stringify(userPosts))
        return response.status(200).json({
            message: 'User posts...',
            userPosts
        })
    }
    return response.status(200).json({
        message: 'User posts......',
        data: JSON.parse(userPosts)
    })
}

export async function updatePost(
    request: express.Request,
    response: express.Response,
    next: NextFunction
) {
    let user
    const postId = request.query.postId
    user = await client.get('user') as any
    const post = await Post.findOne({ _id: postId, author: JSON.parse(user) })
    if (!post) {
        return response.status(404).json({
            message: 'No post found'
        })
    }
    const updatedPost = await Post.findOneAndUpdate({ _id: postId, author: JSON.parse(user) }, request.body, { $new: true })
    return response.status(200).json({
        message: 'Update success....',
        data: updatedPost
    })
}

export async function deletePost(
    request: express.Request,
    response: express.Response,
    next: NextFunction
) {
    let user
    const postId = request.query.postId
    user = await client.get('user') as any
    const userPost = await Post.findOne({ _id: postId, author: JSON.parse(user) })
    if (!userPost) {
        return response.status(404).json({
            message: 'No post found'
        })
    }
    const deletedPost = await Post.findOneAndDelete({ _id: postId, author: JSON.parse(user) })
    return response.status(200).json({
        message: 'Post deleted successfully'
    })
}