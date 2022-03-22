import { createContext, FC, useContext, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

import Dua from '@models/Dua'

const initialStates = {
  filteredDuas: [] as Dua[],
  setDuas: (duas: Dua[]) => {},
  setSearchTerm: (term: string) => {}
  // isEdit: false,
  // editTitle: '',
}

const AppContext = createContext(initialStates)
export const useAppContext = () => useContext(AppContext)

const AppProvider: FC = ({ children }) => {
  const [duas, setDuas] = useState([] as Dua[])
  const [filteredDuas, setFilteredDuas] = useState([] as Dua[])
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)

  useEffect(() => {
    const query = debouncedSearchTerm.toLowerCase()
    const re = RegExp(`.*${query.split('').join('.*')}.*`)
    const filtered = duas.filter(({ title }) => title?.toLowerCase().match(re))
    setFilteredDuas(filtered)
  }, [debouncedSearchTerm, duas])

  useEffect(() => {
    setFilteredDuas(duas.reverse())
  }, [duas])

  return (
    <AppContext.Provider value={{ filteredDuas, setDuas, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
