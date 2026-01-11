import { api } from "@/lib/axios"

export const fetchAllProducts = async () => {
  const res = await api.get('/products')
  return res.data;
}
