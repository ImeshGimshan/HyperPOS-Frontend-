const Controls = ({ clear,onSubmitInvoice }) => (
  <div className="flex justify-between items-center mt-4">
    <button
      className="bg-blue-600 px-4 py-2 rounded"
      onClick={clear}
    >
      Clear
    </button>
    <button className="bg-green-700 px-4 py-2 rounded cursor-pointer hover:bg-green-800"
    onClick={()=>onSubmitInvoice()}
    >Submit Return Invoice</button>
  </div>
);

export default Controls;

