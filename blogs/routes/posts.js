const express = require('express');
const Joi = require('joi');
const router = express.Router();

let posts = [
  { id: '1', title: 'test1', content: 'tex1t' },
  { id: '2', title: 'test2', content: 'text2' },
  { id: '3', title: 'test3', content: 'text3' },
];

/* GET api/posts listing. */
router
  .get('/', function (req, res, next) {
    res.json({
      status: 'success',
      code: 200,
      data: {
        posts,
      },
    });
  })
  /* GET api/posts/[id] listing. */
  .get('/:id', function (req, res, next) {
    const { id } = req.params;
    const [post] = posts.filter((item) => item.id === id);
    if (!post) {
      return res.status(404).json({
        code: 404,
        message: `Post id: ${id} not found`,
      });
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { post },
    });
  })
  .post('/', (req, res) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      content: Joi.string().min(3).max(512).required(),
    });

    const validateData = schema.validate(req.body);

    if (validateData.error) {
      return res.status(404).json({
        code: 404,
        message: validateData.error.details,
      });
    }

    const { title, content } = req.body;

    posts.push({
      id: new Date().getTime().toString(),
      title,
      content,
    });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { posts },
    });
  })
  .put('/:id', (req, res) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      content: Joi.string().min(3).max(512).required(),
    });

    const validateData = schema.validate(req.body);

    if (validateData.error) {
      return res.status(404).json({
        code: 404,
        message: validateData.error.details,
      });
    }

    const { id } = req.params;
    const { title, content } = req.body;
    const [post] = posts.filter((item) => item.id === id);
    post.title = title;
    post.content = content;
    res.json({
      status: 'success',
      code: 200,
      data: { post },
    });
  })
  .patch('/:id', (req, res) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30).optional(),
      content: Joi.string().min(3).max(512).optional(),
    });

    const validateData = schema.validate(req.body);

    if (validateData.error) {
      return res.status(404).json({
        code: 404,
        message: validateData.error.details,
      });
    }
    const { id } = req.params;
    const { title, content } = req.body;
    const [post] = posts.filter((item) => item.id === id);
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    res.json({
      status: 'success',
      code: 200,
      data: { post },
    });
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;
    const newPosts = posts.filter((item) => item.id !== id);
    posts = [...newPosts];
    res.status(204).json();
  });

module.exports = { postsRouter: router };
