import express from "express"
import ip from "ip"
import path from "path"


const PORT = process.env.PORT || 3001
const pathToPublic = `${path.resolve()}/client/public`

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static(`${pathToPublic}`))

app.listen(PORT, () => {
    console.log(`Server listening on ${ip.address()}:${PORT}`)
})