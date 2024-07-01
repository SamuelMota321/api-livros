import express, { json }  from "express"
import { booksRouter } from "./routes/books.routes"

export const app = express()

app.use(json())

app.use("/books", booksRouter) 



 
