import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import axios from 'axios'
import { equals } from 'ramda'
import { Headline } from '../Headline'
import { TeaserImage } from '../teasers'

const FilterButton = ({ isActive = false, children, ...props }) => (
  <button
    style={{
      boxSizing: 'border-box',
      borderSize: 1.5,
      borderColor: isActive ? '#29293A' : 'white',
    }}
    className={classnames('sz-button sz-button--small', isActive ? '' : 'sz-button--white')}
    disabled={isActive}
    {...props}
  >
    {children}
  </button>
)

FilterButton.propTypes = {
  isActive: PropTypes.bool,
}

const isActiveFilter = (active, filter) => equals(filter.slice(0).sort(), active.slice(0).sort())

const Filter = ({ onChange, filters, activeFilters, ...props }) => (
  <div {...props}>
    {filters.map(filter => (
      <FilterButton
        key={filter}
        onClick={() => onChange([filter])}
        isActive={isActiveFilter(activeFilters, [filter])}
      >
        {filter}
      </FilterButton>
    ))}
    <FilterButton
      key="all"
      onClick={() => onChange(filters)}
      isActive={isActiveFilter(activeFilters, filters)}
    >
      Alle
    </FilterButton>
  </div>
)

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  activeFilters: PropTypes.arrayOf(PropTypes.string),
}

export class LatestPublications extends React.Component {
  state = {
    filters: this.props.departments.slice(0).sort(),
    teasers: this.props.defaultTeasers.slice(0),
    page: 1,
  }

  getTeasers = () => {
    const { authorId } = this.props
    const { filters, page, teasers: teasersBefore } = this.state
    const department = filters.length > 1 ? {} : { department: filters[0] }
    const url = `/autoren/api/${authorId}/latest-publications`
    const shouldMergeTeasers = page !== 1
    axios
      .get(url, { params: { ...department, page } })
      .then(res => res.data)
      .then(teasers => {
        this.setState(prevState => ({
          ...prevState,
          teasers: [...(shouldMergeTeasers ? teasersBefore : []), ...teasers],
        }))
      })
  }

  setActiveFilters = filters => {
    this.setState(
      prevState => ({
        ...prevState,
        page: 1,
        filters: filters.slice(0).sort(),
      }),
      () => this.getTeasers(),
    )
  }

  setPage = page => {
    this.setState(
      prevState => ({
        ...prevState,
        page,
      }),
      () => this.getTeasers(),
    )
  }

  render() {
    const { departments, ...props } = this.props
    const { teasers, filters, page } = this.state
    return (
      <div {...props}>
        <Headline tag="h2">Meine neuester Shit</Headline>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Filter filters={departments} activeFilters={filters} onChange={this.setActiveFilters} />
        </div>
        {teasers.map(teaser => (
          <TeaserImage {...teaser} key={teaser.title} />
        ))}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <button className="sz-button" onClick={() => this.setPage(page + 1)}>
            Mehr Artikel laden
          </button>
        </div>
      </div>
    )
  }
}

LatestPublications.propTypes = {
  authorId: PropTypes.string.isRequired,
  departments: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  defaultTeasers: PropTypes.array.isRequired,
}
