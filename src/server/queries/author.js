import { client } from './internal'

export const authorQuery = authorName => client.search({
  index: 'szindex',
  body: {
    query: {
      match: {
        'name': authorName
      },
    },
  },
})
