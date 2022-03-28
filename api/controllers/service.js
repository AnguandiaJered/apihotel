const mongoose = require('mongoose');
const Service = require('../models/service');

exports.createService = (req,res,next) => {
    Service.find({ designation: req.body.designation})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Ce service existe déjà"
                });
            } else{
                const newService = Service(
                    {
                        _id: new mongoose.Types.ObjectId,
                        designation: req.body.designation
                    }
                );
                newService.save()
                    .then(
                    (service) => {
                        const response = {
                            id: service._id,
                            designation: service.designation,                            
                        };
                        return res.status(200).json({
                            message: "Le service a été ajoutée avec succès",
                            service: response,
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

exports.findService = (req,res) => {
    
    Service.find((err, fonct) => {
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

exports.updateService = (req, res) => {
    const id = req.params.serviceId;
   
    Service.findById(req.params.serviceId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce service n'existe pas"
                })
            }else{              
                
                const serviceToUpdate = new Service({
                    _id: id,
                    designation: req.body.designation,                   
                });

                Service.updateOne({ _id: id }, serviceToUpdate).then(
                    (result) => {
                        Service.findById(id,(err,serve)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    res.status(201).json({
                                        message: "Le service a été modifiée avec succès",
                                        service: serve,
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

exports.deleteService = (req,res)=>{
    const id = req.params.serviceId;
    Service.findById(req.params.serviceId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce service n'existe pas"
                })
            }else{
                Service.remove({_id: id}).then(
                    (result)=>{  
                        res.status(200).json({
                            message: "Le service a été supprimée avec succès",    
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