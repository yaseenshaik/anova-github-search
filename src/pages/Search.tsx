import React, { useEffect, useState } from 'react'

import { Box } from 'grommet'
import { useHistory, useLocation } from 'react-router-dom'

import Header from '../components/Header'
import RepoList from '../components/RepoList'
import SearchField from '../components/SearchField'

function SearchPage() {
  const history = useHistory()
  const query = new URLSearchParams(useLocation().search)
  const q = (query.has('q') ? query.get('q') : '') as string
  const [search, setSearch] = useState(q)
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') {
      return
    }
    const searchTerm = encodeURIComponent(e.currentTarget.value)
    history.push(`/search?q=${searchTerm}`, { q: searchTerm })
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = e.currentTarget.value
    setSearch(searchTerm)
  }

  // The following effect takes care of syncing the search field when
  // back button is pressed
  useEffect(() => {
    if (q !== search) {
      setSearch(q)
    }
  }, [q]) // eslint-disable-line

  return (
    <Box justify="center" align="center" pad="medium" round="large">
      <Header />
      <SearchField {...{ onChange, onKeyDown, search }} />
      <RepoList query={q} />
    </Box>
  )
}

export default SearchPage
