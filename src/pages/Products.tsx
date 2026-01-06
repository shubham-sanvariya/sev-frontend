import { useQuery } from "@tanstack/react-query";
import { fetchProducts} from "../services/productApi";
import type { Product } from "../services/productApi";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { addItem } = useCart();

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p className="p-6">Loading products...</p>;
  if (isError) return <p className="p-6 text-red-600">Failed to load products</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data!.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">₹{product.price}</p>

            <button
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                })
              }
              className="mt-4 bg-orange-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
