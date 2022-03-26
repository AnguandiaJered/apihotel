const mongoose = require('mongoose');

const chambreSchema = mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        numchambre:{
            type:String,
            require:true
        },
        telephone:{
            type:String,
            require:true
        },
        classe:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Classe"
        }
    },
);

module.exports = mongoose.model('Chambre',chambreSchema);