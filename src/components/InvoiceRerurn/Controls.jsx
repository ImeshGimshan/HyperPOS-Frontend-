const Controls = ({ clear, onSubmitInvoice }) => (
  <div className="flex justify-between items-center mt-4 gap-4">
    <button
      className="hyper-button bg-[#f472b6]/80 hover:bg-[#f472b6] border border-[#f472b6] px-6 py-2 rounded font-bold text-white transition"
      onClick={clear}
      type="button"
    >
      Clear
    </button>
    <button
      className="hyper-button bg-green-700 hover:bg-green-800 px-6 py-2 rounded font-bold text-white border border-green-400 transition"
      onClick={onSubmitInvoice}
      type="button"
    >
      Submit Return Invoice
    </button>
  </div>
);

export default Controls;
