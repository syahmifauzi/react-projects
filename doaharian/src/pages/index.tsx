import React, { useEffect } from 'react'
import { NextPage } from 'next'

import Dua from '@models/Dua'
import { getAllDuas } from '@libs/GSheet'
import { Layout, Card, Search, AddEditDua } from '@components'
import { useAppContext } from '@contexts/AppContext'

interface Props {
  duas: Dua[]
}

const HomePage: NextPage<Props> = ({ duas }) => {
  const { setDuas, filteredDuas } = useAppContext()

  useEffect(() => {
    if (duas.length) setDuas(duas)
  }, [duas, setDuas])

  return (
    <Layout>
      <h1 className="text-3xl font-medium text-gray-700 text-center py-8">
        Himpunan Doa Harian
      </h1>
      <div className="pb-4 max-w-md mx-auto flex flex-col items-center justify-center gap-2">
        <Search />
        <AddEditDua />
      </div>
      {filteredDuas.length > 0 && (
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredDuas.map((dua, index) => (
            <Card key={index} dua={dua}></Card>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default HomePage

export const getStaticProps = async () => {
  const duas: Dua[] = await getAllDuas()

  return {
    props: { duas }
  }
}
