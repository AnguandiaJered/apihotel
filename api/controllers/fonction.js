const mongoose = require('mongoose');
const Fonction = require('../models/fonction');

exports.createFonction = (req,res,next) => {
    Fonction.find({ designation: req.body.designation})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Cette fonction existe déjà"
                });
            } else{
                const newFonction = Fonction(
                    {
                        _id: new mongoose.Types.ObjectId,
                        designation: req.body.designation
                    }
                );
                newFonction.save()
                    .then(
                    (fonction) => {
                        const response = {
                            id: fonction._id,
                            designation: fonction.designation,                            
                        };
                        return res.status(200).json({
                            message: "La fonction a été ajoutée avec succès",
                            fonction: response,
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

exports.findFonction = (req,res) => {
    
    Fonction.find((err, fonct) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    fonction: fonct
                }); 
        }
    });
}

exports.updateFonction = (req, res) => {
    const id = req.params.fonctionId;
   
    Fonction.findById(req.params.fonctionId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Cette fonction n'existe pas"
                })
            }else{              
                
                const fonctionToUpdate = new Fonction({
                    _id: id,
                    designation: req.body.designation,                   
                });

                Fonction.updateOne({ _id: id }, fonctionToUpdate).then(
                    (result) => {
                        Fonction.findById(id,(err,fonct)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    res.status(201).json({
                                        message: "La fonction a été modifiée avec succès",
                                        fonction: fonct,
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

exports.deleteFonction = (req,res)=>{
    const id = req.params.fonctionId;
    Fonction.findById(req.params.fonctionId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Cette fonction n'existe pas"
                })
            }else{
                Fonction.remove({_id: id}).then(
                    (result)=>{  
                        res.status(200).json({
                            message: "La fonction a été supprimée avec succès",    
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