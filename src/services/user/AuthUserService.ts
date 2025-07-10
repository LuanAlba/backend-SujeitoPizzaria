import prisma from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

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

        //se tudo ok, gerar o JWT
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            //utilizando do process do .env
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };