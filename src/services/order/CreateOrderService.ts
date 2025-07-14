import prisma from "../../prisma";

interface OrderRequest {
    table: string;
    name: string;
}

class CreateOrderService {
    async execute({table, name} : OrderRequest) {

        const order = await prisma.order.create({
            data:{
                table: table,
                name: name
            }
        })

        return order;
    }
}

export { CreateOrderService }