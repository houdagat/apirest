// create server

const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const app = express()
const port = 5000

// middleware
app.use(express.json()) 

// connect to UsersDB
mongoose.connect('mongodb://localhost:27017/UsersDB');
console.log('mongoose connected')


app.listen(port,(err)=>{
    err? console.log('error'):console.log(`server running on port ${port}`)
})
// add :   POST :  ADD A NEW USER TO THE DATABASE 
app.post('/add', async (req, res) => {
    try {
      const newuser = new User(req.body);
      const user = await newuser.save();
      res.send({msg:'user added',user})
    } catch (error) {
      console.log(error)
    }
  });

  //GET ALL :  RETURN ALL USERS 
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.send({msg:'data fetched',users})
    } catch (error) {
      console.log(error)
    }
  });

  //PUT : EDIT A USER BY ID 
  app.put('/users/:id', async (req, res) => {
    try {
      const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body);
  
      res.send({ msg: 'User updated', user: userUpdated });
    } catch (error) {
      console.log(error);
      
    }
  });

  // DELETE : REMOVE A USER BY ID 
  app.delete('/users/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.send({ message: 'User deleted' });
    } catch (error) {
        console.log(error);
    }
  });
  


 


