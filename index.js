const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config()
const port = process.env.PORT || 5000;
const app = express();

// midlware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.farjvzi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appointmentOptionCollection = client.db("mayoClinic").collection("appointmentOptions")

        app.get("/appointmentOptions", async (req, res) => {
            const query = {}
            const options = await appointmentOptionCollection.find(query).toArray();
            res.send(options)
        })
    }
    finally {

    }
}
run().catch(console.log)



app.get("/", async (req, res) => {
    res.send("mayo clicnic is running")
})

app.listen(port, () => console.log(`mayo clinic is running on ${port}`))