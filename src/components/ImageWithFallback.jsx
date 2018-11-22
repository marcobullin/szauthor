import React from 'react'
import PropTypes from 'prop-types'

export const ImageWithFallback = ({ fallback = AUTHOR_FALLBACK, src, ...props }) => (
  <img
    style={{ display: 'block', width: '100%', height: 'auto' }}
    src={src ? src : fallback}
    {...props}
    onError={e => {
      e.target.onerror = null
      e.target.src = fallback
    }}
  />
)

ImageWithFallback.propTypes = {
  fallback: PropTypes.string,
}

export const AUTHOR_FALLBACK = 'https://www.w3schools.com/howto/img_avatar.png'
export const SZ_FALLBACK =
  'https://www.sueddeutsche.de/pagelayout/assets/img/favicon/2505f98fada37fa9452b7dedc002a829-android-chrome-512x512.png'
