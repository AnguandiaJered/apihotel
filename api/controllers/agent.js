const mongoose = require('mongoose');
const Fonction = require('../models/fonction');
const Agent = require('../models/agent');


exports.createAgent = (req, res) => {
    
    Fonction.findById(req.params.fonctionId)
        .then(
            (result) => {
                if (!result) {
                    res.status(409).json({
                        message: "Cette fonction n'existe pas veillez en crée une"
                    });
                } else {
                    const foundFonction = result;
                       
                    Agent.find({ matricule: req.body.matricule })
                    .then(
                        (result) => {
                            if (result.length > 0) {
                                res.status(409).json({
                                    message: "Cet agent existe déjà"
                                })
                            } else {
                                const newAgent = Agent({
                                    _id: new mongoose.Types.ObjectId,
                                    matricule: req.body.matricule,
                                    noms: req.body.noms,                       
                                    sexe: req.body.sexe,                       
                                    datenaissance: req.body.datenaissance,                       
                                    etatcivil: req.body.etatcivil,                       
                                    adresse: req.body.adresse,
                                    telephone: req.body.telephone,
                                    mail: req.body.mail,
                                    fonction: foundFonction
                                    // photo: req.body.photo,
                                });
                                if (req.file !== undefined) {                           
                                    const path = req.file.path.substring(8);
                                    const imagePath = path;
                                    newClient.photo = imagePath;                                                        
                                }
                              
                                foundFonction.agent.push(newAgent);
                                foundFonction.save(
                                    function (err) {
                                        if (err) {
                                            res.status(500).json({
                                                error: err.message
                                            });

                                        } else {
                                            newAgent.save()
                                                .then(
                                                    (savedAgent) => {
                                                        Fonction.findById(foundFonction._id, function (err, fonction) {
                                                            if (err) {
                                                                res.status(500).json({
                                                                    error: err.message
                                                                });
                                                            } else {

                                                                res.status(201).json({
                                                                    message: "Le personnel a été ajoutée avec succès",
                                                                    agent: fonction.agent
                                                                })
                                                            }
                                                        }).select("designation")                                                           
                                                    }

                                                ).catch(
                                                    err => {
                                                        res.status(500).json({
                                                            error: err.message
                                                        });
                                                    }
                                                );
                                        }
                                    }
                                )

                            }
                        }
                    )
                    .catch(
                        err => {
                            res.status(500).json({
                                error: err.message
                            });
                        }
                    );
                }
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    error: err.message
                });
            }
        );
};

exports.findAgent = (req,res) => {
    
    Agent.find((err, ag) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    agent: ag
                }); 
        }
    });
}

exports.getSingleAgent = (req, res) => {
    Agent.findById(req.params.agentId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "cet agent n'existe pas"
                }
                );

            } else {
                res.status(200).json(
                    result
                )
            }
        }
    }).populate({        
        path: "fonction"       
    })
}

exports.updateAgent = (req, res) => {
    id = req.params.agentId;
    Agent.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            const c = result.photo;        
            if(req.files.length == 0){
                agentPhoto;
            }else{
                const path = req.file.path.substring(8);
                const imagePath = path;
                newClient.photo = imagePath;   
            }
            
            const modifyiedAgent = new Agent(
                {
                    _id: id,                   
                    matricule: req.body.matricule,
                    noms: req.body.noms,                       
                    sexe: req.body.sexe,                       
                    datenaissance: req.body.datenaissance,                       
                    etatcivil: req.body.etatcivil,                       
                    adresse: req.body.adresse,
                    telephone: req.body.telephone,
                    mail: req.body.mail,
                    fonction: foundFonction,
                    photo: agentPhoto                    
                }
            );
               
            Agent.updateOne({ _id: id }, modifyiedAgent)
                .then((result) => {
                    Agent.findById(id, (err, result) => {
                        if (err) {
                            res.status(500).json({
                                error: err.message
                            })
                        } else {
                            res.status(201).json({
                                agent: result,
                                message: " L'agent a été modifiée avec succès"
                            })
                        }
                    }).populate('fonction')

                })
                .catch(
                    err => {
                        res.status(500).json({
                            error: err.message
                        })
                    }
                );
        }
    })
}

exports.deleteAgent = (req, res) => {
    const id = req.params.agentId;
    Agent.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "Cet agent n'existe pas"
                })
            } else {
                Agent.remove({ _id: id }).then(
                    (response) => {
                        res.status(200).json({
                            message: "L'agent a été suppriméé avec succès"
                        })
                    }
                ).catch(
                    (err) => {
                        res.status(500).json({
                            error: err.message
                        })
                    }
                )
            }
        }
    });
}
