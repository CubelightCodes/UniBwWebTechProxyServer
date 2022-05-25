const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors({
    origin: '*'
}))


app.get(':endpoint([\\/\\w\\.-]*)', function (req, res) {

    const endpoint = "https://webtech.informatik.unibw-muenchen.de/server/api/core" + req.params.endpoint

    axios.get(endpoint).then(response => {
        res.json(response.data)
    }).catch(error => {
        res.json(error)
    })
})


app.listen(5000)