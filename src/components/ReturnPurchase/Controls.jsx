const Controls = ({ clear, onSubmitGRN }) => (
    <div className="flex justify-between items-center mt-4">
        <button
            onClick={clear}
            className="bg-[#f472b6]/80 px-5 py-2 rounded-lg font-bold hover:bg-pink-700 transition-all shadow"
        >
            Clear
        </button>
        <button
            onClick={() => onSubmitGRN()}
            className="bg-green-700 px-5 py-2 rounded-lg font-bold hover:bg-green-800 transition-all shadow"
        >
            Submit
        </button>
    </div>
);
export default Controls;
