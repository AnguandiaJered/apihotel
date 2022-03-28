const mongoose = require('mongoose');
const Classeroom = require('../models/classechambre');

exports.createClasseroom = (req,res,next) => {
    Classeroom.find({ designation: req.body.designation})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Cette classe existe déjà"
                });
            } else{
                const newClasseroom = Classeroom(
                    {
                        _id: new mongoose.Types.ObjectId,
                        designation: req.body.designation,
                        montant: req.body.montant
                    }
                );
                newClasseroom.save()
                    .then(
                    (classe) => {
                        const response = {
                            id: classe._id,
                            designation: classe.designation, 
                            montant: classe.montant                           
                        };
                        return res.status(200).json({
                            message: "La classe a été ajoutée avec succès",
                            classe: response,
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

exports.findClasseroom = (req,res) => {
    
    Classeroom.find((err, room) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    classe: room
                }); 
        }
    });
}

exports.updateClasseroom = (req, res) => {
    const id = req.params.classeId;
   
    Classeroom.findById(req.params.classeId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Cette classe n'existe pas"
                })
            }else{              
                
                const classeToUpdate = new Classeroom({
                    _id: id,
                    designation: req.body.designation,
                    montant: req.body.montant                   
                });

                Classeroom.updateOne({ _id: id }, classeToUpdate).then(
                    (result) => {
                        Classeroom.findById(id,(err,cl)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    res.status(201).json({
                                        message: "La classe a été modifiée avec succès",
                                        classe: cl,
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

exports.deleteClasseroom = (req,res)=>{
    const id = req.params.classeId;
    Classeroom.findById(req.params.classeId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Cette classe n'existe pas"
                })
            }else{
                Classeroom.remove({_id: id}).then(
                    (result)=>{  
                        res.status(200).json({
                            message: "La classe a été supprimée avec succès",    
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