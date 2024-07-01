import { Request, Response } from "express"
import { booksDataBase, generateId } from "../database/database"

export class BooksControllers {
    registerBook(req: Request, res: Response) {
        const { name, pages, category } = req.body
        const newBook = {
            id: generateId(),
            name,
            pages,
            category,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        booksDataBase.push(newBook)
        return res.status(201).json(newBook)
    }

    getBooks(req: Request, res: Response) {
        return res.status(200).json(booksDataBase)
    }

    getOneBook(req: Request, res: Response) {
        const index = booksDataBase.findIndex(book => book.id == Number(req.params.id))

        if (index !== -1) {
            const book = booksDataBase[index]
            return res.status(200).json(book)
        } else {
            return res.status(404).json({ message: "Book not found" })
        }
    }

    deleteBook(req: Request, res: Response) {
        try {
            const index = booksDataBase.findIndex(book => book.id == Number(req.params.id))

            if (index !== -1) {
                booksDataBase.splice(index, 1)
                return res.send({ message: 'Book deleted successfully' })
            } else {
                return res.status(404).json({ message: 'Book not found' })
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting book', error })
        }
    }

    patchBook(req: Request, res: Response) {
        const index = booksDataBase.findIndex(book => book.id === Number(req.params.id));
        const currentBook = booksDataBase[index];
        const updatedBookData = { ...currentBook, ...req.body, updatedAt: new Date() };
    
        if (index === -1) {
            return res.status(404).json({ message: "Book not found" });
        }
    
        booksDataBase[index] = updatedBookData;
        return res.status(200).json(updatedBookData);
    }
    




}

