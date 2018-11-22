import { pipe, path, prop, tap, map, pick, join, filter, flatten, head, uniq, equals, not, pipeP } from 'ramda'
import { authorQuery } from './author'
import { articlesQuery } from './articles'

// getAuthor :: authorName => Author
export const getAuthor = authorName => {
  return authorQuery(authorName)
    .then(pipe(
        path(['hits', 'hits']),
        map(
          pipe(
            prop('_source'),
            pick(['name', 'email', 'jobTitle', 'searchTitle', 'description', 'authorImage']),
          ),
        ),
        filter(a => a.name === authorName),
        tap(x => console.log(x)),
        head
      )
    )
}

// getArticles :: authorName => Array[Article]
export const getArticles = authorName => {
  return articlesQuery(authorName).then(resp => pipe(
    path(['hits', 'hits']),
    map(
      pipe(
        prop('_source'),
        pick(['title', 'authors']),
      ),
    )
  ))
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
