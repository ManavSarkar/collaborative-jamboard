const mongo = require('mongoose')

mongo
  .connect(process.env.CONNECTION_PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Congratulations, Mongo is runing`)
  })
  .catch((e) => {
    console.log(`Dont like errors but here it is\n ${e}`)
  })
