import React from 'react'

export const AuthorPage = ({ articles = [] }) => (
  <div>
    <h1>SZAuthor</h1>
    <ul>
      {articles.map((article, i) => (
        <li key={i}>{article.title}</li>
      ))}
    </ul>
  </div>
)
