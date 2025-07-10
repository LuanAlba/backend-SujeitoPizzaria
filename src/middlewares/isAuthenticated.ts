import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    //sub = id usuário
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    //receber o token
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    //desconstruindo para pegar apenas o token
    const [, token] = authToken.split(" ")

    //validar o token
    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;

        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}