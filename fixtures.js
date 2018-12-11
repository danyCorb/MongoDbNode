const faker = require('faker');
const mongoose = require('mongoose');

const mongoDbClient = require('./db');
const Club = require('./clubs/Club').model;
const Individu = require('./individus/Individu').model;
const Fac = require('./facs/Fac').model;

let genders = ['homme', 'femme'];
let matieres = ['anglais', 'chinois', 'espagnol', 'allemand', 'mathematiques', 'physique', 'science de la vie', 'informatique', 'droits', 'economie', 'phylosophie', 'sociologie', 'psychologie'];
let club_names = ['handball', 'football', 'baseball', 'natation', 'echec', 'esport', 'dessin', 'peinture', 'video', 'audiovisuel', 'musique', 'big band', 'orchestre', 'fanfare'];
let disciplines = ['droit', 'economie - gestion - management', 'enseignement', 'genie civil', 'international', 'lettre - langue - communication', 'mathematiques', 'mechanique - materiaux', 'numerique - electronique', 'physique - chimie - genie des procédés', 'qualité - logistique - maintenant', 'santé', 'sciences humaine et sociales', 'sciences de la terre et de l\'univers', 'science de la vie', 'staps'];

let eleves = [];
let elevesIds = [];
let profs = [];
let profsIds = [];
let clubs = [];
let clubsIds = [];
let facs = [];
let individus = [];

// boucle de création des facs
for (a = 0; a < 10; a++) {
    let eleves_fac = [];
    let profs_fac = [];
    let clubs_fac = [];

    let nb_eleve_fac = faker.random.number({
        'min': 200,
        'max': 4000
    });

    let nb_prof_fac = faker.random.number({
        'min': 10,
        'max': 242
    });

    let nb_club_fac = faker.random.number({
        'min': 2,
        'max': 14
    });

    // boucle de création des élèves
    for (b = 0; b < nb_eleve_fac; b++) {
        let eleve = {
            "type": "eleve",
            "nom": faker.name.lastName(),
            "prenom": faker.name.firstName(),
            "age": faker.random.number({
                'min': 17,
                'max': 28
            }),
            "adresse": {
                "ville": faker.address.city(),
                "code_postal": faker.address.stateAbbr(),
                "numero": faker.random.number({
                    'min': 1,
                    'max': 40
                }),
                "rue": faker.address.streetName()
            },
            "nb_cafe": faker.random.number({
                'min': 0,
                'max': 1000
            }),
            "sexe": faker.random.arrayElement(genders)
        }

        Individu.create(eleve, (err, obj) => {
          if (err) {
            console.log(err);
          }else{
            console.log("successfully inserted individu ", obj);
            eleves.push(obj);
            eleves_fac.push(obj);
            elevesIds.push(obj._id);
          }
        });
    }
    // boucle de création des profs
    for (c = 0; c < nb_prof_fac; c++) {
        let prof = {
            "type": "prof",
            "nom": faker.name.lastName(),
            "prenom": faker.name.firstName(),
            "age": faker.random.number({
                'min': 32,
                'max': 64
            }),
            "adresse": {
                "ville": faker.address.city(),
                "code_postal": faker.address.stateAbbr(),
                "numero": faker.random.number({
                    'min': 1,
                    'max': 40
                }),
                "rue": faker.address.streetName()
            },
            "nb_cafe": faker.random.number({
                'min': 0,
                'max': 1500
            }),
            "sexe": faker.random.arrayElement(genders),
            "matiere": faker.random.arrayElement(matieres),
            "salaire": faker.random.number({
                'min': 1200,
                'max': 3000
            }),
        }

        Individu.create(prof, (err, obj) => {
          if (err) {
            console.log(err);
          }else{
            console.log("successfully inserted individu ", obj);
            profs.push(obj);
            profs_fac.push(obj);
            profsIds.push(obj._id);
          }
        });
       
    }
    // boucle de création des clubs
    for (d = 0; d < nb_club_fac; d++) {
        // boucle d'attribution des élèves a un club
        eleves_club = [];
        nb_eleve = faker.random.number({
            'min': 2,
            'max': 50
        });

        for (e = 0; e < nb_eleve; e++) {
            eleves_club.push(faker.random.arrayElement(eleves_fac));
        }
        let club = {
            "nom": faker.random.arrayElement(club_names),
            "president": faker.random.arrayElement(eleves_fac),
            "date_creation": faker.date.between(new Date('1961-12-17T03:24:00'), new Date('2018-12-17T03:24:00')),
            "eleves": eleves_club
        };

        Club.create(club, (err, obj) => {
          if (err) {
            console.log(err);
          }else{
            console.log("successfully inserted club ", obj);
            clubs.push(obj);
            clubs_fac.push(obj);
            clubsIds.push(obj._id);
          }
        });

    }

    // attribution des disciplines pour chaque fac
    let nb_disciplines = faker.random.number({
        'min': 2,
        'max': 16
    });
    let disciplines_fac = [];

    for (f = 0; f < nb_disciplines; f++) {
        disciplines_fac.push(faker.random.arrayElement(disciplines));
    }
    // creation de facs
    let city = faker.address.city();
    let fac = {
        "nom": "University of " + city,
        "adresse": {
            "ville": city,
            "code_postal": faker.address.stateAbbr(),
            "numero": faker.random.number({
                'min': 1,
                'max': 40
            })
        },
        "directeur": {
            "nom": faker.name.lastName(),
            "prenom": faker.name.firstName(),
            "age": faker.random.number({
                'min': 42,
                'max': 70
            }),
            "sexe": faker.random.arrayElement(genders),
            "salaire": faker.random.number({
                'min': 2000,
                'max': 5000
            }),
        },
        "budget": faker.random.number({
            'min': 1000000,
            'max': 10000000
        }),
        "disciplines": disciplines_fac,
        "clubs": clubs_fac,
        "eleves": eleves_fac,
        "profs": profs_fac,
        "nb_machine_cafe": faker.random.number({
            'min': 10,
            'max': 30
        })
    }
    
    Club.create(fac, (err, obj) => {
      if (err) {
        console.log(err);
      }else{
        console.log("successfully inserted club ", obj);
        facs.push(obj);
      }
    });

    
}

