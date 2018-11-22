import React from 'react'
import PropTypes from 'prop-types'
import { Headline } from './Headline'
import { AuthorProfile, authorProfilePropTypes } from './AuthorProfile'
import { LatestPublications } from './LatestPublications'
import { Collaborations } from './Collaborations'

export const AuthorPage = ({ author, articles, collaborations }) => (
  <div className="sz-author-wrapper">
    <Headline tag="h2">Autoren Spotlight</Headline>
    <AuthorProfile {...author} />
    <LatestPublications
      authorId={author.external_id}
      departments={author.departments}
      defaultTeasers={articles}
      style={{ marginTop: 80 }}
    />
    <Collaborations
      collaborations={collaborations}
      authorId={author.external_id}
      style={{ marginTop: 80 }}
    />
  </div>
)

AuthorPage.propTypes = {
  author: PropTypes.shape(authorProfilePropTypes),
  articles: PropTypes.array.isRequired,
  collaborations: PropTypes.array.isRequired,
}
