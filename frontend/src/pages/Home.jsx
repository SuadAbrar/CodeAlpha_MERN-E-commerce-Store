import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl animate-[fade-in-up_1s_ease-out_forwards]">
          Welcome to Our Store
        </h1>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl animate-[fade-in-up_1s_ease-out_0.3s_forwards]">
          Discover amazing products and shop with ease.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-700 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 animate-[fade-in-up_1s_ease-out_0.6s_forwards]"
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
};

export default Home;
