const mongoose = require('mongoose');

const fonctionSchema = mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        designation:{
            type:String,
            require:true
        }

    },
);
module.exports = mongoose.model('Fonction',fonctionSchema);