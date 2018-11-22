import React from 'react'
import PropTypes from 'prop-types'
import { Headline } from './Headline'
import { AuthorProfile, authorProfilePropTypes } from './AuthorProfile'
import { LatestPublications } from './LatestPublications'

const Wrapper = ({ children }) => <div className="sz-author-wrapper">{children}</div>

export const AuthorPage = ({ author, profile, defaultTeasers }) => (
  <Wrapper>
    <Headline tag="h2">Autoren Spotlight</Headline>
    <AuthorProfile {...profile}/>
    <LatestPublications authorId={author.external_id} departments={author.departments} defaultTeasers={defaultTeasers} />
  </Wrapper>
)

AuthorPage.propTypes = {
  profile: PropTypes.shape(authorProfilePropTypes),
  defaultTeasers: PropTypes.array.isRequired,
}