const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        client:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Client"
        },
        chambre:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chambre"
        },
        dateentree:{
            type:Date,
            require:true
        },
        datesortie:{
            type:Date,
            require:true
        },
        prix:{
            type:Number,
            require:true
        },
        libelle:{
            type:String,
            require:true
        },
        nombrejour:{
            type:Number,
            require:true
        },
        datereservation:{
            type:Date,
            require:true  
        }
    },
);

module.exports = mongoose.model('Reservation',reservationSchema);