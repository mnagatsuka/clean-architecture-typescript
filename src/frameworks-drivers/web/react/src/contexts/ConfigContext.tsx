import { createContext, useContext } from 'react'

export interface Config {
  apiUrl: string
}

export const ConfigContext = createContext<Config>({ apiUrl: '' })
export const useConfig = () => useContext(ConfigContext)
