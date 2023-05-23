const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const dotenv = require('dotenv')
dotenv.config()

// mongoose connection
require('./database/database')
app.get('/', (req, res) => {
  res.send('API is running...')
})

// bodyparser
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/users', require('./routes/user'))

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`,
  ),
)
