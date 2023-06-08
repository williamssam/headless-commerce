import express from 'express'

const app = express()

app.listen(process.env.PORT || 3300, () => console.log('Server is running!'))
