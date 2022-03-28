const mongoose = require('mongoose');
const Client = require('../models/client');
const Chambre = require('../models/chambre');
const Reservation = require('../models/reservation');




exports.createReservation = (req, res) => {
    
    Client.findById(req.params.clientId)
        .then(
            (result) => {
                if (!result) {
                    res.status(409).json({
                        message: "Ce client n'existe pas veillez en crée un"
                    });
                } else {
                    const foundClient = result;
                    Chambre.findById(req.body.chambreId)
                        .then(
                            (chambre) => {
                                if (!chambre) {
                                    res.status(409).json({
                                        message: "Cette chambre n'existe pas"
                                    })
                                }
                                else {
                                    const foundChambre = Chambre;
                                    console.log(foundChambre);
                                    Reservation.find({ chambre: req.body.chambre })
                                        .then(
                                            (result) => {
                                                if (result.length > 0) {
                                                    res.status(409).json({
                                                        message: "La chambre selectionnée est occupée svp"
                                                    })
                                                } else {
                                                    const newReservation = Reservation({
                                                        _id: new mongoose.Types.ObjectId,
                                                        client: foundClient,
                                                        chambre: foundChambre,
                                                        dateentree: req.body.dateentree,
                                                        datesortie: req.body.datesortie,
                                                        prix: req.body.prix,
                                                        libelle: req.body.libelle,
                                                        nombrejour: req.body.nombrejour,
                                                        datereservation: req.body.datereservation                                                       
                                                    });                                                  
                                                
                                                    foundClient.client.push(newReservation);
                                                    foundChambre.chambre.push(newReservation);
                                                    foundClient.save(
                                                        function (err) {
                                                            if (err) {
                                                                res.status(500).json({
                                                                    error: err.message
                                                                });

                                                            } else {
                                                                newReservation.save()
                                                                    .then(
                                                                        (saved) => {
                                                                            Client.findById(foundClient._id, function (err, client) {
                                                                                if (err) {
                                                                                    res.status(500).json({
                                                                                        error: err.message
                                                                                    });
                                                                                } else {

                                                                                    res.status(201).json({
                                                                                        message: "La reservation a été ajoutée avec succès",
                                                                                        client: client.client
                                                                                    })
                                                                                }
                                                                            }).select("noms,sexe,adresse,telephone,nationalite,photo")
                                                                                .populate('client');
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

exports.findReservation = (req,res) => {
    
    Reservation.find((err, reserve) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    reservation: reserve
                }); 
        }
    });
}

exports.getSingleReservation = (req, res) => {
    Reservation.findById(req.params.reservationId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "cette reservation n'existe pas"
                }
                );

            } else {
                res.status(200).json(
                    result
                )
            }
        }
    }).populate({
        
        path: "client",
        populate: [
            'client'
        ]
    }).populate('chambre')
}

exports.updateReservation = (req, res) => {
    id = req.params.reservationId;
    Reservation.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {         
            
            const modifyiedReservation = new Reservation(
                {
                    _id: id,
                    client: foundClient,
                    chambre: foundChambre,
                    dateentree: req.body.dateentree,
                    datesortie: req.body.datesortie,
                    prix: req.body.prix,
                    libelle: req.body.libelle,
                    nombrejour: req.body.nombrejour,
                    datereservation: req.body.datereservation 
                }
            );
              
            Reservation.updateOne({ _id: id }, modifyiedReservation)
                .then((result) => {
                    Reservation.findById(id, (err, result) => {
                        if (err) {
                            res.status(500).json({
                                error: err.message
                            })
                        } else {
                            res.status(201).json({
                                plante: result,
                                message: " La reservation a été modifiée avec succès"
                            })
                        }
                    }).populate('client chambre')

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

exports.deleteReservation = (req, res) => {
    const id = req.params.reservationId;
    Reservation.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "Cette reservation n'existe pas"
                })
            } else {
                Reservation.remove({ _id: id }).then(
                    (response) => {
                        res.status(200).json({
                            message: "La reservation a été suppriméé avec succès"
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