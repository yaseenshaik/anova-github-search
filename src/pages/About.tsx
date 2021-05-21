import { Anchor, Box } from 'grommet'
import { Github } from 'grommet-icons'

function About() {
  return (
    <Box fill justify="center" align="center" pad="xlarge" round="large">
      <Anchor
        size="xxlarge"
        href="//github.com/yaseenshaik"
        label="Yaseen Shaik"
        icon={<Github size="large" />}
      />
    </Box>
  )
}

export default About
