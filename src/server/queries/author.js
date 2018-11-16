import { client } from './internal'

export const authorQuery = () =>
  client.search({
    index: 'szindex',
    body: {
      query: {
        bool: {
          must: [
            {
              match: {
                'authors.name': 'Sacha Batthyany',
              },
            },
            {
              term: {
                types: 'article',
              },
            },
            {
              term: {
                published: true,
              },
            },
            {
              term: {
                external_system: 'sz',
              },
            },
          ],
        },
      },
    },
  })
