import React from 'react'
import PropTypes from 'prop-types'

export const AuthorProfile = ({ searchTitle, name, jobTitle, description, email, image }) => (
  <div className="sz-author-profile">
    <div className="sz-author-profile__image-wrapper">
      <img className="sz-author-profile__image" src={image} alt={name} />
      <a className="sz-link sz-link--underlined" href={`mailto:${email}`}>
        {email}
      </a>
    </div>
    <section className="sz-author-profile__info">
      <h1 className="sz-font__headline--m-italic">{name}</h1>
      {jobTitle ? <h4 className="sz-font__headline--s-regular">{jobTitle}</h4> : null}
      <p className="sz-font__text--s-regular">{description}</p>
    </section>
  </div>
)

export const authorProfilePropTypes = {
  searchTitle: PropTypes.string,
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  email: PropTypes.string,
  image: PropTypes.string,
}

AuthorProfile.propTypes = authorProfilePropTypes

AuthorProfile.defaultProps = {
  searchTitle: null,
  jobTitle: null,
  email: null,
  image: 'https://www.w3schools.com/howto/img_avatar.png',
}
