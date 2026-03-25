import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
// import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addItem } = useCart();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    try {
      await addItem(product._id, 1);
      toast.success("Product added to cart");
      navigate("/cart");
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add item to cart.",
      );
    }
  };

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Spinner message="Loading product details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="text-base font-medium text-amber-600">
          Something went wrong while fetching the product.
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="text-base font-medium text-slate-600">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            {product.description}
          </p>
        </header>

        <section
          aria-label="Product details"
          className="grid gap-10 lg:grid-cols-2 lg:items-start"
        >
          <div className="mx-auto w-full max-w-lg">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-2">
              <p className="text-lg font-semibold text-emerald-700">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>

            <div className="flex items-start gap-4">
              <button
                onClick={handleAddToCart}
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
