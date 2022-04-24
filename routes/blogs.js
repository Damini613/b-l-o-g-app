const express = require("express");

const router = express.Router();
const Blogs = require("../schema/blogs");

//all routes or end points

const getAllBlogPosts = async (req, res) => {
  try {
    const data = await Blogs.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const addBlogPost = async (req, res) => {
  try {
    const newBlog = new Blogs({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      flieUpload: req.body.flieUpload,
      upvote: req.body.upvote,
      creator: req.body.creator,
      createAt: req.body.createAt,
    });
    await newBlog.save();
    console.log("data save", newBlog);
    res.status(200).json({ message: "blog posted ..." });
  } catch (error) {
    console.log(error);
    res.status(500).json(newBlog);
  }
};

const getSinglePost = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Blogs.findById(_id);
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateSingleBlogPost = async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const data = await Blogs.findById(_id);
    if (data) {
      const resp = await Blogs.findByIdAndUpdate(_id, {
        title: body.title,
        description: body.description,
        tags: body.tags,
        flieUpload: body.flieUpload,
        upvote: body.upvote,
        creator: body.creator,
        createAt: body.createAt,
      });
      res.status(200).json({ message: "updated blog successfully !" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const removeSingleBlogPost = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Blogs.findById(_id);
    if (data) {
      const resp = await Blogs.findByIdAndDelete(_id);
      res.status(200).json({ message: "Blog deleted successfully !" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const likeBlogPost = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Blogs.findById(_id);
    if (data) {
      const resp = await Blogs.findByIdAndUpdate(_id, {
        upvote: ++data.upvote,
      });
      res.status(200).json({ message: "upvoted successfully !" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

router.get("/", getAllBlogPosts);
router.post("/", addBlogPost);
router.get("/:id", getSinglePost);
router.patch("/:id", updateSingleBlogPost);
router.delete("/:id", removeSingleBlogPost);
router.patch("/:id/likeedBlogPost", likeBlogPost);

module.exports = router;
