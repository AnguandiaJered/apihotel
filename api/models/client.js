const mongoose = require('mongoose');

const clientSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        noms:{
            type:String,
            require:true
        },
        sexe:{
            type:String,
            require:true
        },
        adresse:{
            type:String,
            require:true
        },
        telephone:{
            type:String,
            require:true
        },
        nationalite:{
            type:String,
            require:true
        },
        photo:[
            String
        ]
    },
);

module.exports = mongoose.model('Client',clientSchema);