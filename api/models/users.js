const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        noms: {
            type:String,
            require:true
        },
        mail:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        role:{
            type:String,
            require:true
        }
    },
);

module.exports = mongoose.model('Users',userSchema);