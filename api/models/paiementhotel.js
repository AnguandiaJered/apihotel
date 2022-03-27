const mongoose = require('mongoose');

const paiementhotelSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        montant:{
            type:Number,
            require:true
        },
        datepaie:{
            type:Date,
            require:true
        },
        libelle:{
            type:String,
            require:true
        },
        client:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Client"
        },
        reservation:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Reservation"
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Agent" 
        }
    },
);

module.exports = mongoose.model('Paiementhotel',paiementhotelSchema);