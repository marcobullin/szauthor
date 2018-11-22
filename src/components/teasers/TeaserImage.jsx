import React from 'react'
import PropTypes from 'prop-types'
import { ImageWithFallback, SZ_FALLBACK } from '../ImageWithFallback'

export const TeaserImage = ({
  overline,
  title,
  abstractText,
  authorText,
  image: imageUrl,
  externalUrl,
}) => (
  <a href={externalUrl} className="sz-teaser sz-teaser--lead-story" style={{ marginTop: 30 }}>
    <div className="sz-teaser__content-wrapper">
      <div
        className="sz-teaser__image-container sz-teaser__image-container--s"
        style={{ height: 'auto' }}
      >
        <ImageWithFallback fallback={SZ_FALLBACK} src={imageUrl} alt={title} />
      </div>
      <div className="sz-teaser__text-container--s">
        <div className="sz-teaser__overline">
          <p className="sz-teaser__overline-title">{overline}</p>
        </div>
        <h3 className="sz-teaser__title">{title}</h3>
        <p className="sz-teaser__summary">{abstractText}</p>
        {!authorText ? null : <p className="sz-teaser__author">{authorText}</p>}
      </div>
    </div>
  </a>
)

export const teaserImagePropTypes = {
  externalUrl: PropTypes.string,
  overline: PropTypes.string,
  title: PropTypes.string.isRequired,
  abstractText: PropTypes.string.isRequired,
  authorText: PropTypes.string,
  image: PropTypes.string,
}

TeaserImage.propTypes = teaserImagePropTypes
