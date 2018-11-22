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

// getCooperations :: authorName => Array[article] => Array[cooperation]
const getCooperations = authorName => pipe(
  map(
    pipe(
      prop('authors'),
      filter(author => author.name !== authorName),
      map(author => {
        author.image = author.authorImage ? `https://media-cdn.sueddeutsche.de/image/sz.${author.authorImage.external_id}/300x400?v=1521945617` : '';
        delete author.authorImage;
        return author;
      })
    )
  ),
  flatten,
  uniq
)

// getDepartments :: Array[article] => Array[department]
const getDepartments = pipe(
  map(prop('department')),
  uniq
)

app.use(cors())
app
  .get('/isonline', function (req, res) {
    res.end("true");
  })
  .get('/autoren/:authorName', async function(req, res) {
    const authorName = req.params.authorName.replace('_', ' ')
    const author = await getAuthor(authorName)
    const { count, articles } = await getArticles({authorName, size: 100})

    const cooperations = getCooperations(authorName)(articles)

    author.articleCount = count;
    author.departments = getDepartments(articles);

    const hydrationData = { author, articles: articles.slice(0, 4), cooperations };

    res.setHeader('Content-Type', 'text/html')
    res.send(
      template(
        assets.client.js,
        hydrationData,
        renderToString(<AuthorPage {...hydrationData} />),
      ),
    )
  })
  .get('/autoren/api/:authorId/latest-publications', async function (req, res) {
      const { department, page } = req.query;
      const { authorId } = req.params;
      const { count, articles } = await getArticles({ authorId, page, department })

      const hydrationData = { articles };

      res.setHeader('Content-Type', 'text/html')
      res.send(
        template(
          assets.client.js,
          hydrationData,
          renderToString(<AuthorPage {...hydrationData} />),
        ),
      )
  })
  .get('/autoren/api/collaborations', async function (req, res) {
      const { collaboratorIds } = req.query;
      const { articles } = await getArticles({ collaboratorIds })

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(articles));
  })
  .use('/', express.static('public'))

export default app
