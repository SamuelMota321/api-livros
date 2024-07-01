import { Router } from "express";
import { BooksControllers } from "../controller/books.controllers";
import { IsProductIdValid, IsProductValid } from "../middlewares/ProductMiddleware";

export const booksRouter = Router()
const booksControllers = new BooksControllers

booksRouter.get("/", booksControllers.getBooks)
booksRouter.get("/:id", IsProductIdValid.execute, booksControllers.getOneBook)
booksRouter.post("/", IsProductValid.execute, booksControllers.registerBook )
booksRouter.delete("/:id", IsProductIdValid.execute, booksControllers.deleteBook)
booksRouter.patch("/:id", IsProductIdValid.execute, booksControllers.patchBook)