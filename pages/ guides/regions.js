export default function RegionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Regions Guide</h1>
      <div className="space-y-4">
        <p>Explore different regions and their characteristics.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Region 1</h2>
            <p>Description of region 1...</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Region 2</h2>
            <p>Description of region 2...</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Region 3</h2>
            <p>Description of region 3...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

