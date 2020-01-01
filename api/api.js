const express = require('express');
const router = express.Router();
const cors = require('cors')
const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://batteries76:roQby9-tobsoz-zakqen@cluster0-7uukp.mongodb.net', {useNewUrlParser: true});

// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error: NO DICE'));
// db.once('open', () => {
//     console.log('OPENED THE MONGO')
// });

const MongoClient = require('mongodb').MongoClient

console.log(MongoClient)

MongoClient.connect('mongodb+srv://batteries76:roQby9-tobsoz-zakqen@cluster0-7uukp.mongodb.net', (err, database) => {
    console.log("In the Mongo connection")
    if (err) {
        console.log("IN THE ERROR")
        return console.log(err);
    }

    const langTree = database.db('language-tree-db')
    // console.log("LANGTREE")
    // console.log(langTree)
    router.use(cors());

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

    // router.get('/language-json', (req, res) => {
    //     console.log("LANGUAGES!");
    //     langTree.collection('language-json').find().toArray((err, results) => {
    // //    console.log(results);
    //         res.send(results);
    //     });
    // });

    router.get('/language-json-complete', (req, res) => {
        console.log("LANGUAGES COMPLETE!");
        langTree.collection('language-tree-complete').find().toArray((err, results) => {
    //    console.log(results);
            res.send(results);
        });
    });

    router.get('/accumulated-geo', (req, res) => {
        console.log("ACCUMULATED geo SPECIFIC TEST TEST!");
        console.log(req.query)
        // { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } 
        // { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
        langTree.collection('accumulated-geo')
            // .find( { $or: [ {"features.properties.cca2": req.query.code1 }, {"features.properties.cca2": req.query.code2 } ] } )
            .find( { "name": req.query.language } )
            .toArray((err, results) => {
                //    console.log(results);
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
            
})

module.exports = router;
