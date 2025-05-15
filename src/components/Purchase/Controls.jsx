const Controls = ({ onNewGrn,onSubmitGrn,grn }) => (
  <div className="flex justify-between items-center mt-4">
    <button
      className={`bg-blue-600 px-4 py-2 rounded ${grn?.id ? "" : " animate-pulse "}`}
      onClick={onNewGrn}
    >
      New GRN
    </button>
    <button className="bg-green-700 px-4 py-2 rounded cursor-pointer hover:bg-green-800"
    onClick={()=>onSubmitGrn()}
    >Submit GRN</button>
  </div>
);

export default Controls;

