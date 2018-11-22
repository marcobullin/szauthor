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

app.use(cors())
app
  .get('/authors/:author', function(req, res) {
    authorQuery().then(resp => {
      const hydrationData = {
        author: {
          external_id: '1.1234',
          departments: ['Politik', 'Wirtschaft']
        },
        defaultTeasers: [],
        profile: {
          title: 'Prof. Dr.',
          name: 'Heribert Prantl',
          jobTitle: 'Ressortleiter Politik',
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla orci sapien, ultrices id libero nec, lacinia varius dolor. Duis nec cursus lectus, ut maximus velit. Duis consectetur lacinia placerat. In et varius arcu. Donec tincidunt sed orci eu tempus. Vestibulum a porttitor dolor. Fusce quis tempus libero. Morbi eu nisl at eros convallis convallis vel vitae odio. Aenean auctor justo mi, vitae eleifend justo bibendum eget. Vivamus in imperdiet justo, quis pharetra odio. Maecenas id eros mollis, sagittis nibh eleifend, porttitor mi. Integer imperdiet nec erat eu sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sodales et libero sit amet dapibus. Nunc ut venenatis lectus. Suspendisse potenti. Mauris a fermentum purus. Cras condimentum interdum pulvinar. Mauris convallis sem eu orci aliquam, id consequat tortor dictum. Duis tempus, lectus ac feugiat eleifend, ex nisi feugiat turpis, id sagittis sapien nisi aliquet nibh. Etiam consequat quam et dui tincidunt malesuada. Nunc semper sed leo et placerat. Aenean quis orci congue, rutrum ligula eget, auctor metus. Duis ultrices erat eu vulputate eleifend. Aliquam massa odio, eleifend at pharetra vehicula, mollis et est. Praesent venenatis eros sed nunc venenatis, vitae varius nunc laoreet. Fusce commodo interdum risus non venenatis. Nullam id tellus ante. Ut hendrerit lorem augue. Mauris consectetur lectus et ligula consectetur maximus.`,
          email: 'Buero.Prantl@sueddeutsche.de',
          image: 'https://aktuell.uni-erfurt.de/wp-content/uploads/2018/05/Prantl_Heribert_web-768x700.jpg',
        },
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
