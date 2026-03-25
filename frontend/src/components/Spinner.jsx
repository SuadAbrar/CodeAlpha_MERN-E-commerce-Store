const Spinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="h-10 w-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
      <span className="text-sm font-medium text-slate-600">{message}</span>
    </div>
  );
};

export default Spinner;
