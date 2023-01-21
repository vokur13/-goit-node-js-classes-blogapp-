const express = require('express');
const router = express.Router();

const posts = [
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
    const [post] = posts.filter((item) => item.id === req.params.id);
    res.json({
      status: 'success',
      code: 200,
      data: {
        post,
      },
    });
  })
  .post('/', (req, res) => {
    const { title, content } = req.body;
    posts.push({
      //   id: Date.now().toString(),
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
  .put('/:id', (req, res) => {})
  .delete('/:id', (req, res) => {
    const posts = posts.filter((item) => item.id !== req.params.id);
    res.json({ posts });
  });

module.exports = { postsRouter: router };
