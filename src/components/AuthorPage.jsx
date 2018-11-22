import React from 'react'

export const AuthorPage = ({ articles = [], author = {}, cooperations = [] }) => (
  <div>
    <h1>SZAuthor</h1>
    { author.searchTitle && <h3>{ author.searchTitle }</h3> }
    { author.jobTitle && <p>{ author.jobTitle }</p> }
    { author.email && <p>{ author.email }</p> }
    { author.description && <span dangerouslySetInnerHTML={{__html: author.description}}></span> }

    <h2>Departments ({ author.departments.length })</h2>
    {author.departments.join(', ')}

    <p><b>{ author.articleCount }</b> Artikel verfasst</p>


    <h2>Neueste Artikel</h2>
    <ul>
      {articles.map((article, i) => (
        <li key={i}>{article.title}</li>
      ))}
    </ul>

    <h2>Kooperationen</h2>

    <ul>
      {cooperations.map((partnerAuthor, i) => (
        <li key={i}>
          { partnerAuthor.searchTitle && <p><b>{partnerAuthor.searchTitle}</b></p>}
          { partnerAuthor.jobTitle && <p>{ partnerAuthor.jobTitle }</p> }
          { partnerAuthor.email && <p>{ partnerAuthor.email }</p> }
          { partnerAuthor.description && <span dangerouslySetInnerHTML={{__html: partnerAuthor.description}}></span> }
        </li>
      ))}
    </ul>
  </div>
)
