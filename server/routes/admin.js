const express = require('express');
const Post = require('../modles/Post');
const User = require('../modles/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const adminLayout = '../views/layouts/admin';

const jwtSecret = process.env.JWTSECRET;

const authMiddleWare = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unatuorized ✋' });
  }
  try {
    const decoded = jwt.decode(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unatuorized ✋' });
  }
};
/**
 * Get
 * /admin : admin login
 */
router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: 'Admin',
      description: 'A Nodejs Blog Was Build With Express & MongoDB',
    };
    /*
    -when rendring express look for the stream that it will
        search for the rendred page
    -and by default the stream is views/layout.ejs and NOTE
    -you've changed the default by this line =>
        -app.set('layout','./layouts/main');
    -and the render method take and options object 
    -when you set layout : to some other path 
    -you tell express you want to render this page but 
    -using a dirrent layout
    */
    res.render('admin/login', { locals, layout: adminLayout });
  } catch (err) {
    console.log(err);
    res.redirect('blachHole');
  }
});

/**
 * Post
 * /admin : check login
 */
router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials ✋' });
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(401).json({ message: 'Invalid credentials ✋' });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
  } catch (err) {
    res.redirect('/blachHole');
  }
});

/**
 * Get
 * Admin dashboard
 */

router.get('/dashboard', authMiddleWare, async (req, res) => {
  try {
    const locals = {
      title: 'Dasboard',
      description: 'A Nodejs Blog Was Build With Express & MongoDB',
    };
    const data = await Post.find();
    res.render('admin/dashboard', {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (err) {
    res.redirect('/blackHole');
  }
});

/**
 * Get
 * Admin new post
 */
router.get('/add-post', async (req, res) => {
  try {
    const locals = {
      title: 'Add Post',
      description: 'A Nodejs Blog Was Build With Express & MongoDB',
    };
    res.render('admin/add-post', {
      locals,
      layout: adminLayout,
    });
  } catch (err) {
    res.redirect('/blackHole');
  }
});
/**
 * Post
 * Admin create new post
 */
router.post('/add-post',authMiddleWare ,async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = await Post.create({ title, body });
    res.redirect('/dashboard')
  } catch (err) {
    res.redirect('/blackHole');
  }
});

/**
 * Get
 * Admin edit post
 */
router.get('/edit-post/:id', authMiddleWare, async (req, res) => {
  try {
    const locals = {
      title: 'Edit Post',
      description: 'A Nodejs Blog Was Build With Express & MongoDB',
    };
    const postId = req.params.id;
    const data = await Post.findById(postId);
    res.render('admin/edit-post', {
      locals,
      data
    });
  } catch (err) {
    res.redirect('/blackHole');
  }
});
/**
 * PUT
 * Admin edit post
 */
router.put('/edit-post/:id', authMiddleWare, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
    }
    const data = await Post.findByIdAndUpdate(postId, updatedPost);
    res.redirect(`/edit-post/${postId}`)
  } catch (err) {
    res.redirect('/blackHole');
  }
});

/**
 * Delete
 * Admin delete post
 */
router.delete('/delete-post/:id', authMiddleWare, async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId);
    const deletedPost = await Post.findByIdAndDelete(postId);
    res.redirect('/dashboard')
  } catch (err) {
    res.redirect('/blackHole');
  }
});

/**
 * GET
 * Admin logout
 */
router.get('/logout',(req,res) => {
    res.clearCookie('token');
    res.redirect('/');
})














/**
 * Post
 * /register
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(200).json({
        message: 'user was created',
        user,
      });
    } catch (err) {
      if (err.code === 11000) {
        //this means duplicate key error
        res.status(409).json({
          message: 'the user is already exists',
        });
      }
      res.status(500).json({
        message: 'internal server error',
      });
    }
  } catch (err) {
    res.redirect('/blachHole');
  }
});
module.exports = router;
