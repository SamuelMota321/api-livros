import { Router } from "express";
import { BooksControllers } from "../controller/books.controllers";
import { IsBookIdValid, IsBookNameUnique } from "../middlewares/bookMiddleware";

export const booksRouter = Router()
const booksControllers = new BooksControllers

booksRouter.get("/", booksControllers.getBooks)
booksRouter.get("/:id", IsBookIdValid.execute, booksControllers.getOneBook)
booksRouter.post("/", IsBookNameUnique.execute,booksControllers.registerBook )
booksRouter.delete("/:id", IsBookIdValid.execute, booksControllers.deleteBook)
booksRouter.patch("/:id", IsBookNameUnique.execute, IsBookIdValid.execute, booksControllers.patchBook)