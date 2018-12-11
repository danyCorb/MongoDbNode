var faker = require('faker');
var genders = ['homme', 'femme'];
var matieres = ['anglais', 'chinois', 'espagnol', 'allemand', 'mathematiques', 'physique', 'science de la vie', 'informatique', 'droits', 'economie', 'phylosophie', 'sociologie', 'psychologie'];
var club_names = ['handball', 'football', 'baseball', 'natation', 'echec', 'esport', 'dessin', 'peinture', 'video', 'audiovisuel', 'musique', 'big band', 'orchestre', 'fanfare'];
var disciplines = ['droit', 'economie - gestion - management', 'enseignement', 'genie civil', 'international', 'lettre - langue - communication', 'mathematiques', 'mechanique - materiaux', 'numerique - electronique', 'physique - chimie - genie des procédés', 'qualité - logistique - maintenant', 'santé', 'sciences humaine et sociales', 'sciences de la terre et de l\'univers', 'science de la vie', 'staps'];

var eleves = [];
var profs = [];
var clubs = [];
var facs = [];
var individus = [];

// boucle de création des facs
for (a = 0; a < 10; a++) {
    var eleves_fac = [];
    var profs_fac = [];
    var clubs_fac = [];

    var nb_eleve_fac = faker.random.number({
        'min': 200,
        'max': 4000
    });

    var nb_prof_fac = faker.random.number({
        'min': 10,
        'max': 242
    });

    var nb_club_fac = faker.random.number({
        'min': 2,
        'max': 14
    });

    // boucle de création des élèves
    for (b = 0; b < nb_eleve_fac; b++) {
        var eleve = {
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
        eleves.push(eleve);
        eleves_fac.push(eleve);
    }
    // boucle de création des profs
    for (c = 0; c < nb_prof_fac; c++) {
        var prof = {
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
        profs.push(prof);
        profs_fac.push(prof);
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
        var club = {
            "nom": faker.random.arrayElement(club_names),
            "president": faker.random.arrayElement(eleves_fac),
            "date_creation": faker.date.between(new Date('1961-12-17T03:24:00'), new Date('2018-12-17T03:24:00')),
            "eleves": eleves_club
        };
        clubs.push(club);
        clubs_fac.push(club);

    }

    // attribution des disciplines pour chaque fac
    var nb_disciplines = faker.random.number({
        'min': 2,
        'max': 16
    });
    var disciplines_fac = [];

    for (f = 0; f < nb_disciplines; f++) {
        disciplines_fac.push(faker.random.arrayElement(disciplines));
    }
    // creation de facs
    var city = faker.address.city();
    var fac = {
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
    facs.push(fac);
}

individus = profs.concat(eleves);

console.log(individus);
console.log(clubs);
console.log(facs);

