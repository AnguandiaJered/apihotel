const mongoose = require('mongoose');

const salaireSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        montant:{
            type:Number,
            require:true
        }
    },
);

module.exports = mongoose.model('Salaire',salaireSchema);