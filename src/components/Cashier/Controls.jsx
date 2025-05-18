const Controls = ({ onNewInvoice,onSubmitInvoice,invoice }) => (
  <div className="flex justify-between items-center mt-4">
    <button
      className={`bg-blue-600 px-4 cursor-pointer py-2 rounded-xl font-bold shadow hover:bg-blue-700 transition-all ${
        invoice?.id ? "" : " animate-pulse shadow-blue-400 shadow-lg "
      }`}
      onClick={onNewInvoice}
    >
      New Invoice
    </button>
    <button
      className="bg-green-700 px-4 py-2 rounded-xl font-bold shadow cursor-pointer hover:bg-green-800 transition-all"
      onClick={() => onSubmitInvoice()}
    >
      Submit Invoice
    </button>
  </div>
);

export default Controls;

