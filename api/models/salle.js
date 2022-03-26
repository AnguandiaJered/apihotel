const mongoose = require('mongoose');

const salleSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        designation:{
            type:String,
            require:true
        },
        prix:{
            type:Number,
            require:true
        }
    },
);

module.exports = mongoose.model('Salle',salleSchema);