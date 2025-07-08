import prisma from "../../prisma";


interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        //verificar se enviou um email
        if (!email) {
            throw new Error("Email incorreto")
        }

        //verificar se esse email ja está cadastrado
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Email já existe cadastrado!")
        }

        //passando os dados no método de criação
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            },
            //select para escolher o que é necessario devolver
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export { CreateUserService }