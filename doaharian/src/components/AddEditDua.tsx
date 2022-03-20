import { useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

import Dua from '@models/Dua'
import { validateDua } from '@utils/validateDua'
import { useAppContext } from '@contexts/AppContext'

const AddEditDua = () => {
  const { filteredDuas, setDuas } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [states, setStates] = useState({
    title: '',
    malay: '',
    arabic: '',
    transliteration: ''
  } as Dua)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStates({ ...states, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateDua(states)) {
      setIsLoading(true)
      const response = await fetch('/api/newDua', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(states)
      })
      const { doa, error } = await response.json()
      if (error) {
        showError(error)
      } else {
        setDuas([...filteredDuas, doa])
        setShow(false)
        resetStates()
      }
      setIsLoading(false)
    }
  }

  const resetStates = () => {
    setStates({
      title: '',
      malay: '',
      arabic: '',
      transliteration: ''
    } as Dua)
  }

  const showError = (message: string) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 3000)
  }

  const makeInput = (name: string, label: string) => (
    <input
      placeholder={label}
      type="text"
      name={name}
      value={`${states[name as keyof Dua]}`}
      className="p-2 border rounded-md ring-slate-600"
      onChange={handleInputChange}
    />
  )

  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="bg-green-600 py-2 px-4 rounded-md text-xl text-white">
        {show ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}
      </button>
      {show && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 bg-white p-4 mb-4 rounded-md shadow-sm border w-full">
          {error && (
            <p className="bg-red-600 text-white text-sm p-2 rounded-md">
              {error}
            </p>
          )}
          {makeInput('title', 'Nama Doa')}
          {makeInput('arabic', 'Doa Dalam Bahasa Arab')}
          {makeInput('transliteration', 'Doa Dalam Rumi')}
          {makeInput('malay', 'Maksud Doa')}
          <button
            disabled={isLoading}
            className={`${
              isLoading ? 'bg-gray-500' : 'bg-green-600'
            } py-2 px-4 rounded-md text-white flex items-center justify-center gap-2`}>
            {isLoading && <FaSpinner className="animate-spin" />}Tambah Doa
          </button>
        </form>
      )}
    </>
  )
}

export default AddEditDua
