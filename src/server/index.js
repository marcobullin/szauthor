import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { pipe, path, prop, tap, map, pick } from 'ramda'
import { authorQuery } from './queries'
import { template } from './template'
import { AuthorPage } from '../components/AuthorPage'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const app = express()

// TODO do this in query instead of application
const getArticleData = pipe(
  path(['hits', 'hits']),
  map(
    pipe(
      prop('_source'),
      pick(['title']),
    ),
  ),
)

app.use(cors())
app
  .get('/authors/:author', function(req, res) {
    authorQuery().then(resp => {
      const hydrationData = {
        articles: getArticleData(resp),
      }
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
  .use('/', express.static('public'))

export default app
