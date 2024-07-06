import { booksDataBase, generateId } from "../database/database"
import { AppError } from "../errors/errors"
import { IBook } from "../interfaces/books.interfaces"

export class BookServices {
    registerBook(name: string, pages: number, category: string) {
        const newBook: IBook = {
            id: generateId(),
            name,
            pages,
            category,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        booksDataBase.push(newBook)
        return newBook
    }

    getBooks() {
        return booksDataBase
    }

    getOneBook(id: string) {
        const index = booksDataBase.findIndex(book => book.id == Number(id))

        if (index !== -1) {
            const book = booksDataBase[index]
            return { status: 200, content: book }
        } else {
            throw new AppError(404, "Book not found.")
        }
    }


    deleteBook(id: string) {
        const index = booksDataBase.findIndex(book => book.id == Number(id))

        if (index !== -1) {
            booksDataBase.splice(index, 1)
            return { status: 204, message: "Book deleted." }
        }

        throw new AppError(404, "Book not found.")
    }

    patchBook(id: string, req: IBook) {
        const index = booksDataBase.findIndex(book => book.id === Number(id));
        const currentBook = booksDataBase[index];
        const updatedBookData = { ...currentBook, ...req, updatedAt: new Date() };

        if (index === -1) {
            throw new AppError(404, "Book not found.")
        }

        booksDataBase[index] = updatedBookData;
        return { status: 200, content: updatedBookData }
    }

}