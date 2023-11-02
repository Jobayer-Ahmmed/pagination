import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import  { MongoClient, ServerApiVersion } from "mongodb"
import "dotenv/config"

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(cookieParser())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kedhyrh.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const paginationDB = client.db("paginationDB")
    const productCollection = paginationDB.collection("productCollection")

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.get("/", async(req, res)=>{
        res.send("I am in");
    })
    app.get("/products", async(req, res)=>{
        const page = parseInt(req.query.page)-1
        const size = parseInt(req.query.size)
        const cursor = productCollection.find().skip(page*size).limit(size)

        const result  = await cursor.toArray()
        res.send(result)
    })
    app.get("/productsCount", async(req, res)=>{
      const count = await productCollection.estimatedDocumentCount()
      res.send({count})
    })

  } 
  catch(err){
    console.log(err)
  }
}
run().catch(console.dir);

app.listen(port, ()=>console.log(`the port ${port} is running`))
