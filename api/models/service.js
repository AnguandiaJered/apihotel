const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        designation:{
            type:String,
            require:true
        }
    },
);

module.exports = mongoose.model('Service',serviceSchema);