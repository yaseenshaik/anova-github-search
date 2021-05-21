import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import RepoList from '../components/RepoList'

import noResults from '../mocks/no-results.json'
import results from '../mocks/with-results.json'
import { render } from '../mocks/test-utils'

const server = setupServer(
  rest.get('/search/repositories', (req, res, ctx) => {
    return res(ctx.json(results))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays all repos', async () => {
  render(<RepoList query='react' />)

  const items = await screen.findAllByLabelText('GithubRepo')
  expect(items).toHaveLength(30)
})

test('handles no results', async () => {
  server.use(
    rest.get('/search/repositories', (req, res, ctx) => {
      return res(ctx.json(noResults))
    })
  )

  render(<RepoList query='asdkjfiwoejrkmelwkrn' />)
  await waitFor(() => screen.getByLabelText('alert'))

  expect(screen.getByLabelText('alert')).toHaveTextContent('🕵️‍ No results!')
})