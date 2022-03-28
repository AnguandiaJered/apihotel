const mongoose = require('mongoose');
const Salle = require('../models/salle');

exports.createSalle = (req,res,next) => {
    Salle.find({ designation: req.body.designation})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Cette salle existe déjà"
                });
            } else{
                const newSalle = Salle(
                    {
                        _id: new mongoose.Types.ObjectId,
                        designation: req.body.designation,
                        prix: req.body.prix
                    }
                );
                newSalle.save()
                    .then(
                    (salle) => {
                        const response = {
                            id: salle._id,
                            designation: salle.designation, 
                            prix: salle.prix                           
                        };
                        return res.status(200).json({
                            message: "La salle a été ajoutée avec succès",
                            salle: response,
                        })
                    }
                )
                .catch(
                    err => {
                        res.status(500).json({
                            error: err.message
                        })
                    }
                )
            }
        }
    )
    .catch(
        err => {
            res.status(500).json({
                error: err.message
            })
        }
    )
};

exports.findSalle = (req,res) => {
    
    Salle.find((err, sall) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    salle: sall
                }); 
        }
    });
}

exports.updateSalle = (req, res) => {
    const id = req.params.salleId;
   
    Salle.findById(req.params.salleId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Cette salle n'existe pas"
                })
            }else{              
                
                const salleToUpdate = new Salle({
                    _id: id,
                    designation: req.body.designation,
                    prix: req.body.prix                   
                });

                Salle.updateOne({ _id: id }, salleToUpdate).then(
                    (result) => {
                        Salle.findById(id,(err,sall)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    res.status(201).json({
                                        message: "La salle a été modifiée avec succès",
                                        salle: sall,
                                    })   
                                }
                            });                       
                    }
                ).catch(
                    err => {
                        res.status(500).json({
                            error: err.message
                        })
                    }
                )
            } 
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err.message
            })
        }
    );    
}

exports.deleteSalle = (req,res)=>{
    const id = req.params.salleId;
    Salle.findById(req.params.salleId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Cette salle n'existe pas"
                })
            }else{
                Salle.remove({_id: id}).then(
                    (result)=>{  
                        res.status(200).json({
                            message: "La salle a été supprimée avec succès",    
                        }
                        );
                    }
                ).catch(
                    err=>{
                        res.status(500).json({
                            error:err.message
                        })
                    }
                );              
            }
        }
    ).catch(
        err=>{
            res.status(500).json({
                error:err.message
            })
        }
    )
   
}