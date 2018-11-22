import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { pipe, path, prop, tap, map, pick, join, filter, flatten, head, uniq, equals, not } from 'ramda'
import { getAuthor, getArticles } from './queries'
import { template } from './template'
import { AuthorPage } from '../components/AuthorPage'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const app = express()

// isNotTheSame :: authorName => author => Boolean
const isNotTheSame = authorName => pipe(equals(authorName), not)

// getCooperations :: authorName => Array[article] => Array[cooperation]
const getCooperations = authorName => pipe(
  map(
    pipe(
      prop('authors'),
      filter(isNotTheSame(authorName))
    )
  ),
  flatten,
  uniq
)

app.use(cors())
app
  .get('/isonline', function (req, res) {
    res.end("true");
  })
  .get('/authors/:authorName', async function(req, res) {
    const author = await getAuthor(req.params.authorName.replace('_', ' '))
console.log(author);
    //const authors = await getAuthors();
    const hydrationData = { author };
    /*
    const author = await getAuthor(req.params.authorName)
    const articles = await getArticles(author)
    const cooperations = getCooperations(authorName)(articles)

    const hydrationData = {
      author,
      articles,
      cooperations
    }
*/
    res.setHeader('Content-Type', 'text/html')
    res.send(
      template(
        assets.client.js,
        hydrationData,
        renderToString(<AuthorPage {...hydrationData} />),
      ),
    )

/*
    authorQuery().then(resp => {
      const hydrationData = {
        author: author("Heribert Prantl")(resp)
      }

      authorArticlesQuery().then(resp => {
        const articles = getArticleData(resp);
        const cooperations = getCoopAuthors("Heribert Prantl")(articles)

        hydrationData.articles = articles;
        hydrationData.cooperations = cooperations;

        res.setHeader('Content-Type', 'text/html')
        res.send(
          template(
            assets.client.js,
            hydrationData,
            renderToString(<AuthorPage {...hydrationData} />),
          ),
        )
      })
    })
    */
  })
  .use('/', express.static('public'))

export default app
