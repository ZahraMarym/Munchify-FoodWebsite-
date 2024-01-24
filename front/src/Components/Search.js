const Search = () => {
  return (
    <div className="w-full p-4 bg-black pb-10 flex flex-col items-center md:flex-row md:justify-center opacity-100">
      <input
        className="w-full md:w-2/3 bg-black p-2 h-10 text-yellow-500 rounded-full border-gray-600 border-2 mb-3 md:mb-0 md:mr-2"
        type="text"
        placeholder="Search for your favourite dish"
      />
      <button className="bg-yellow-500 rounded-full text-black px-4 py-2 hover:scale-105 transition-transform">
        Search
      </button>
    </div>
  );
};
export default Search;
