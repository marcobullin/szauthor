import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { equals } from 'ramda'
import { Headline } from '../Headline'
import { TeaserImage } from '../teasers'

const isActiveFilter = (active, filter) => equals(filter.slice(0).sort(), active.slice(0).sort())

const Filter = ({ onChange, filters, activeFilters }) => (
  <div>
    {filters.map(filter => (
      <button
        key={filter}
        onClick={() => onChange([filter])}
        className={isActiveFilter(activeFilters, [filter]) ? 'active' : ''}
      >
        {filter}
      </button>
    ))}
    <button
      key="all"
      onClick={() => onChange(filters)}
      className={isActiveFilter(activeFilters, filters) ? 'active' : ''}
    >
      Alle
    </button>
  </div>
)

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  activeFilters: PropTypes.arrayOf(PropTypes.string),
}

export class LatestPublications extends React.Component {
  constructor({ departments, defaultTeasers }) {
    super()
    this.setState({
      teasers: defaultTeasers.slice(0),
      filters: departments.slice(0).sort(),
    })
  }

  state = {
    filters: [],
    teasers: [],
  }

  getTeasers = () => {
    const { authorId } = this.props
    const { filters } = this.state
    const url = `/authors/api/${authorId}/latest-publications`
    axios
      .get(url, { params: { filters } })
      .then(res => res.data)
      .then(teasers => {
        this.setState(prevState => ({
          ...prevState,
          teasers,
        }))
      })
  }

  componentDidMount() {
    this.getTeasers()
  }

  render() {
    const { departments } = this.props
    const { teasers, filters } = this.state
    return (
      <div>
        <Headline tag="h2">Meine aktuellsten Artikel</Headline>
        <Filter
          filters={departments}
          activeFilters={filters}
          onChange={filters => console.log(filters)}
        />
        {teasers.map(teaser => (
          <TeaserImage {...teaser} key={teaser.title} />
        ))}
      </div>
    )
  }
}

LatestPublications.propTypes = {
  authorId: PropTypes.string.isRequired,
  departments: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  defaultTeasers: PropTypes.array.isRequired,
}
