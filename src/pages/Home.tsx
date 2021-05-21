import { Box, Footer, Anchor } from 'grommet'
import { useHistory } from 'react-router-dom'

import Header from '../components/Header'
import SearchField from '../components/SearchField'

function Home() {
  const history = useHistory()

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') {
      return
    }
    const searchTerm = encodeURIComponent(e.currentTarget.value)
    history.push(`/search?q=${searchTerm}`, { q: searchTerm })
  }

  const goToAbout = (e: React.MouseEvent) => {
    e.preventDefault()
    history.push(`/about`)
  }

  return (
    <Box fill justify="center" align="center" pad="medium">
      <Header />
      <Box height="small" width="xlarge" align="center">
        <SearchField onKeyDown={onKeyDown} />
      </Box>
      <Footer justify="center" pad="small">
        <Anchor onClick={goToAbout} href="/about">
          About
        </Anchor>
      </Footer>
    </Box>
  )
}

export default Home
