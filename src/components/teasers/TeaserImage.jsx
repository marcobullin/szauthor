import React from 'react'
import PropTypes from 'prop-types'

const ImageSet = ({ url }) => (
  <React.Fragment>
    <img
      src={`${url}/208x156?v=323465344"`}
      srcSet={`${url}/208x156?v=323465344 208w, ${url}/416x312?v=323465344 416w`}
      sizes="208px"
      className="sz-teaser__image sz-teaser__image--s sz-teaser__image--desktop"
      alt="Designerbild"
    />
    <img
      src={`${url}/320x180?v=323465344`}
      srcSet={`${url}/200x113?v=323465344 200w, ${url}/400x225?v=323465344 400w, ${url}/600x338?v=323465344 600w, ${url}/800x450?v=323465344 800w`}
      sizes="70vw"
      className="sz-teaser__image sz-teaser__image--s sz-teaser__image--mobile"
      alt="Designerbild"
    />
  </React.Fragment>
)

ImageSet.propTypes = {
  url: PropTypes.string.isRequired,
}

export const TeaserImage = ({ overline, title, abstractText, authorText, imageUrl, url }) => (
  <a href={url} className="sz-teaser sz-teaser--lead-story">
    <div className="sz-teaser__content-wrapper">
      <div className="sz-teaser__image-container sz-teaser__image-container--s">
        <ImageSet url={imageUrl} />
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
  overline: PropTypes.string,
  title: PropTypes.string.isRequired,
  abstractText: PropTypes.string.isRequired,
  authorText: PropTypes.string,
}

TeaserImage.propTypes = teaserImagePropTypes
