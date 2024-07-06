import { NextFunction, Request, Response } from "express";
import { booksDataBase } from "../database/database";
import { AppError } from "../errors/errors";

export class IsBookIdValid {
    static execute(req: Request, res: Response, next: NextFunction) {
        if (!booksDataBase.some(product => product.id == Number(req.params.id))) {
            throw new AppError(404, "Book not found.")
        }
        next()
    }
}

export class IsBookNameUnique {
    static execute(req: Request, res: Response, next: NextFunction) {
        if (booksDataBase.some(product => product.name == req.body.name)) {
            throw new AppError(409, "Book already registered.")
        }
        next()
    }
}
