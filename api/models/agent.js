const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const agentSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        matricule:{
            type:String,
            require:true
        },
        noms:{
            type:String,
            require:true
        },
        sexe:{
            type:String,
            require:true
        },
        datenaissance:{
            type:Date,
            require:true
        },
        etatcivil:{
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
        mail:{
            type:String,
            require:true
        },
        fonction:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Fonction"
        },
        photo:[
            String
        ]

    },
);

module.exports = mongoose.model('Agent',agentSchema);