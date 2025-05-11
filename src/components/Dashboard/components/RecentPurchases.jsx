function RecentPurchases({ grnData }) {
  // Get the 5 most recent GRNs
  const recentPurchases = [...(grnData || [])]
    .filter(grn => grn && (grn.updatedAt || grn.createdAt))
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt);
      const dateB = new Date(b.updatedAt || b.createdAt);
      return dateB - dateA;
    })
    .slice(0, 5);

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left font-semibold">GRN ID</th>
            <th className="p-3 text-left font-semibold">Supplier ID</th>
            <th className="p-3 text-left font-semibold">Date</th>
            <th className="p-3 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {recentPurchases.map((grn) => (
            <tr key={grn.id} className="border-t hover:bg-gray-50 transition duration-150">
              <td className="p-3">{grn.id}</td>
              <td className="p-3">{grn.supplierId || "—"}</td>
              <td className="p-3">{formatDate(grn.createdAt || grn.updatedAt)}</td>
              <td className="p-3 text-right font-medium text-blue-600">
                Rs {(grn.total || 0).toLocaleString()}
              </td>
            </tr>
          ))}
          {recentPurchases.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">No purchases found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentPurchases;
