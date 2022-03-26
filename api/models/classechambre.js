const mongoose = require('mongoose');

const classeSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        designation:{
            type:String,
            require:true
        },
        montant:{
            type:Number,
            require:true
        }
    },
);

module.exports = mongoose.model('Classe',classeSchema);