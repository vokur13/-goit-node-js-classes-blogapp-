/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
const express = require('express');
const router = new express.Router();

const {
  getPosts,
  getPostByID,
  addPost,
  putPost,
  patchPost,
  deletePost,
} = require('../controllers/posts');

const {
  addPostValidation,
  patchPostValidation,
} = require('../middlewares/validation');

router
  .get('/', getPosts)
  .get('/:id', getPostByID)
  .post('/', addPostValidation, addPost)
  .put('/:id', addPostValidation, putPost)
  .patch('/:id', patchPostValidation, patchPost)
  .delete('/:id', deletePost);

module.exports = { postsRouter: router };
