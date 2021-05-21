import React from 'react'

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Image,
  Layer,
  ResponsiveContext,
  Spinner,
  Text,
} from 'grommet'
import { Network, Star, View } from 'grommet-icons'
import { useResource } from '@react-cmpt/react-request-hook'

interface IdentifierProps {
  children: React.ReactNode
  title: string
  subTitle: string
  size: string
}

const Identifier = ({ children, title, subTitle, size, ...rest }: IdentifierProps) => (
  <Box gap="small" align="center" direction="row" pad="small" {...rest}>
    {children}
    <Box gap="small">
      <Text size={size} weight="bold">
        {title}
      </Text>
      <Text size={size}>{subTitle}</Text>
    </Box>
  </Box>
)

interface GithubOwner {
  avatar_url: string
  login: string
}

interface GithubRepo {
  id: number
  title: string
  description: string
  full_name: string
  owner: GithubOwner
  watchers_count: number
  stargazers_count: number
  forks_count: number
  html_url: string
}

interface GithubResponse {
  items: GithubRepo[]
}

interface IProps {
  query: string
}

function RepoList({ query }: IProps) {
  const mobile = React.useContext(ResponsiveContext) === 'small'
  const fontSize = mobile ? 'medium' : 'large'

  const [reqState] = useResource(
    (query: string) => ({
      url: `/search/repositories?q=${query}+in:name&sort=stars&order=desc`,
      method: 'GET',
    }),
    [query],
  )

  const data = reqState.data as GithubResponse

  return (
    <Box width={{ max: 'large' }} fill align="center" justify="start" pad="small">
      {reqState.isLoading && (
        <Layer>
          <Box
            align="center"
            justify="center"
            gap="small"
            direction="row"
            alignSelf="center"
            pad="large"
          >
            <Spinner />
            <Text>Loading...</Text>
          </Box>
        </Layer>
      )}
      {!reqState.isLoading && data?.items?.length === 0 && (
        <Box
          align="center"
          justify="center"
          gap="small"
          direction="row"
          alignSelf="center"
          pad="xlarge"
        >
          <Text size="3xl" aria-label="alert">
            🕵️‍ No results!
          </Text>
        </Box>
      )}

      {data?.items?.map((value) => (
        <Card
          aria-label="GithubRepo"
          hoverIndicator
          fill
          margin={{ bottom: 'medium' }}
          key={value.id}
          onClick={() => (window.location.href = value.html_url)}
        >
          <CardBody pad="small">
            <Identifier title={value.full_name} subTitle={value.description} size={fontSize}>
              <Box flex={false} height="80px" width="80px">
                <Image fit="contain" src={value.owner.avatar_url} a11yTitle={value.owner.login} />
              </Box>
            </Identifier>
          </CardBody>
          <CardFooter pad="small">
            <Box gap="medium" align="center" direction="row" pad="small">
              <Box direction="row" gap="small">
                <View color="plain" />
                <Text>{value.watchers_count}</Text>
              </Box>
              <Box direction="row" gap="small">
                <Star color="plain" />
                <Text>{value.stargazers_count}</Text>
              </Box>
              <Box direction="row" gap="small">
                <Network color="plain" />
                <Text>{value.forks_count}</Text>
              </Box>
            </Box>
          </CardFooter>
        </Card>
      ))}
    </Box>
  )
}

export default RepoList
