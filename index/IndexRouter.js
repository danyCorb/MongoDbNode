const express = require('express');
const router = express.Router();
const path = require('path');
const Fac = require('../facs/Fac').model;
const Individu = require('../individus/Individu').model;
const Club = require('../clubs/Club').model;

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/rqt1', function(req, res) {
   Fac.aggregate(
        [
            {
                '$match': {
                    buget: {$gt: 100}
                }
            },
            {
                $project:
                {
                    nom:1,
                    buget: 1
                }
            }
        ], function (err, result) {
            if (err) {
                res.status(500).send("request error "+err);
            } else {
                res.status(200).send(result);
            }
        }
    )
})

router.get('/rqt2', function(req, res) {
    Fac.aggregate(
        [
            {
                $project:
                {
                    nom:1,
                    'nb Cafe':  {$sum: '$eleves.nb_cafe'}
                }
            }
        ], function (err, result) {
            if (err) {
                res.status(500).send("request error "+err);
            } else {
                res.status(200).send(result);
            }
        }
    )
})

router.get('/rqt3', function(req, res) {
    Fac.aggregate(
        [
            {
                $project:
                {
                    nom:1,
                    'nb eleve par Prof':  { $cond:
                        { if: { $size: "$profs"}, then: 
                            {'$divide': [
                                { $size: "$eleves" },
                                { $size: "$profs" }
                            ]},
                        else: 0}}
                }
            }
        ], function (err, result) {
            if (err) {
                res.status(500).send("request error "+err);
            } else {
                res.status(200).send(result);
            }
        }
    )
})

router.get('/rqt4', function(req, res) {
    Fac.aggregate(
        [
            {
                $project:
                {
                    nom:1,
                    'maxCafe':  {$max: '$eleves.nb_cafe' }
                }
            },
            { $sort: {'maxCafe': 1} },
            { $limit : 1 }
        ], function (err, result) {
            if (err) {
                res.status(500).send("request error "+err);
            } else {
                res.status(200).send(result);
            }
        }
    )
})

router.get('/rqt5', function(req, res) {
    Club.aggregate(
        [
            {
                $project:
                {
                    nom:1,
                    'nbEleves': {$cond: { if: { $size: "$eleves"}, then: { $size: "$eleves" }, else: 0 }},
                    'date_creation': {$add: [{$year: "$date_creation"}, 30]}
                }
            },
            {
                $match: {
                    'nbEleves': {$gt: 5},
                    'nom': {$regex: '*en*'},
                    'date_creation': {$lt: {$year: Date() }}
                }
            }
        ], function (err, result) {
            if (err) {
                res.status(500).send("request error "+err);
            } else {
                res.status(200).send(result);
            }
        }
    )
})



module.exports = router;