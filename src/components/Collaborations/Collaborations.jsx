import React from 'react'
import PropTypes from 'prop-types'
import { Headline } from '../Headline'
import { TeaserText } from '../teasers'
import { authorProfilePropTypes } from '../AuthorProfile'
import { ImageWithFallback } from '../ImageWithFallback'

class Collaboration extends React.Component {
  state = { expanded: false }
  toggleExpanded = () => {
    const { expanded } = this.state
    this.setState({ expanded: !expanded })
  }
  render() {
    const { image, name, jobTitle, collaboratedArticlesCount, teasers = [] } = this.props
    const { expanded } = this.state
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '100%', maxWidth: 200 }}>
          <ImageWithFallback src={image} alt={name} style={{ display: 'block', width: '100%' }} />
        </div>
        <section style={{ flexGrow: 1 }}>
          <h3>{name}</h3>
          {jobTitle ? <h4 className="sz-font__headline--s-regular">{jobTitle}</h4> : null}
          <p>
            <strong>{collaboratedArticlesCount + ' '}</strong>gemeinsam veröffentlichte Artikel und
            Reportagen.
          </p>
          {/* <div style={{ display: expanded ? 'block' : 'none' }}>
            {teasers.map(teaser => (
              <TeaserText {...teaser} />
            ))}
          </div> */}
          <button
            className="sz-button"
            style={{ display: 'block', margin: '0 auto' }}
            onClick={this.toggleExpanded}
          >
            {expanded ? 'Artikel verstecken' : 'Gemeinsame Artikel anzeigen'}
          </button>
        </section>
      </div>
    )
  }
}

Collaboration.propTypes = authorProfilePropTypes

export const Collaborations = ({ collaborations = [] }) => (
  <div>
    <Headline>Wer mit wem</Headline>
    {collaborations.map(author => (
      <Collaboration key={author.external_id} {...author} />
    ))}
  </div>
)

Collaborations.propTypes = {
  collaborations: PropTypes.arrayOf(PropTypes.shape(authorProfilePropTypes)).isRequired,
}
