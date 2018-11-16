import React from 'react';

export class Author extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      articles: []
    }

    fetch('http://localhost:3999/articles/SOME_NAME')
      .then(response => {
        return response.json()
      }).then(articles => {
        this.setState((prevState, props) => ({
          fetching: !prevState.fetching,
          articles
        }))
      });
  }

  render() {
    if (this.state.fetching) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        <h1>SZAuthor</h1>
        { this.state.articles.map((article, i) => <p key={i}>{article._source.title}</p>) }
      </div>
    );
  }
}
