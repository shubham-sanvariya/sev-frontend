import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-orange-700">Your Cart is Empty</h2>
        <p>Add some tasty snacks from the products page!</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Your Cart</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-orange-300">
            <th className="text-left py-2">Product</th>
            <th className="text-right py-2">Price</th>
            <th className="text-center py-2">Quantity</th>
            <th className="text-right py-2">Total</th>
            <th className="text-center py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ id, name, price, quantity }) => (
            <tr key={id} className="border-b border-orange-200">
              <td className="py-2">{name}</td>
              <td className="py-2 text-right">₹{price}</td>
              <td className="py-2 text-center">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => updateQuantity(id, +e.target.value)}
                  className="w-16 text-center border rounded px-2"
                />
              </td>
              <td className="py-2 text-right">₹{price * quantity}</td>
              <td className="py-2 text-center">
                <button
                  onClick={() => removeItem(id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">
          Total Items: {totalItems} | Total Price: ₹{totalPrice}
        </p>
        <button
          onClick={clearCart}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
