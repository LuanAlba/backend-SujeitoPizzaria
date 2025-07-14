import prisma from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class RemoverOrderService {
    async execute({order_id} : OrderRequest) {

        const order = await prisma.order.delete({
            where:{
                id: order_id
            }
        })

        return order;
    }
}

export { RemoverOrderService }