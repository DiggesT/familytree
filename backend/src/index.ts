import express from 'express'

const members = [
  { id: '1', name: 'Selezneva Elena', description: 'Mother' },
  { id: '2', name: 'Parkhomenko Borris', description: 'Father' },
]

const expressApp = express()
expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

expressApp.get('/list', (req, res) => {
  res.send(members)
})

expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})