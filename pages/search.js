import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', query);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, guides, or tutorials..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </form>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        <p className="text-gray-600">Enter a search term above to find relevant content.</p>
        
        {/* Example search results */}
        <div className="mt-6 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">Result 1</h3>
            <p>Description of result 1...</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">Result 2</h3>
            <p>Description of result 2...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

