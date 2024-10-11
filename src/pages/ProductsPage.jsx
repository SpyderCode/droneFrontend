import { useEffect } from "react"
import { useProducts } from "../context/ProductsContext"
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(products.length === 0) {
    return (
      <div>
        <h1>No hay productos</h1>
      </div>
    )
  }


  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      }
    </div>
  )
}
