import { Router, Request, Response } from "express"

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    // res.json({ ok: true })
    throw new Error('Erro de teste'); // Simulando um erro
})

export { router };