const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()

const database = require('./database/database')
const userRouter = require('./routes/user')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(cookieParser())

app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
