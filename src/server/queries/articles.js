import { client } from './internal';

export const articlesQuery = ({ authorName = "", authorId = "", page = 1, size = 5, department = "", collaboratorIds = [] }) => {
  const must = [
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
    }
  ];

  if (authorName) {
    must.push({
      match: {
        'authors.name': authorName,
      },
    });
  }

  if (authorId) {
    must.push({
      match: {
        'authors.external_id': authorId,
      },
    })
  }

  if (department) {
    must.push({
      match: {
        department
      }
    });
  }

  if (collaboratorIds.length > 0) {
    collaboratorIds.map(id => {
      must.push({
        match: {
          'authors.external_id': id,
        },
      })
    })
  }

  return client.search({
    index: 'szindex',
    from: (page - 1) * 5,
    size: size,
    body: {
      query: {
        bool: {
          must
        }
      },
      sort: [
        { "sortDate" : {"order" : "desc"}}
      ],
    }
  });
}
