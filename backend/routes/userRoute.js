const express = require('express')
const User = require('../models/userModel')
const {getToken, isAdmin,isAuth} = require('../util')
const router = express.Router();

router.post('/signout', async (req,res)=> {
    try {
    const signoutUser = await User.findOne({
        email: req.body.email,
    })
    if(signoutUser){
        console.log("signin",User.find())
        res.send({msg: 'Logged out'});
    } else {
        res.sendStatus(401).send({msg: 'Invalid email'})
    }
} catch(error){
    console.log("err",error)
}
})
router.delete("/:id", isAuth,isAdmin, async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      const deletedUser = await user.remove();
      res.send(deletedUser);
    } else {
      res.status(404).send("User Not Found.")
    }
  });
router.post('/signin', async (req,res)=> {
    try {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(signinUser){
        console.log("signin",User.find())
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            password: signinUser.password,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        });
    } else {
        res.sendStatus(401).send({msg: 'Invalid email or password'})
    }
    
} catch(error){
    console.log("err",error)
}
})
router.get('/',async (req,res)=>{
    const users = await User.find({});
    res.send(users)
})
router.post('/register', async (req,res)=> {
    try {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    const newUser = await user.save();
    
    if(newUser){
        console.log("register ",newUser)
        res.send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        })
    }
     else {
        res.sendStatus(401).send({msg: 'Invalid user data'})
    }
} catch(error){
    console.log("err",error)
} 
})

router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  });

router.get('/admin',async (req,res) => {
    try {
        const user = new User({
            name: 'hiral',
            email: 'admin@gmail.com',
            password: 'admin',
            isAdmin: true
        });
    
        const newUser = await user.save()
        res.send(newUser)

    } catch(error){
        res.send({msg: error.message})
    }
    
})

module.exports = router