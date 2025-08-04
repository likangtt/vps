export default function DiscountsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Discounts & Offers</h1>
      <p>Check out our current discounts and special offers.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Summer Sale</h2>
          <p className="mb-4">Get 30% off all products this summer!</p>
          <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-blue-100 transition">
            Shop Now
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">New User Offer</h2>
          <p className="mb-4">20% off your first order!</p>
          <button className="bg-white text-green-600 font-bold py-2 px-4 rounded hover:bg-green-100 transition">
            Sign Up
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Flash Deal</h2>
          <p className="mb-4">Limited time: 50% off selected items!</p>
          <button className="bg-white text-orange-600 font-bold py-2 px-4 rounded hover:bg-orange-100 transition">
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
}

