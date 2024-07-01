import { IBook } from "../interfaces/books.interfaces";

export const booksDataBase: IBook[] = []

let id = 0

export const generateId = () => {
    id++
    return id
}