const mongoose = require('mongoose');
const Salaire = require('../models/salaire');

exports.createSalaire = (req,res,next) => {
    Salaire.find({ montant: req.body.montant})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Ce Salaire existe déjà"
                });
            } else{
                const newSalaire = Salaire(
                    {
                        _id: new mongoose.Types.ObjectId,
                        montant: req.body.montant
                    }
                );
                newSalaire.save()
                    .then(
                    (salaire) => {
                        const response = {
                            id: salaire._id,
                            montant: salaire.montant,                            
                        };
                        return res.status(200).json({
                            message: "Le salaire a été ajoutée avec succès",
                            salaire: response,
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

exports.findSalaire = (req,res) => {
    
    Salaire.find((err, sal) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    salaire: sal
                }); 
        }
    });
}

exports.updateSalaire = (req, res) => {
    const id = req.params.salaireId;
   
    Salaire.findById(req.params.salaireId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce salaire n'existe pas"
                })
            }else{              
                
                const salaireToUpdate = new Salaire({
                    _id: id,
                    montant: req.body.montant,                   
                });

                Salaire.updateOne({ _id: id }, salaireToUpdate).then(
                    (result) => {
                        Salaire.findById(id,(err,sal)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    res.status(201).json({
                                        message: "Le salaire a été modifiée avec succès",
                                        salaire: sal,
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

exports.deletSalaire = (req,res)=>{
    const id = req.params.salaireId;
    Salaire.findById(req.params.salaireId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce salaire n'existe pas"
                })
            }else{
                Salaire.remove({_id: id}).then(
                    (result)=>{  
                        res.status(200).json({
                            message: "Le salaire a été supprimée avec succès",    
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