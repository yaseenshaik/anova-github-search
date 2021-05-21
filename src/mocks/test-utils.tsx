import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import axios from 'axios'
import { RequestProvider } from '@react-cmpt/react-request-hook'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const AllTheProviders: FC = ({ children }) => {
  return (
    <RequestProvider value={axiosInstance}>
      <Grommet full theme={grommet}>
        {children}
      </Grommet>
    </RequestProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
