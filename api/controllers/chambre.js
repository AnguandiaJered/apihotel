const mongoose = require('mongoose');
const Chambre = require('../models/chambre');
const Classroom = require('../models/classechambre');


exports.createChambre = (req, res) => {
    
    Classroom.findById(req.params.classeId)
        .then(
            (result) => {
                if (!result) {
                    res.status(409).json({
                        message: "Cette classe n'existe pas veillez en crée une"
                    });
                } else {
                    const foundClasse = result;
                       
                    Chambre.find({ numchambre: req.body.numchambre })
                    .then(
                        (result) => {
                            if (result.length > 0) {
                                res.status(409).json({
                                    message: "Cette chambre existe déjà"
                                })
                            } else {
                                const newChambre = Chambre({
                                    _id: new mongoose.Types.ObjectId,
                                    numchambre: req.body.numchambre,
                                    telephone: req.body.telephone,                       
                                    classe: foundClasse                 
                                });
                                
                                foundClasse.chambre.push(newChambre);
                                foundClasse.save(
                                    function (err) {
                                        if (err) {
                                            res.status(500).json({
                                                error: err.message
                                            });

                                        } else {
                                            newChambre.save()
                                                .then(
                                                    (savedAgent) => {
                                                        Classroom.findById(foundClasse._id, function (err, classe) {
                                                            if (err) {
                                                                res.status(500).json({
                                                                    error: err.message
                                                                });
                                                            } else {

                                                                res.status(201).json({
                                                                    message: "La chambre a été ajoutée avec succès",
                                                                    chambre: classe.chambre
                                                                })
                                                            }
                                                        }).select("designation,montant")                                                           
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

exports.findChambre = (req,res) => {
    
    Chambre.find((err, room) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    chambre: room
                }); 
        }
    });
}

exports.getSingleChambre = (req, res) => {
    Chambre.findById(req.params.chambreId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "cette chambre n'existe pas"
                }
                );

            } else {
                res.status(200).json(
                    result
                )
            }
        }
    }).populate({        
        path: "classe"       
    })
}

exports.updateChambre = (req, res) => {
    id = req.params.chambreId;
    Chambre.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {         
            
            const modifyiedChambre = new Chambre(
                {
                    _id: id,                   
                    numchambre: req.body.numchambre,
                    telephone: req.body.telephone,                       
                    classe: foundClasse                
                }
            );
               
            Chambre.updateOne({ _id: id }, modifyiedChambre)
                .then((result) => {
                    Chambre.findById(id, (err, result) => {
                        if (err) {
                            res.status(500).json({
                                error: err.message
                            })
                        } else {
                            res.status(201).json({
                                chambre: result,
                                message: " La chambre a été modifiée avec succès"
                            })
                        }
                    }).populate('classe')

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

exports.deleteChambre = (req, res) => {
    const id = req.params.chambreId;
    Chambre.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "Cette chambre n'existe pas"
                })
            } else {
                Chambre.remove({ _id: id }).then(
                    (response) => {
                        res.status(200).json({
                            message: "La chambre a été suppriméé avec succès"
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
