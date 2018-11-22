import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { pick } from 'ramda'
import { Headline } from '../Headline'
import { TeaserText } from '../teasers'
import { authorProfilePropTypes } from '../AuthorProfile'
import { ImageWithFallback } from '../ImageWithFallback'

class Collaboration extends React.Component {
  state = { teasers: [] }

  getTeasers = () => {
    const { external_id: collabotatorId, authorId } = this.props
    const collaboratorIds = [authorId, collabotatorId]
    console.log(collabotatorId)
    axios
      .get('/autoren/api/collaborations', { params: { collaboratorIds } })
      .then(res => res.data)
      .then(x => {
        console.log(x)
        return x
      })
      .then(teasers => {
        if (teasers && teasers.length) {
          this.setState(prevState => ({
            ...prevState,
            teasers,
          }))
        }
      })
  }

  render() {
    const { image, name, jobTitle, style } = this.props
    const { teasers } = this.state
    return (
      <div style={{ ...style, display: 'flex' }}>
        <div style={{ width: '100%', maxWidth: 200, marginRight: 30 }}>
          <ImageWithFallback src={image} alt={''} style={{ display: 'block', width: '100%' }} />
        </div>
        <section style={{ flexGrow: 1 }}>
          <h3 className="sz-font__headline--s-bold" style={{ margin: 0 }}>
            {name}
          </h3>
          {jobTitle ? (
            <h4 className="sz-font__headline--s-regular" style={{ marginTop: 10 }}>
              {jobTitle}
            </h4>
          ) : null}
          <p className="sz-font__text--s-regular">
            <strong>24&nbsp;</strong>gemeinsam veröffentlichte Artikel und Reportagen.
          </p>
          <div style={teasers.length ? { marginTop: 30 } : {}}>
            {teasers.map(teaser => (
              <TeaserText {...teaser} key={teaser.title} />
            ))}
          </div>
          {teasers.length ? null : (
            <button
              className="sz-button"
              style={{ display: 'block', margin: '0 auto', marginTop: 40 }}
              onClick={this.getTeasers}
            >
              Gemeinsame Artikel laden
            </button>
          )}
        </section>
      </div>
    )
  }
}

Collaboration.propTypes = authorProfilePropTypes

export const Collaborations = ({ collaborations = [], authorId, style }) => (
  <div style={style}>
    <Headline>Wer mit wem</Headline>
    {collaborations
      .map(pick(['external_id', 'image', 'name', 'jobTitle', 'description']))
      .map(author => (
        <Collaboration
          key={author.external_id}
          {...author}
          authorId={authorId}
          style={{ marginTop: 30 }}
        />
      ))}
  </div>
)

Collaborations.propTypes = {
  collaborations: PropTypes.arrayOf(PropTypes.shape(authorProfilePropTypes)).isRequired,
  authorId: PropTypes.string.isRequired,
}
