const mongoose = require('mongoose');
const Client = require('../models/client');

exports.createClient = (req,res,next) => {
    Client.find({ noms: req.body.noms})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Ce client existe déjà"
                });
            } else{
                const newClient = Client(
                    {
                        _id: new mongoose.Types.ObjectId,
                        noms: req.body.noms,
                        sexe: req.body.sexe,
                        adresse: req.body.adresse,
                        telephone: req.body.telephone,
                        nationalite: req.body.nationalite
                        // photo: req.body.photo,
                    }
                    
                );
                if (req.file !== undefined) {                           
                    const path = req.file.path.substring(8);
                    const imagePath = path;
                    newClient.photo = imagePath;
                    
                }
                newClient.save()
                    .then(
                    (client) => {
                        const response = {
                            id: client._id,
                            noms: client.noms,
                            sexe: client.sexe,
                            adresse: client.adresse,
                            telephone: client.telephone,
                            nationalite: client.nationalite,
                            photo: client.photo                         
                        };
                        return res.status(200).json({
                            message: "Le client a été ajoutée avec succès",
                            client: response,
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

exports.findClient = (req,res) => {
    
    Client.find((err, cl) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    client: cl
                }); 
        }
    });
}

exports.updateClient = (req, res) => {
    const id = req.params.clientId;
   
    Client.findById(req.params.clientId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce client n'existe pas"
                })
            }else{              
                
                const clientToUpdate = new Client({
                    _id: id,
                    noms: req.body.noms,
                    sexe: req.body.sexe,
                    adresse: req.body.adresse,
                    telephone: req.body.telephone,
                    nationalite: req.body.nationalite                  
                });
                if (req.file !== undefined) { 
                    const path = req.file.path.substring(8);
                    newClient.photo = path;       
                }
                Client.updateOne({ _id: id }, clientToUpdate).then(
                    (result) => {
                        Client.findById(id,(err,client)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    const response = {
                                        id: client._id,
                                        noms: client.noms,
                                        sexe: client.sexe,
                                        adresse: client.adresse,
                                        telephone: client.telephone,
                                        nationalite: client.nationalite,
                                        photo: client.photo                         
                                    };
                                    res.status(200).json({
                                        message: "Le client a été modifiée avec succès",
                                        client: response,
                                    });                                    
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

exports.deleteClient = (req,res)=>{
    const id = req.params.clientId;
    Client.findById(req.params.clientId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce client n'existe pas"
                })
            }else{
                Client.remove({_id: id}).then(
                    (result)=>{  
                        res.status(200).json({
                            message: "Le Client a été supprimée avec succès",    
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

exports.updateClientPhoto = (req, res) => {
    let imagePath;
    if (req.file !== undefined) {
        
        const path = req.file.path.substring(8);
        imagePath = path;
    }
    const id = req.params.clientId;
    Client.updateOne({ _id: id }, { photo: imagePath }, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            res.status(200).json(result);
        }
    });
}
