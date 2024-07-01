import { NextFunction, Request, Response } from "express";
import { booksDataBase } from "../database/database";

export class IsProductIdValid {
    static execute(req: Request, res: Response, next: NextFunction) {
        if (!booksDataBase.some(product => product.id == Number(req.params.id))) {
            return res.status(404).json({ message: "Product not found." })
        }

        next()
    }
}

export class IsProductValid {
    static execute(req: Request, res: Response, next: NextFunction) {
        if (booksDataBase.some(product => product.name == req.body.name)) {
            return res.status(409).json({ message: "Product alredy exist." })
        }
        
        next()
    }
}
