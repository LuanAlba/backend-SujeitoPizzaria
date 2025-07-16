import prisma from "../../prisma";

interface DetailRequest {
    order_id: string;
}

class DetailOrderService {
    async execute({ order_id }: DetailRequest) {

        const orders = await prisma.item.findMany({
            where:{
                orderId: order_id
            },
            include:{
                Product:true,
                Order:true
            }
        })

        return orders;
    }
}

export { DetailOrderService }