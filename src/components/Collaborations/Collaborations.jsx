import React from 'react'
import PropTypes from 'prop-types'
import { Headline } from '../Headline'
import { TeaserText } from '../teasers'

const collaborationsPropTypes = {
  external_id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  searchTitle: PropTypes.string,
  collaboratedArticlesCount: PropTypes.number.isRequired,
  teasers: PropTypes.shape({
    overline: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
}

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
          <img src={image} alt={name} style={{ display: 'block', width: '100%' }} />
        </div>
        <section style={{ flexGrow: 1 }}>
          <h3>{name}</h3>
          {jobTitle ? <h4 className="sz-font__headline--s-regular">{jobTitle}</h4> : null}
          <p>
            <strong>{collaboratedArticlesCount + ' '}</strong>gemeinsam veröffentlichte Artikel und
            Reportagen.
          </p>
          <div style={{ display: expanded ? 'block' : 'none' }}>
            {teasers.map(teaser => (
              <TeaserText {...teaser} />
            ))}
          </div>
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

Collaboration.propTypes = collaborationsPropTypes

export const Collaborations = ({ collaborations = [] }) => (
  <div>
    <Headline>Wer mit wem</Headline>
    {collaborations.map(collab => (
      <Collaboration {...collab} />
    ))}
  </div>
)

Collaborations.propTypes = {
  collaborations: PropTypes.arrayOf(collaborationsPropTypes).isRequired,
}

const mockCollaborations = [
  {
    external_id: '1.1234',
    image: 'https://www.ullstein-buchverlage.de/uploads/tx_publisher/urheberfoto/urheber1208.jpg',
    name: 'Cerstin Gammelin',
    searchTitle: 'Stellvertretende Redaktionsleiterin',
    collaboratedArticlesCount: 12,
    teasers: PropTypes.shape({
      overline: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    teasers: [
      {
        overline: 'Lorem, ipsum dolor.',
        title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde, numquam!',
        url: '/asfasdf',
      },
      {
        overline: 'Lorem, ipsum dolor.',
        title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde, numquam!',
        url: '/asfasdf',
      },
      {
        overline: 'Lorem, ipsum dolor.',
        title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde, numquam!',
        url: '/asfasdf',
      },
    ],
  },
]

Collaborations.defaultProps = {
  collaborations: mockCollaborations,
}
