import prisma from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        //verificar se email existe
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Usuário/Password incorretos")
        }

        //verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Usuário/Password incorretos")
        }

        //proximo passo é gerar um token jwt 

        return { ok: true }
    }
}

export { AuthUserService };