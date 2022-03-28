const mongoose = require('mongoose');

const affectationSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        agent:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Agent"
        },
        service:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Service"
        },
        salaire:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Salaire"
        },
        dateaffacte:{
            type:Date,
            require:true
        }
    },
);

module.exports = mongoose.model('Affectation',affectationSchema);