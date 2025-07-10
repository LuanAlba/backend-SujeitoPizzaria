import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
    async handle(req: Request, res: Response) {

        //chama a classe iniciando ela na variavel
        const detailUserService = new DetailUserService();
        const user = await detailUserService.execute();

        return res.json(user);
    }
}

export { DetailUserController }