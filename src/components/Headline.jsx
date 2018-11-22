import React from 'react'

export const Headline = ({ Tag = 'h1', children }) => (
  <div className="sz-page__header">
    <Tag className="sz-page__header-text">{children}</Tag>
  </div>
)
