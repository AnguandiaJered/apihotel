const mongoose = require('mongoose');

const paiementsalleSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        client:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Client"
        },
        reservesalle:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Reservationsalle"
        },
        montant:{
            type:String,
            require:true
        },
        datepayer:{
            type:String,
            require:true
        },
        libelle:{
            type:String,
            require:true
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Agent" 
        }
    },
);

module.exports = mongoose.model('Paiementsalle',paiementsalleSchema);