const mongoose = require('mongoose');

const reservationsalleSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        client:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Client"
        },
        salle:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Salle"
        },
        dateceremonie:{
            type:Date,
            require:true
        },
        libelle:{
            type:String,
            require:true
        },
        datereservation:{
            type:Date,
            require:true
        }
    },
);

module.exports = mongoose.model('Reservationsalle',reservationsalleSchema);