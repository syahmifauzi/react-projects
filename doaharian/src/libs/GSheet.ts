const { GoogleSpreadsheet } = require('google-spreadsheet')

import Dua from '@models/Dua'

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)

export const getAllDuas = async (): Promise<Dua[]> => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()
    const duas: Dua[] = rows.map((row: any) => ({
      title: row.title || '',
      malay: row.malay || '',
      arabic: row.arabic || '',
      transliteration: row.transliteration || '',
      hidden: row.hidden?.toLowerCase() === 'true'
    }))
    return duas.filter((dua) => !dua.hidden)
  } catch (error) {
    console.error(error)
    return [] as Dua[]
  }
}

export const addNewDua = async (dua: Dua): Promise<any> => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()
    const duaExists = rows.find(
      (row: any) =>
        row.title === dua.title && row.hidden?.toLowerCase() === 'false'
    )
    if (duaExists) {
      throw new Error('Doa tersebut sudah ada')
    }
    const row = await sheet.addRow(dua)
    return {
      title: row.title || '',
      malay: row.malay || '',
      arabic: row.arabic || '',
      transliteration: row.transliteration || '',
      hidden: row.hidden?.toLowerCase() === 'true'
    } as Dua
  } catch (error: any) {
    return { error: error.message }
  }
}

export const editDua = async (dua: Dua): Promise<any> => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()
    const row = rows.find((row: any) => row.title === dua.title)
    if (row) {
      row.malay = dua.malay
      row.arabic = dua.arabic
      row.transliteration = dua.transliteration
      await row.save()
      return row as Dua
    }
    throw new Error('Doa tersebut tidak ditemui')
  } catch (error: any) {
    return { error: error.message }
  }
}

export const deleteDua = async (
  title: string,
  message: string
): Promise<boolean> => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()
    const row = rows.find((row: any) => row.title === title)
    if (row) {
      row.title = `${row.title} ${Math.floor(Math.random() * 1000000000)}`
      row.hidden = true
      row.message = message
      await row.save()
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    return false
  }
}
