import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllProducts } from "@/services/productService";
import { handleError } from "@/services/errorService";
import { addToCart, isCartType } from "@/services/cartService";
import { useState } from "react";

export default function Products() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const [selectedWeight, setSelectedWeight] = useState(
    () => products[0]?.weight?.[0] ?? null
  );

  const [quantity, setQuantity] = useState(1);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: (res) => {
      if (!isCartType(res.data)) {
        //  Guest → save to localStorage
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(res.data);
        localStorage.setItem("cart", JSON.stringify(cart));
        queryClient.setQueryData(["cart"], cart);
      } else {
        //  Logged-in → update cache with DB cart
        queryClient.setQueryData(["cart"], res.data);
      }

    },
    onError: (err) => handleError(err, "failed to add to cart"),
  });

  function handleQuantity(operation: "add" | "sub") {
    setQuantity((prev) => {
      if (operation === "add") {
        return Math.min(prev + 1, 30); // cap at 30
      }
      if (operation === "sub") {
        return Math.max(prev - 1, 1); // floor at 1
      }
      return prev;
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">₹{product.price}</p>

            {product.weight.map((item) => (
              <div
                key={`${item.value}-${item.unit}`}
                className={`flex gap-2 border rounded-md p-2 m-2 cursor-pointer ${selectedWeight?.value === item.value &&
                    selectedWeight?.unit === item.unit
                    ? "border-orange-600 bg-orange-50"
                    : "border-black"
                  }`}
                onClick={() => setSelectedWeight(item)}
              >
                <p>{item.value}</p>
                <p>{item.unit}</p>
              </div>
            ))}

            <div className="flex items-center gap-4 border border-gray-300 rounded-md px-4 py-2 w-fit">
              <button
                onClick={() => handleQuantity("sub")}
                className="text-xl font-bold px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
              >
                -
              </button>

              <span className="text-lg font-semibold">{quantity}</span>

              <button
                onClick={() => handleQuantity("add")}
                className="text-xl font-bold px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={() =>
                mutate({
                  productId: product._id,
                  quantity,
                  selectedWeight,
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