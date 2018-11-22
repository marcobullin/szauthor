import {
  pipe,
  path,
  prop,
  tap,
  map,
  pick,
  join,
  filter,
  flatten,
  head,
  uniq,
  equals,
  not,
  pipeP,
} from 'ramda'
import { authorQuery } from './author'
import { articlesQuery } from './articles'

// getAuthor :: authorName => Author
export const getAuthor = authorName => {
  return authorQuery(authorName).then(
    pipe(
      path(['hits', 'hits']),
      map(
        pipe(
          prop('_source'),
          pick([
            'external_id',
            'name',
            'email',
            'jobTitle',
            'searchTitle',
            'description',
            'authorImage',
          ]),
        ),
      ),
      filter(a => a.name === authorName),
      head,
      author => {
        author.image = `https://media-cdn.sueddeutsche.de/image/sz.${
          author.authorImage.externalId
        }/300x400?v=1521945617`
        delete author.authorImage
        return author
      },
    ),
  )
}

// getArticles :: authorName => Array[Article]
export const getArticles = ({
  authorName = '',
  authorId = '',
  page = 1,
  size = 5,
  department = '',
}) => {
  return articlesQuery({ authorName, authorId, page, size, department }).then(resp => {
    const count = pipe(path(['hits', 'total']))(resp)

    const articles = pipe(
      path(['hits', 'hits']),
      map(
        pipe(
          prop('_source'),
          pick([
            'title',
            'overline',
            'abstractText',
            'articleAuthorText',
            'authors',
            'department',
            'externalUrl',
            'imageContexts',
          ]),
          article => {
            article.image =
              article.imageContexts && article.imageContexts.length > 0
                ? `https://media-cdn.sueddeutsche.de/image/sz.${
                    article.imageContexts[0].image.external_id
                  }`
                : ''

            delete article.imageContexts

            return article
          },
        ),
      ),
    )(resp)

    return { count, articles }
  })
}

/*
  author
    - image
    - jobTitle
    - searchTitle
    - name
    - description
    - email
    - numberOfArticlesWritten?
    - numberOfArticlesWrittenInCooperation?
    - numberOfArticlesInRessorts
    - on which days are the articles written and released

  articles (filtered by all, ressorts)
    -

  cooperations
    - authors
      - jobTitle
      - searchTitle
      - name
      - description
      - email
      - cooperated articles

*/
