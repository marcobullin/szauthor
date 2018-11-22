import React from 'react'
import PropTypes from 'prop-types'
import { ImageWithFallback } from '../ImageWithFallback'

export const AuthorProfile = ({ searchTitle, name, jobTitle, description, email, image }) => (
  <div className="sz-author-profile">
    <div className="sz-author-profile__image-wrapper">
      <ImageWithFallback className="sz-author-profile__image" src={image} alt={name} />
      <a className="sz-link sz-link--underlined" href={`mailto:${email}`}>
        {email}
      </a>
    </div>
    <section className="sz-author-profile__info">
      <h1 className="sz-font__headline--m-italic">{searchTitle ? searchTitle : name}</h1>
      {jobTitle ? <h4 className="sz-font__headline--s-regular">{jobTitle}</h4> : null}
      <div className="sz-font__text--s-regular" dangerouslySetInnerHTML={{ __html: description }} />
    </section>
  </div>
)

export const authorProfilePropTypes = {
  external_id: PropTypes.string.isRequired,
  searchTitle: PropTypes.string,
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  email: PropTypes.string,
  image: PropTypes.string.isRequired,
}

AuthorProfile.propTypes = {
  ...authorProfilePropTypes,
  departments: PropTypes.arrayOf(PropTypes.string).isRequired,
}

AuthorProfile.defaultProps = {
  searchTitle: null,
  jobTitle: null,
  email: null,
  image: 'https://www.w3schools.com/howto/img_avatar.png',
}
