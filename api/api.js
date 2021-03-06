const express = require('express');

const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')

// mongoose.connect('mongodb+srv://batteries76:roQby9-tobsoz-zakqen@cluster0-7uukp.mongodb.net', {useNewUrlParser: true});

// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error: NO DICE'));
// db.once('open', () => {
//     console.log('OPENED THE MONGO')
// });

const router = express.Router();

// router.use(compression())

const MongoClient = require('mongodb').MongoClient

// console.log(MongoClient)

MongoClient.connect('mongodb+srv://batteries76:roQby9-tobsoz-zakqen@cluster0-7uukp.mongodb.net', (err, database) => {
    console.log("In the Mongo connection")
    if (err) {
        console.log("IN THE ERROR")
        return console.log(err);
    }

    const langTree = database.db('language-tree-db')
    // console.log("LANGTREE")
    // console.log(langTree)
    // router.use(cors());

    /* GET api listing. */
    router.get('/', (req, res) => {
        console.log("in the api get at /");
        res.send('api works!!!');
    });

    // Get all posts
    router.get('/country-info', (req, res) => {
        console.log("COUNTRY Info!");
        langTree.collection('country-info').find().toArray((err, results) => {
            // console.log(results);
            res.send(results);
        });
    });

    router.get('/language-json-complete', (req, res) => {
        console.log("LANGUAGES!");
        langTree.collection('indo-european-stripped-tree').find().toArray((err, results) => {
    //    console.log(results);
            res.send(results);
        });
    });

    router.get('/sino-caucasian-language-tree', (req, res) => {
        console.log("LANGUAGES COMPLETE!");
        langTree.collection('sino-caucasian-stripped-tree').find().toArray((err, results) => {
    //    console.log(results);
            res.send(results);
        });
    });

    router.get('/indo-european-language-tree', (req, res) => {
        console.log("LANGUAGES COMPLETE!");
        langTree.collection('indo-european-stripped-tree').find().toArray((err, results) => {
    //    console.log(results);
            res.send(results);
        });
    });

    router.get('/accumulated-geo', (req, res) => {
        console.log("ACCUMULATED geo SPECIFIC TEST TEST XXX!");
        console.log(req.query)
        if (req.query.collection === 'Indo-European') {
            langTree.collection('indo-european-accumulated-deflated')
                // .find( { $or: [ {"features.properties.cca2": req.query.code1 }, {"features.properties.cca2": req.query.code2 } ] } )
                .find( { "name": req.query.language } )
                .toArray((err, results) => {
                    console.log(results);
                    res.send(results);
                });
        }
        else if (req.query.collection === 'Sino-Caucasian') {
            langTree.collection('sino-caucasian-accumulated-deflated')
                // .find( { $or: [ {"features.properties.cca2": req.query.code1 }, {"features.properties.cca2": req.query.code2 } ] } )
                .find( { "name": req.query.language } )
                .toArray((err, results) => {
                    console.log(results);
                    res.send(results);
                });
        
        }
        else {
            res.send("No valid collection selected dude")
        }
    });

    router.get('/percentages-geodata', (req, res) => {
        console.log("PERCENTAGES GEODATA (DEFLATED)");
        console.log(req.query)
        // { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } 
        // { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
        if (req.query.collection === 'Indo-European') {
            console.log("CHECKING INDO-EURO COLLECTION")
            langTree.collection('indo-european-percentages-deflated')
                // .find( { $or: [ {"features.properties.cca2": req.query.code1 }, {"features.properties.cca2": req.query.code2 } ] } )
                .find( { "name": req.query.language } )
                .toArray((err, results) => {
                    //    console.log(results);
                    res.send(results);
                });
        }
        else if (req.query.collection === 'Sino-Caucasian') {
            console.log("CHECKING SINO-CAUCASIAN COLLECTION")
            langTree.collection('sino-caucasian-percentages-deflated')
                // .find( { $or: [ {"features.properties.cca2": req.query.code1 }, {"features.properties.cca2": req.query.code2 } ] } )
                .find( { "name": req.query.language } )
                .toArray((err, results) => {
                    console.log(results);
                    res.send(results);
                });
        }
        else {
            res.send("No valid collection selected dude")
        }

    });

    router.get('/indo-european-paths', (req, res) => {
        console.log("INDO-EURO PATHS");
        console.log(req.query)
        langTree.collection('indo-european-paths')
            // .find( { $or: [ {"features.properties.cca2": req.query.code1 }, {"features.properties.cca2": req.query.code2 } ] } )
            .find( { "name": req.query.language } )
            .toArray((err, results) => {
                console.log(results);
                res.send(results);
            });
    });

    router.get('/sino-caucasian-paths', (req, res) => {
        console.log("SINO-CAUC PATHS!");
        console.log(req.query)
        langTree.collection('sino-caucasian-paths')
            // .find( { $or: [ {"features.properties.cca2": req.query.code1 }, {"features.properties.cca2": req.query.code2 } ] } )
            .find( { "name": req.query.language } )
            .toArray((err, results) => {
                console.log(results);
                res.send(results);
            });
    });

    router.get('/country-geo', (req, res) => {
        console.log("COUNTRY geo SPECIFIC TEST TEST!");
        console.log(req.query)
        // { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } 
        // { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
        langTree.collection('country-geo')
            // .find( { $or: [ {"features.properties.cca2": req.query.code1 }, {"features.properties.cca2": req.query.code2 } ] } )
            .find( { "features.properties.cca2": { $in: [ req.query.code1, req.query.code2 ] } } )
            .toArray((err, results) => {
                //    console.log(results);
                res.send(results);
            });
    });

    router.get('/country-geo-all', (req, res) => {
        console.log("COUNTRY geo SPECIFIC TEST TEST!");
        console.log(req.query)
        // { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } 
        // { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
        langTree.collection('country-geo')
            // .find( { $or: [ {"features.properties.cca2": req.query.code1 }, {"features.properties.cca2": req.query.code2 } ] } )
            .find({})
            .toArray((err, results) => {
                //    console.log(results);
                res.send(results);
            });
    });

    router.get('/cia-data', (req, res) => {
        console.log("CIA WORLD DATA");
        console.log(req.query)
        var regexElement = new RegExp(req.query.language);
        // { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } 
        // { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
        langTree.collection('cia-world-array')
            // .find( { $or: [ { "data.people.languages.language.name": 'Cantonese' }, { "data.people.languages.language.note": 'Cantonese' } ] }, { "data.name": 1, "data.people.languages.language": 1 } )
            .find( { $or: [ { "data.people.languages.language.name": { $regex: regexElement } }, { "data.people.languages.language.note": { $regex: regexElement } } ] }, { "data.name": 1, "data.people.languages.language": 1 } )
            // .find( { "data.name": "Anguilla" }, { 'data.information': 1 } )
            // .find({})
            .toArray((err, results) => {
                let partials = results.map(result => {
                    return {
                        countryName: result.data.name,
                        // languages: result.data.people.languages.language
                        languages: result.data.people.languages.language.filter(element => {
                            let flag = false
                            console.log(element)
                            if (element.name) {
                                if (element.name.includes(req.query.language)) {
                                    flag = true
                                }
                            }
                            if (element.note) {
                                if (element.note.includes(req.query.language)) {
                                    flag = true
                                }
                            }
                            return flag
                        })[0]
                    }

                })
                //    console.log(results);
                
                res.send(partials);
            });
    });
            
    // router.get('/country-geo', (req, res) => {
    //     console.log("COUNTRY geo!");
    //     langTree.collection('country-geo').find().toArray((err, results) => {
    //         //    console.log(results);
    //         res.send(results);
    //     });
    // });

    router.get('/language-wiki/:language', (req, res) => {
        console.log("HIT LANGUAGE-WIKI")
        const url = 'http://en.wikipedia.org/w/api.php'


        axios.get(url + `?action=query&list=search&srsearch=${req.params.language}%20language&format=json`)
            .then(response => {
                const wikiResponse = response.data
                console.log(wikiResponse)

                const searchArray = wikiResponse.query.search
                const pageId = searchArray[0].pageid
                axios.get(`http://en.wikipedia.org/w/api.php?action=parse&pageid=${pageId}&format=json&section=0`)
                    .then(response => {
                        const openingSection = response.data
                        const brief = openingSection.parse.text['*']

                        res.send(brief)
                    })
            })
    })
            
})

module.exports = router;
