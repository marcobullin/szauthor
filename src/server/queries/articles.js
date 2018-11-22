import { client } from './internal';

export const articlesQuery = authorName => client.search({
  index: 'szindex',
  body: {
    query: {
      bool: {
        must: [
          {
            match: {
              'authors.name': authorName,
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
