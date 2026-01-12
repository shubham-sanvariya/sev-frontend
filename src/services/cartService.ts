import { api } from "@/lib/axios"
import type { ApiResponse } from "@/types/api";
import type { cartReqType, CartType } from "@/types/schemas/cartSchema"

export const addToCart = async (product: cartReqType): Promise<ApiResponse<CartType | cartReqType>>=> {
    const res = await api.post("/cart/add", product);

    if (!res.data.success) {
        throw new Error(res.data.message)
    }

    return res.data;
}

export function isCartType(data: CartType | cartReqType): data is CartType {
    return (data as CartType)._id !== undefined;
}

export function addToCartLocal(product: cartReqType) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItem = cart.find((item: cartReqType) => item.productId === product.productId &&
        item.selectedWeight.value === product.selectedWeight.value &&
        item.selectedWeight.unit === product.selectedWeight.unit);

    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}