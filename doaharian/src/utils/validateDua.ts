import Dua from '@models/Dua'

export const validateDua = (dua: Dua): Boolean => {
  const { title, malay, arabic, transliteration } = dua

  if (!title || !malay || !arabic || !transliteration) {
    return false
  }

  return true
}
