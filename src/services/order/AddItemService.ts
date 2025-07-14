import prisma from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
}

class AdditemService {
    async execute({order_id, product_id, amount} : ItemRequest) {
        const order = await prisma.item.create({
            data:{
                orderId: order_id,
                productId: product_id,
                amount
            }
        });

        return order;
    }
}

export { AdditemService }