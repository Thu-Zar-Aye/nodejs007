var express = require('express');
var router = express.Router();
var Post=require('../../model/Post');
var bcrypt=require('bcryptjs');
var checkAuth=require('../middleware/check-auth');

router.get('/list',checkAuth,function(req,res){
  Post.find(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else{
      res.status(200).json({
        posts:rtn
      });
    }
  })
})

router.post('/add',function(req,res,next){
  var post=new Post();
  post.title=req.body.title;
  post.content=req.body.content;
  post.author=req.body.author;
  post.save(function(err,rtn){
    if (err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else{
      res.status(200).json({
        posts:rtn
      });
    }
  })
})
router.get('/:id',checkAuth,function(req,res){
  Post.findById(req.params.id,function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else{
      res.status(201).json({
          posts:rtn
      })
    }
  })
})
router.patch('/:id',checkAuth,function(req,res){
  var update={};
  for (var opt of req.body) {
    update[opt.proName]=opt.proValue
  }
  Post.findByIdAndUpdate(req.params.id,{$set:update},function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else{
      res.status(200).json({
        message:"Post Account Update!!",
        posts:rtn
      })
    }
  })
})
router.delete('/:id',checkAuth,function(req,res){
  Post.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err){
    res.status(500).json({
      message:"Internal Server Error",
      error:err
    })
  }else{
    res.status(200).json({
      message:"Post Account Delete"
    })
  }
  })
})
module.exports = router;
