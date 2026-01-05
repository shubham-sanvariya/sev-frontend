import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Sev", description: "Crispy, spicy sev.", price: 450 },
  { id: 2, name: "Mixture", description: "Tasty namkeen mixture.", price: 370 },
  { id: 3, name: "Ganthiya", description: "Soft and crunchy ganthiya.", price: 360 },
];

export default function Products() {
  const { cartCount, setCartCount } = useCart();

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(({ id, name, description, price }) => (
          <div key={id} className="border rounded shadow p-4 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="flex-grow text-gray-700 mb-4">{description}</p>
            <p className="font-bold mb-4">₹{price}</p>
            <button
              onClick={addToCart}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
