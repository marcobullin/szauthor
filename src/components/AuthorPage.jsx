import React from 'react'
import PropTypes from 'prop-types'
import { Headline } from './Headline'
import { AuthorProfile, authorProfilePropTypes } from './AuthorProfile'
import { LatestPublications } from './LatestPublications'
import { Collaborations } from './Collaborations'

export const AuthorPage = ({ author, profile, defaultTeasers }) => (
  <div className="sz-author-wrapper">
    <Headline tag="h2">Autoren Spotlight</Headline>
    <AuthorProfile {...profile} />
    <LatestPublications
      authorId={author.external_id}
      departments={author.departments}
      defaultTeasers={defaultTeasers}
    />
    <Collaborations />
  </div>
)

AuthorPage.propTypes = {
  profile: PropTypes.shape(authorProfilePropTypes),
  defaultTeasers: PropTypes.array.isRequired,
}
