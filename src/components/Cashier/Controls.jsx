const Controls = ({ onNewInvoice }) => (
  <div className="flex justify-between items-center mt-4">
    <button
      className="bg-blue-600 px-4 py-2 rounded"
      onClick={onNewInvoice}
    >
      New Invoice
    </button>
    <button className="bg-gray-600 px-4 py-2 rounded">Print Bill</button>
    <button className="bg-green-700 px-4 py-2 rounded">Submit Invoice</button>
  </div>
);

export default Controls;
