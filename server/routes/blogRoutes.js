require('../models/Blogs');
const mongoose = require('mongoose');
const Blog = mongoose.model('blog');

module.exports = (app) => {
    app.post('/api/blog', async (req, res) => {
        const blog = new Blog({
            ...req.body
        });
        try {
            await blog.save();
            res.send(blog);
        } catch (e) {
            res.status(400).send(e);
        }
    });

    app.get('/api/blogs', async (req,res) => {
        try {
            const blogs = await Blog.find({});
            res.send(blogs);
        }catch (e) {
            return res.status(404).send(e)
        }
    });

    app.get('/api/blog/:id', async (req, res) => {
        const _id = req.params.id;
        try{
            const blog = await Blog.findById(_id);
            if(!blog){
                return res.status(404).send();
            }
            return res.send(blog);
        }catch (e) {
            return res.status(500).send(e)
        }
    })
};