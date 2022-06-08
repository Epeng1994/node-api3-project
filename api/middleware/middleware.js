const postsModel = require('../posts/posts-model')
const usersModel = require('../users/users-model')


function logger(req, res, next) {
  let time =  new Date()
  console.log(req.method, req.url, time)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  usersModel.getById(req.params.id)
  .then(result=>{
    if(result){
      req.user = result
      next()
    }else{
      res.status(404).json({ message: "user not found" })
    }
  })
  .catch(error=>{
    res.status(500).json('Bad request')
    return
  })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const {name} = req.body
  if(name == null || name.trim() == ''){
    res.status(400).json({ message: "missing required name field" })
    return
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(req.body.text == null || req.body.text.trim() === ''){
    res.status(400).json({ message: "missing required text field" })
    console.log('passed')
    return
  }else{
    next()
  }
}

function errorCheck (error, req, res, next){
  if(error){
    return res.status(500).json('Bad request')
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  errorCheck
}