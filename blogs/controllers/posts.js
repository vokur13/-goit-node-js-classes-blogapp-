/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */
let posts = [
  { id: '1', title: 'test1', content: 'tex1t' },
  { id: '2', title: 'test2', content: 'text2' },
  { id: '3', title: 'test3', content: 'text3' },
];

const getPosts = function (req, res, next) {
  res.json({
    status: 'success',
    code: 200,
    data: {
      posts,
    },
  });
};

const getPostByID = function (req, res, next) {
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
};

const addPost = (req, res) => {
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
};

const putPost = (req, res) => {
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
};

const patchPost = (req, res) => {
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
};

const deletePost = (req, res) => {
  const { id } = req.params;
  const newPosts = posts.filter((item) => item.id !== id);
  posts = [...newPosts];
  res.status(204).json();
};

module.exports = {
  getPosts,
  getPostByID,
  addPost,
  putPost,
  patchPost,
  deletePost,
};
