import { FC, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

import Dua from '@models/Dua'
import { useAppContext } from '@contexts/AppContext'

interface Props {
  dua: Dua
}

const Card: FC<Props> = ({ dua }) => {
  const { filteredDuas, setDuas } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showDelete, setShowDelete] = useState(false)

  // const handleEdit = () => {
  //   // console.log('edit')
  //   // setEndabledEdit(true)
  //   // selectedDua(dua)
  // }

  const handleDelete = async () => {
    if (!message) return
    setIsLoading(true)
    const response = await fetch('/api/deleteDua', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: dua.title, message })
    })
    const { success } = await response.json()
    if (success) {
      setDuas(filteredDuas.filter((d) => d.title !== dua.title))
    }
    setMessage('')
    setIsLoading(false)
  }

  return (
    <div className="relative border flex flex-col justify-center items-center bg-white p-4 rounded-md shadow-sm hover:shadow-md text-center">
      <h2 className="text-xl font-medium text-green-600">{dua.title}</h2>
      <div className="font-amiri text-2xl my-6">{dua.arabic}</div>
      <div className="text-sm font-light mb-2">{dua.transliteration}</div>
      <div className="text-sm font-normal">&ldquo;{dua.malay}&rdquo;</div>
      <button
        disabled={isLoading}
        onClick={() => setShowDelete(!showDelete)}
        className={`${
          isLoading ? '' : 'hover:bg-red-600 hover:text-white'
        } absolute top-3 left-3 text-slate-600 p-2 rounded-full transition-all`}>
        {isLoading ? <FaSpinner className="animate-spin" /> : <FiTrash2 />}
      </button>
      {/* <button
        disabled={true}
        onClick={handleEdit}
        className="absolute top-3 right-3 text-slate-600 hover:bg-green-600 hover:text-white p-2 rounded-full transition-all">
        <FiEdit />
      </button> */}
      {showDelete && (
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 justify-center">
          <input
            type="text"
            value={message}
            placeholder="Sebab"
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded-md ring-slate-600 p-2 w-full"
          />
          <button
            disabled={isLoading}
            onClick={handleDelete}
            className={`${
              isLoading ? 'bg-gray-500' : 'bg-red-600'
            } whitespace-nowrap text-white px-4 py-2 rounded-md w-full sm:w-auto`}>
            Buang Doa
          </button>
        </div>
      )}
    </div>
  )
}

export default Card
