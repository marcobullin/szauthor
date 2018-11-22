import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
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
    const { image, name, jobTitle } = this.props
    const { teasers } = this.state
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '100%', maxWidth: 200 }}>
          <ImageWithFallback src={image} alt={name} style={{ display: 'block', width: '100%' }} />
        </div>
        <section style={{ flexGrow: 1 }}>
          <h3>{name}</h3>
          {jobTitle ? <h4 className="sz-font__headline--s-regular">{jobTitle}</h4> : null}
          <p>
            <strong>24</strong>gemeinsam veröffentlichte Artikel und Reportagen.
          </p>
          <div>
            {teasers.map(teaser => (
              <TeaserText {...teaser} key={teaser.title} />
            ))}
          </div>
          {teasers.length ? null : (
            <button
              className="sz-button"
              style={{ display: 'block', margin: '0 auto' }}
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

export const Collaborations = ({ collaborations = [], authorId, ...props }) => (
  <div {...props}>
    <Headline>Wer mit wem</Headline>
    {collaborations.map(author => (
      <Collaboration key={author.external_id} {...author} authorId={authorId} />
    ))}
  </div>
)

Collaborations.propTypes = {
  collaborations: PropTypes.arrayOf(PropTypes.shape(authorProfilePropTypes)).isRequired,
  authorId: PropTypes.string.isRequired,
}
