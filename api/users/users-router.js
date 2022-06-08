const express = require('express');
const postsModel = require('../posts/posts-model')
const usersModel = require('./users-model')
const {validateUserId,validateUser,validatePost, errorCheck} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  usersModel.get()
    .then(result=>{
      res.json(result)
    })
    .catch(error=>{next(error)})
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  usersModel.insert(req.body)
    .then(result=>{
      res.json(result)
    })
    .catch(error=>{next(error)})
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  usersModel.update(req.user.id, req.body)
    .then(result=>{
      res.json(result)
    })
    .catch(error=>{next(error)})
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  usersModel.remove(req.user.id)
    .then(result=>{
      res.json(req.user)
    })
    .catch(error=>{next(error)})
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  usersModel.getUserPosts(req.user.id)
    .then(result=>{
      res.json(result)
    })
    .catch(error=>{next(error)})
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  postsModel.insert({text:req.body.text,user_id:req.user.id})
    .then(result=>{
      res.json(result)
    })
    .catch(error=>{next(error)})
});

// do not forget to export the router
module.exports = router