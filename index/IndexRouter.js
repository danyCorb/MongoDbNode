const express = require('express');
const router = express.Router();
const path = require('path');
const Fac = require('../facs/Fac').model;
const Individu = require('../individus/Individu').model;
const Club = require('../clubs/Club').model;

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Fac avec un budget supérieur à 100.
router.get('/rqt1', function(req, res) {
   Fac.aggregate(
        [
            {
                $match: {
                    budget: {$gt: 100}
                }
            },
            {
                $project:
                {
                    nom:1,
                    budget: 1
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

// Fac par nombre de café
router.get('/rqt2', function(req, res) {
    Fac.aggregate(
      [
        {$lookup:
          {
            from: 'individus', 
            localField: 'eleves',
            foreignField:'_id',
            as:'eleves'
          }
        },
        {$project:
          {
            nom:1, 
            'nb_cafe': {$sum: '$eleves.nb_cafe'},
          }
        },
        {$sort:
          {
            nb_cafe:-1
          }
        }], function (err, result) {
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
                $lookup: {
                    from: "individus",
                    localField: "eleves",
                    foreignField: "_id",
                    as: "individus"
                }
            },
            {
                $project:
                {
                    nom:1,
                    'maxCafe':  {$max: '$individus.nb_cafe' }
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

// --> ne fonctionne pas au niveau du match. Pourtant les deux champs comparés existent.
// db.clubs.aggregate([
//   {$project:{nom:1, nbEleves:{$cond: {if:{$size: '$eleves'}, then: {$size: '$eleves'}, else: 0}},
//   annee_creation: {$subtract: [{$year:'$date_creation'}, 30]},
//   annee_max: {$subtract: [{$year:new Date()}, 30]}}},
//   {$project:{annee_creation:1, annee_max:1}},
//   {$match:{annee_creation:{$lt:'$annee_max'}}} ])
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
                    // 'nom': {$regex: '*en*'},
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
});


// Get all eleves from fac id
router.get('/rqt6', function(req, res) {
  db.facs.aggregate([
    {$lookup:{from: 'individus', localField: 'eleves', foreignField:'_id', as:'eleves'}},
    {$project:{eleves:1}},
    {$match:{_id:req.params.id}}

  ], function (err, result) {
          if (err) {
              res.status(500).send("request error "+err);
          } else {
              res.status(200).send(result);
          }
      }
  )
})

// Get all profs from fac id
router.get('/rqt7', function(req, res) {
  db.facs.aggregate([
    {$lookup:{from: 'individus', localField: 'profs', foreignField:'_id', as:'profs'}},
    {$project:{profs:1}},
    {$match:{_id:req.params.id}}

  ], function (err, result) {
          if (err) {
              res.status(500).send("request error "+err);
          } else {
              res.status(200).send(result);
          }
      }
  )
})

// Get all disciplines from fac id
router.get('/rqt8', function(req, res) {
  db.facs.aggregate([
    {$project:{disciplines:1}},
    {$match:{_id:req.params.id}}

  ], function (err, result) {
          if (err) {
              res.status(500).send("request error "+err);
          } else {
              res.status(200).send(result);
          }
      }
  )
})


// Get all matieres in fac from fac id
router.get('/rqt9', function(req, res) {
  db.facs.aggregate([
  {$lookup:{from: 'individus', localField: 'profs', foreignField:'_id', as:'profs'}},
  {$project:{matieres_enseignees:'$profs.matiere'}}, 
  {$match:{_id:req.params.id}}, 
  {$unwind:'$matieres_enseignees'}, 
  {$group:{_id: '$matieres_enseignees'}}, 
  {$group:{_id: 0, mats:{$push:'$_id'}}},
  {$project:{matieres_enseignees:'$mats', _id:0}}], function (err, result) {
          if (err) {
              res.status(500).send("request error "+err);
          } else {
              res.status(200).send(result);
          }
      }
  )
})


module.exports = router;