individus = profs.concat(eleves);

console.log(individus);
console.log(clubs);
console.log(facs);

// mongoDbClient.auth("", "")


  /**
   *  EMPTY DATABASE
   */

  function dropAllCollection(){
    dropClubCollection();
  }

  function dropClubCollection(){
    mongoose.connection.dropCollection('clubs', (err, result) => {
      dropIndividuCollection();

      if(!err){
        console.log("drop collection success : ", result);
      }else{
        console.log(err);
      }
    });
  }

  function dropIndividuCollection(){
    mongoose.connection.dropCollection('individus', (err, result) => {
      dropFacCollection();
      if(!err){
        console.log("drop collection success : ", result);
      }else{
        console.log(err);
      }
    });
  }

  function dropFacCollection(){
    mongoose.connection.dropCollection('facs', (err, result) => {
      if(!err){
        console.log("drop collection success : ", result);
      }else{
        console.log(err);
      }
    });
  }

  dropAllCollection();

  /**
   * Insert all data in collections
   */

  function addAllData(){
    addAllFacs()
  }

  function addAllFacs(){
    Fac.create(facs, (err, obj) => {
      if (err) {
        console.log(err);
      }else{
        console.log("successfully inserted all facs document !");
        addAllIndividus();
      }
    });
  }

  function addAllIndividus(){
    Individu.create(individus, (err, obj) => {
      if (err) {
        console.log(err);
      }else{
        console.log("successfully inserted all individus document !");
        addAllClubs();
      }
    });
  }

  function addAllClubs(){
    Club.create(facs, (err, obj) => {
      if (err) {
        console.log(err);
      }else{
        console.log("successfully inserted all clubs document !");
        addAllIndividus();
      }
    });
  }

  addAllData();









