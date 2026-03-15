import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <article className="group relative mx-auto w-full max-w-sm flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg sm:max-w-none">
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-h-[3.5rem]">
          <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h2>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-lg font-semibold text-emerald-700">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <Link
          to={`/products/${product._id}`}
          aria-label={`View details for ${product.name}`}
          className="mt-auto inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
