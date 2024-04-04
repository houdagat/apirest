const mongoose = require('mongoose')
const schema =  mongoose.Schema

const userSchema = new schema ({

    name:{
        type:String,
        required: true
    },
    age:{
        type:Number
    },
   email:{
    type:String,
    unique:true
    },
  phone: {
    type: Number,
    },
dateCreation: {
    type: Date,
    default: Date.now()
    }

})

module.exports = mongoose.model('User',userSchema)