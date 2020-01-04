const WebSocket = require('ws');
const MongoClient = require('mongodb').MongoClient

const wss = new WebSocket.Server({
    port: 8080,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024 // Size (in bytes) below which messages
      // should not be compressed.
    }
  });

MongoClient.connect('mongodb+srv://batteries76:roQby9-tobsoz-zakqen@cluster0-7uukp.mongodb.net', (err, database) => {
    console.log("In the Mongo connection")
    if (err) {
        console.log("IN THE ERROR")
        return console.log(err);
    }

    const langTree = database.db('language-tree-db')

    wss.on('connection', function connection(ws, req) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);

            langTree.collection('accumulated-geo-indo-euro')     
                .find( { "name": message } )
                .toArray((err, results) => {
                    console.log("Results in the server");
                    ws.send(JSON.stringify(results));
                });
        });
        ws.send(req.query)
        ws.send('hello from the server baltic test!');
    });
})