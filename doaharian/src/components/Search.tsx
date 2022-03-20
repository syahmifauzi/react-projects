import { useEffect, useState } from 'react'

import { useAppContext } from '@contexts/AppContext'

const Search = () => {
  const { setSearchTerm } = useAppContext()
  const [term, setTerm] = useState('')

  useEffect(() => {
    setSearchTerm(term)
  }, [term, setSearchTerm])

  return (
    <input
      type="text"
      value={term}
      placeholder="Cari doa..."
      onChange={(e) => setTerm(e.target.value)}
      className="p-3 border rounded-md w-full"
    />
  )
}

export default Search
