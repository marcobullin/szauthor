const express = require('express');
const app = express();
const elasticsearch = require('elasticsearch');
const cors = require('cors');

const client = new elasticsearch.Client({
  host: 'elastic-11.hst.sznet.de:9200',
  log: 'trace'
});

app.use(cors());
app.get('/articles/:author', function (req, res) {
  client.search({
    index: 'szindex',
    body: {
      "query": {
        "bool": {
          "must": [
            {
              "match" : {
                "authors.name" : "Sacha Batthyany"
              }
            },
            {
              "term": {
                "types": "article"
              }
            },
            {
              "term": {
                "published": true
              }
            },
            {
              "term": {
                "external_system": "sz"
              }
            }
          ]
        }
      }
    }
  }).then(resp => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(resp.hits.hits))
  });
});

app.listen(3999, function () {
  console.log('Listening on port 3999!');
});
