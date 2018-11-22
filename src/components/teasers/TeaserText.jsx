import React from 'react'
import PropTypes from 'prop-types'

export const TeaserText = ({ overline, title, externalUrl }) => (
  <a href={externalUrl}>
    <div className="sz-oneliner__overline">
      <p className="sz-oneliner__overline-title">{overline}</p>
    </div>
    <p className="sz-oneliner__title">{title}</p>
  </a>
)

const teaserTextPropTypes = {
  overline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  externalUrl: PropTypes.string.isRequired,
}

TeaserText.propTypes = teaserTextPropTypes
