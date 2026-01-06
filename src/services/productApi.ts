export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  // TEMP mock (will replace with backend later)
  return [
    { id: 1, name: "Sev", price: 50, description: "Crispy spicy sev" },
    { id: 2, name: "Mixture", price: 70, description: "Tasty namkeen mixture" },
    { id: 3, name: "Ganthiya", price: 60, description: "Soft crunchy ganthiya" },
  ];
};
