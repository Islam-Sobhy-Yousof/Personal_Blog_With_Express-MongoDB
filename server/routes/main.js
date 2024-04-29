const express = require('express');
const Post = require('../modles/Post');
const router = express.Router();

/**
 * GET
 * Home
 */
router.get('', async (req, res) => {
  try {
    const locals = {
      title: 'Nodejs Blog',
      description: 'A Nodejs Blog Was Build With Express & MongoDB',
    };
    const page = Number.parseInt(req.query.page) || 1;
    const perPage = Number.parseInt(req.query.limit) || 5;
    const data = await Post.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
    ])
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    const count = await Post.countDocuments();
    const nextPage = page + 1;
    const hasNext = nextPage <= Math.ceil(count / perPage);
    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNext ? nextPage : null,
    });
  } catch (err) {
    res.redirect('/blackHole');
  }
});

/**
 * GET
 * /search:term
 */
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: 'Nodejs Blog',
      description: 'A Nodejs Blog Was Build With Express & MongoDB',
    };
    const searchTerm = req.body.searchTerm;
    const searchTermFilterd = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');
    const anotherQuery = {
      title: { $regex: searchTermFilterd, $options: 'i' },
      body: { $regex: searchTermFilterd, $options: 'i' },
    };

    //another way for making query
    const query = {
      $or: [
        { title: { $regex: new RegExp(searchTermFilterd, 'i') } },
        { body: { $regex: new RegExp(searchTermFilterd, 'i') } },
      ],
    };
    const data = await Post.find(query);
    res.render('search', {
      locals,
      data,
    });
  } catch (err) {
    res.redirect('/blackHole');
  }
});

/**
 * Get
 * post:id
 */
router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const data = await Post.findById(postId);
    const locals = {
      title: `Nodejs Blog | ${data.title}`,
      description: 'A Nodejs Blog Was Build With Express & MongoDB',
    };
    res.render('post', {
      locals,
      data,
    });
  } catch (err) {
    res.redirect('/blackHole');
  }
});
module.exports = router;

const inserBlogs = () => {
  Post.insertMany([
    {
      title: 'Introduction to Artificial Intelligence',
      body: 'Artificial intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems...',
    },
    {
      title: 'Exploring Blockchain Technology',
      body: 'Blockchain technology is a decentralized, distributed ledger system that records transactions across multiple computers...',
    },
    {
      title: 'The Rise of Virtual Reality',
      body: 'Virtual reality (VR) is an immersive technology that allows users to experience and interact with computer-generated environments...',
    },
    {
      title: 'Understanding Cloud Computing',
      body: 'Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, and more—over the Internet...',
    },
    {
      title: 'The Internet of Things (IoT) Revolution',
      body: 'The Internet of Things (IoT) refers to the network of physical objects embedded with sensors, software, and other technologies for the purpose of connecting and exchanging data with other devices and systems over the Internet...',
    },
    {
      title: 'Big Data Analytics: Unleashing the Power of Data',
      body: 'Big data analytics is the process of examining large and varied datasets to uncover hidden patterns, unknown correlations, market trends, customer preferences, and other useful information...',
    },
    {
      title: 'Cybersecurity: Protecting Against Digital Threats',
      body: 'Cybersecurity is the practice of protecting computer systems, networks, and data from digital attacks, theft, and damage...',
    },
    {
      title: 'The Evolution of Mobile Technology',
      body: 'Mobile technology has undergone significant evolution over the years, from basic feature phones to powerful smartphones and tablets...',
    },
    {
      title: 'Artificial Neural Networks: Mimicking the Human Brain',
      body: 'Artificial neural networks (ANNs) are computational models inspired by the structure and function of the human brain...',
    },
    {
      title: 'The Future of Quantum Computing',
      body: 'Quantum computing is a revolutionary technology that leverages the principles of quantum mechanics to perform complex calculations...',
    },
  ]);
};
