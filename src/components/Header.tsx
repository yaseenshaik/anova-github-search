import { Box, Heading } from 'grommet'
import { Github } from 'grommet-icons'

const Header = () => (
  <Box direction="row" justify="center" align="center" pad="medium" round="large" gap="small">
    <Github size="large" color="plain" />
    <Heading level={1}>Github Search</Heading>
  </Box>
)

export default Header
