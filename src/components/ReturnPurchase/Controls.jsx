import React from 'react';

const Controls = ({ clear, onSubmitGRN}) => (
    <div className="flex justify-between items-center mt-4">
        <button onClick={clear} className="bg-red-700/80 px-4 py-2 rounded cursor-pointer hover:bg-red-600/80">
            Clear
        </button>
        <button onClick={()=> onSubmitGRN()} className=" bg-green-700 px-4 py-2 rounded cursor-pointer hover:bg-green-800">
            Submit
        </button>
    </div>
);
export default Controls;