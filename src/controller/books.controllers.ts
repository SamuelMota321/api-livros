import { Request, Response } from "express"
import { BookServices } from "../services/book.services"

export class BooksControllers {
    registerBook(req: Request, res: Response) {
        const bookServices = new BookServices
        const response = bookServices.registerBook(req.body.name, req.body.pages, req.body.category)
        return res.status(200).json(response)
    }

    getBooks(req: Request, res: Response) {
        const bookServices = new BookServices
        const response = bookServices.getBooks()
        return res.status(200).json(response)
    }

    getOneBook(req: Request, res: Response) {
        const bookServices = new BookServices
        const response = bookServices.getOneBook(req.params.id)
        return res.status(response.status).json(response.content)
    }

    deleteBook(req: Request, res: Response) {
        const bookServices = new BookServices
        const response = bookServices.deleteBook(req.params.id)
        return res.status(response.status).json(response.message)
    }

    patchBook(req: Request, res: Response) {
        const bookServices = new BookServices
        const response = bookServices.patchBook(req.params.id, req.body)
        return res.status(response.status).json(response.content)
    }
}

