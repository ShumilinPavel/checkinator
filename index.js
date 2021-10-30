const express = require('express')
const Busboy = require('busboy')
const { privateDecrypt } = require('crypto');
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())

app.get('/login', (req, res) => {
  res.send('Павел Шумилин')
})

app.post('/', (req, res) => {
    const busboy = new Busboy({ headers: req.headers })
    let obj = {}

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file.on('data', function(data) {
            obj[fieldname] = data;
        });
        file.on('end', function() {
          console.log('File [' + fieldname + '] Finished');
        });
    });

    busboy.on('finish', () => {
        res.send(privateDecrypt(obj['key'], obj['secret']));
    });

    req.pipe(busboy);
})

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})
 