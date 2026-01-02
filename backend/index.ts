import 'module-alias/register'
import 'dotenv/config'
import express from 'express'
import GetAddressAsset from '@UseCase/GetAddressAsset'

const app = express()
const port = 5487

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/checkAddressAsset', async (req, res) => {
  try {
    const address = req.query?.address as string

    if (!address) {
      return res.status(400).json({
        error: 'Missing address',
        message: 'Address parameter is required',
      })
    }

    const useCase = new GetAddressAsset(address)
    const asset = await useCase.Exec()

    return res.json(asset)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Invalid Sui address format') {
        return res.status(400).json({
          error: 'Invalid address format',
          message: error.message,
        })
      }
      return res.status(500).json({
        error: 'Internal server error',
        message: error.message,
      })
    }
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Unknown error occurred',
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
